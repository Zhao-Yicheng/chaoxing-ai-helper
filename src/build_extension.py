#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建浏览器扩展（MV3）并打包 zip。

用法:
    python src/build_extension.py
产出:
    dist/chaoxing-ai-helper-extension/   （可直接"加载已解压的扩展程序"）
    dist/chaoxing-ai-helper-extension.zip

架构:
    src/bridge.js   ISOLATED world，监听页面消息 → 转交 background service worker
    src/bundle.js   MAIN world，主脚本 + GM API 垫片（网络走 window.postMessage 桥接）
    background.js   service worker，真正发起跨域请求（不受页面 CORS 限制）
"""
import base64
import json
import os
import re
import shutil
import zipfile

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(DIST, "chaoxing-ai-helper-extension")
USER_JS = os.path.join(DIST, "chaoxing-ai-helper.user.js")
ZIP = os.path.join(DIST, "chaoxing-ai-helper-extension.zip")

LIBS = os.path.join(BASE, "libs")

VERSION = "3.3.2"

# 只在官方主域运行，避免"读取所有网站数据"的大范围授权提示
CONTENT_MATCHES = [
    "*://*.chaoxing.com/*",
    "*://*.xuexitong.com/*",
]

# 后台需要跨域访问的接口 / 中转
HOST_PERMISSIONS = [
    "https://911285.xyz/*",
    "https://gptjs.808860.xyz/*",
    "https://cors.eu.org/*",
    "https://api.allorigins.win/*",
    "https://api.cors.lol/*",
]

# --------------------------------------------------------------------------- #
# ISOLATED world：页面消息 <-> background 桥
# --------------------------------------------------------------------------- #
BRIDGE_JS = r"""/* 学习通 AI 答题助手 · 桥接（ISOLATED world）
   页面(MAIN world)通过 window.postMessage 发请求，这里转给 background，
   background 拿到结果后再 postMessage 回页面。 */
(function () {
    'use strict';
    var CH = '__xxt_gm_bridge__';

    window.addEventListener('message', function (ev) {
        if (ev.source !== window) return;
        var d = ev.data;
        if (!d || d.__xxt !== CH || d.dir !== 'req') return;

        var send = function (resp) {
            try {
                window.postMessage({ __xxt: CH, dir: 'res', id: d.id, payload: resp || { ok: false, error: 'no response' } }, '*');
            } catch (e) { }
        };

        try {
            chrome.runtime.sendMessage({ __xxt: CH, dir: 'req', id: d.id, payload: d.payload }, function (resp) {
                if (chrome.runtime.lastError) {
                    send({ ok: false, error: String(chrome.runtime.lastError.message || 'runtime error') });
                    return;
                }
                send(resp);
            });
        } catch (e) {
            send({ ok: false, error: String(e && e.message ? e.message : e) });
        }
    });
})();
"""

# --------------------------------------------------------------------------- #
# background service worker：真正发起请求
# --------------------------------------------------------------------------- #
BACKGROUND_JS = r"""/* 学习通 AI 答题助手 · 后台（MV3 service worker）
   代替 GM_xmlhttpRequest 做跨域请求，规避页面 CORS 限制。 */
'use strict';

var CH = '__xxt_gm_bridge__';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (!msg || msg.__xxt !== CH || msg.dir !== 'req') return undefined;

    var p = (msg && msg.payload) || {};
    var ctrl = new AbortController();
    var timer = p.timeout ? setTimeout(function () { try { ctrl.abort(); } catch (e) { } }, p.timeout) : null;

    var init = {
        method: p.method || 'GET',
        headers: p.headers || {},
        credentials: 'omit',
        cache: 'no-store',
        signal: ctrl.signal
    };
    if (p.data !== undefined && p.data !== null) init.body = p.data;

    fetch(p.url, init).then(function (resp) {
        return resp.text().then(function (text) {
            if (timer) clearTimeout(timer);
            sendResponse({
                ok: true,
                status: resp.status,
                statusText: resp.statusText || '',
                responseText: text,
                url: resp.url || p.url
            });
        });
    }).catch(function (err) {
        if (timer) clearTimeout(timer);
        sendResponse({ ok: false, error: String(err && err.message ? err.message : err) });
    });

    return true;   // 异步响应
});
"""

# --------------------------------------------------------------------------- #
# MAIN world 的 GM API 垫片
# --------------------------------------------------------------------------- #
SHIMS = r"""
/* ================= GM API 垫片（内容脚本 MAIN world 用） ================= */
var __GM_PREFIX = 'gptjs_gm_';
var GM_info = { script: { version: '__VERSION__', name: '学习通AI答题助手(扩展版)' } };
var unsafeWindow = window;

