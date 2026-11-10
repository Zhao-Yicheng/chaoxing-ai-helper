#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建浏览器扩展（MV3，自动建池版）并打包 zip。

用法:
    python src/build_extension.py
产出:
    dist/chaoxing-ai-helper-extension/   （可直接"加载已解压的扩展程序"）
    dist/chaoxing-ai-helper-extension.zip
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

SHIMS = r"""
/* ================= GM API 垫片（内容脚本 MAIN world 用） ================= */
var __GM_PREFIX = 'gptjs_gm_';
var GM_info = { script: { version: '3.2.10', name: '学习通AI答题助手(扩展版)' } };
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
function GM_xmlhttpRequest(opt) {
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
            if (opt.onload) opt.onload({
                status: resp.status,
                statusText: resp.statusText,
                responseText: text,
                response: text,
                finalUrl: resp.url
            });
        });
    }).catch(function (err) {
        if (timer) clearTimeout(timer);
        if (err && err.name === 'AbortError') {
            if (opt.ontimeout) opt.ontimeout({ status: 0, responseText: '' });
        } else if (opt.onerror) {
            opt.onerror({ status: 0, responseText: '', error: String(err) });
        }
    });
}
"""


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def main():
    if not os.path.exists(USER_JS):
        raise SystemExit("请先运行 python src/build.py")

    script = read(USER_JS)
    jq = read(os.path.join(LIBS, "jquery-3.7.1.min.js"))
    swal = read(os.path.join(LIBS, "sweetalert2-11.1.0.all.min.js"))
    typr = read(os.path.join(LIBS, "TyprMd5.js"))
    guard = read(os.path.join(LIBS, "request-guard.js"))
    table_b64 = base64.b64encode(open(os.path.join(LIBS, "table.json"), "rb").read()).decode()

    matches = re.findall(r"^// @match\s+(\S+)", script, re.M)

    bundle = f"""/* 学习通 AI 答题助手 · 扩展注入包（由 src/build_extension.py 生成，勿手改） */
(function () {{
/* 非严格模式：依赖库里有 this 指向 window 的 UMD 写法 */
var __PAGE = {{
    jq: window.jQuery, dollar: window.$, swal: window.Swal,
    sweetalert: window.Sweetalert2, md5: window.md5, typr: window.Typr
}};
var __TABLE_B64__ = "{table_b64}";

{SHIMS}

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

    manifest = {
        "manifest_version": 3,
        "name": "学习通AI答题助手（免积分版）",
        "version": "3.2.10",
        "description": "学习通/超星作业考试 AI 自动答题，免积分破解版：免费通道 + 后台自动铸号。",
        "minimum_chrome_version": "111",
        "homepage_url": "https://github.com/Zhao-Yicheng/chaoxing-ai-helper",
        "icons": {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png",
        },
        "content_scripts": [{
            "matches": matches,
            "js": ["src/bundle.js"],
            "run_at": "document_end",
            "world": "MAIN",
            "all_frames": True,
        }],
        "host_permissions": [
            "https://911285.xyz/*",
            "https://gptjs.808860.xyz/*",
        ],
    }
    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)

    make_icons(os.path.join(OUT, "icons"))

    if os.path.exists(ZIP):
        os.remove(ZIP)
    with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
        for base, _, files in os.walk(OUT):
            for f in files:
                full = os.path.join(base, f)
                zf.write(full, os.path.relpath(full, OUT))

    print(f"[OK] {os.path.relpath(OUT, ROOT)}  (bundle {len(bundle) / 1024:.0f} KB, {len(matches)} 条 match)")
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