function GM_getValue(key, dflt) {
    try {
        var v = window.localStorage.getItem(__GM_PREFIX + key);
        return (v === null || v === undefined) ? dflt : v;
    } catch (e) { return dflt; }
}
function GM_setValue(key, value) {
    try { window.localStorage.setItem(__GM_PREFIX + key, String(value)); } catch (e) { }
}
function GM_deleteValue(key) {
    try { window.localStorage.removeItem(__GM_PREFIX + key); } catch (e) { }
}
function GM_getResourceText(name) {
    if (name !== 'Table') return '';
    try {
        var bin = atob(__TABLE_B64__);
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new TextDecoder('utf-8').decode(bytes);
    } catch (e) { return '{}'; }
}

/* ====== 网络请求：优先走 background 桥接（无 CORS 限制），失败再退回页面 fetch ====== */
var __XXT_CH = '__xxt_gm_bridge__';
var __xxtSeq = 0;
var __xxtPending = Object.create(null);
var __xxtBridgeAlive = false;
var __xxtBridgeDead = false;

window.addEventListener('message', function (ev) {
    if (ev.source !== window) return;
    var d = ev.data;
    if (!d || d.__xxt !== __XXT_CH || d.dir !== 'res') return;
    var cb = __xxtPending[d.id];
    if (!cb) return;
    delete __xxtPending[d.id];
    __xxtBridgeAlive = true;
    try { cb(d.payload || { ok: false, error: 'empty bridge payload' }); } catch (e) { }
});

function __xxtDirectFetch(opt) {
    var ctrl = new AbortController();
    var timer = null;
    if (opt.timeout) timer = setTimeout(function () { try { ctrl.abort(); } catch (e) { } }, opt.timeout);
    var init = {
        method: opt.method || 'GET',
        headers: opt.headers || {},
        credentials: 'omit',
        cache: 'no-store',
        signal: ctrl.signal
    };
    if (opt.data !== undefined && opt.data !== null) init.body = opt.data;
    fetch(opt.url, init).then(function (resp) {
        return resp.text().then(function (text) {
            if (timer) clearTimeout(timer);
            if (opt.onload) opt.onload({ status: resp.status, statusText: resp.statusText, responseText: text, response: text, finalUrl: resp.url });
        });
    }).catch(function (err) {
        if (timer) clearTimeout(timer);
        if (err && err.name === 'AbortError') { if (opt.ontimeout) opt.ontimeout({ status: 0, responseText: '' }); }
        else if (opt.onerror) opt.onerror({ status: 0, responseText: '', error: String(err) });
    });
}

function GM_xmlhttpRequest(opt) {
    if (__xxtBridgeDead) return __xxtDirectFetch(opt);

    var id = 'xxt' + (++__xxtSeq) + '_' + Math.random().toString(36).slice(2);
    var finished = false;
    var timer = null;

    function cleanup() {
        if (timer) { clearTimeout(timer); timer = null; }
        delete __xxtPending[id];
    }
    function done(fn, arg) {
        if (finished) return;
        finished = true;
        cleanup();
        try { fn && fn(arg); } catch (e) { }
    }

    __xxtPending[id] = function (resp) {
        if (!resp || resp.ok === false) {
            var msg = (resp && resp.error) || 'bridge error';
            // 桥接本身出问题（扩展被重载 / background 不可用）→ 退回页面 fetch
            if (!__xxtBridgeAlive) {
                __xxtBridgeDead = true;
                finished = true;
                cleanup();
                console.warn('[CRACK] 后台桥接不可用（' + msg + '），改用页面 fetch 直连');
                return __xxtDirectFetch(opt);
            }
            return done(opt.onerror, { status: 0, responseText: '', error: msg });
        }
        done(opt.onload, {
            status: resp.status,
            statusText: resp.statusText || '',
            responseText: resp.responseText || '',
            response: resp.responseText || '',
            finalUrl: resp.url || opt.url
        });
    };

    if (opt.timeout) {
        timer = setTimeout(function () { done(opt.ontimeout, { status: 0, responseText: '' }); }, opt.timeout);
    }

    try {
        window.postMessage({
            __xxt: __XXT_CH,
            dir: 'req',
            id: id,
            payload: {
                method: opt.method || 'GET',
                url: opt.url,
                headers: opt.headers || {},
                data: (opt.data === undefined ? null : opt.data),
                timeout: opt.timeout || 30000
            }
        }, '*');
    } catch (e) {
        __xxtBridgeDead = true;
        finished = true;
        cleanup();
        __xxtDirectFetch(opt);
    }
}
"""


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def main():
    if not os.path.exists(USER_JS):
        raise SystemExit("请先运行 python src/build.py")

    script = read(USER_JS)
    # 站点匹配范围以构建好的 user.js 为准，保证扩展与脚本一致
    script_matches = re.findall(r"^// @match\s+(\S+)", script, re.M)
    if script_matches:
        CONTENT_MATCHES[:] = script_matches
    jq = read(os.path.join(LIBS, "jquery-3.7.1.min.js"))
    swal = read(os.path.join(LIBS, "sweetalert2-11.1.0.all.min.js"))
    typr = read(os.path.join(LIBS, "TyprMd5.js"))
    guard = read(os.path.join(LIBS, "request-guard.js"))
    table_b64 = base64.b64encode(open(os.path.join(LIBS, "table.json"), "rb").read()).decode()

    shims = SHIMS.replace("__VERSION__", VERSION)

    bundle = f"""/* 学习通 AI 答题助手 · 扩展注入包（由 src/build_extension.py 生成，勿手改） */
(function () {{
/* 非严格模式：依赖库里有 this 指向 window 的 UMD 写法 */
var __PAGE = {{
    jq: window.jQuery, dollar: window.$, swal: window.Swal,
    sweetalert: window.Sweetalert2, md5: window.md5, typr: window.Typr
}};
var __TABLE_B64__ = "{table_b64}";

{shims}

/* ================= 依赖库 ================= */
/* --- jQuery 3.7.1 --- */
{jq}
var __JQ = window.jQuery || window.$;
window.jQuery = __PAGE.jq; window.$ = __PAGE.dollar;

/* --- SweetAlert2 --- */
{swal}
var __SWAL = window.Swal || window.Sweetalert2;
window.Swal = __PAGE.swal; window.Sweetalert2 = __PAGE.sweetalert;

/* --- Typr + md5 --- */
{typr}
var __MD5 = (typeof md5 !== 'undefined' && md5) ? md5 : window.md5;
window.md5 = __PAGE.md5;

/* --- request-guard --- */
{guard}

var jQuery = __JQ;
var $ = __JQ;
var Swal = __SWAL;
var md5 = __MD5;

/* ================= 主脚本 ================= */
{script}
}})();
"""

    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "src"), exist_ok=True)
    os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)

    with open(os.path.join(OUT, "src", "bundle.js"), "w", encoding="utf-8") as fh:
        fh.write(bundle)
    with open(os.path.join(OUT, "src", "bridge.js"), "w", encoding="utf-8") as fh:
        fh.write(BRIDGE_JS)
    with open(os.path.join(OUT, "background.js"), "w", encoding="utf-8") as fh:
        fh.write(BACKGROUND_JS)

    manifest = {
        "manifest_version": 3,
        "name": "学习通AI答题助手（免积分版）",
        "version": VERSION,
        "description": "学习通/超星作业考试 AI 自动答题，免积分破解版：免费通道 + 后台自动铸号。",
        "minimum_chrome_version": "111",
        "homepage_url": "https://github.com/Zhao-Yicheng/chaoxing-ai-helper",
        "icons": {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png",
        },
        "background": {
            "service_worker": "background.js",
        },
        "content_scripts": [
            {
                "matches": CONTENT_MATCHES,
                "js": ["src/bridge.js"],
                "run_at": "document_start",
                "all_frames": True,
            },
            {
                "matches": CONTENT_MATCHES,
                "js": ["src/bundle.js"],
                "run_at": "document_end",
                "world": "MAIN",
                "all_frames": True,
            },
        ],
        "host_permissions": HOST_PERMISSIONS,
    }
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)

    make_icons(os.path.join(OUT, "icons"))

    if os.path.exists(ZIP):
        os.remove(ZIP)
    with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
        base_out = os.path.join(ROOT, OUT)
        for base, _, files in os.walk(base_out):
            for f in files:
                full = os.path.join(base, f)
                zf.write(full, os.path.relpath(full, base_out))

    print(f"[OK] {os.path.relpath(OUT, ROOT)}")
    print(f"     bundle {len(bundle) / 1024:.0f} KB | match {len(CONTENT_MATCHES)} 条 | host {len(HOST_PERMISSIONS)} 条")
    print(f"[OK] {os.path.relpath(ZIP, ROOT)}  ({os.path.getsize(ZIP) / 1024:.0f} KB)")


def make_icons(icon_dir):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except Exception as exc:
        print("[icons] 缺少 Pillow，跳过:", exc)
        return
    for size in (16, 48, 128):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=max(3, size // 6), fill=(5, 150, 105, 255))
        try:
            font = ImageFont.load_default(size=int(size * 0.55))
        except Exception:
            font = None
        if font:
            d.text((size / 2, size / 2), "AI", fill="white", anchor="mm", font=font)
        img.save(os.path.join(icon_dir, f"icon{size}.png"))


if __name__ == "__main__":
    main()
