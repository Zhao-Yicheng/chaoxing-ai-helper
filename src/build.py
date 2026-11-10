#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""构建免积分油猴脚本（自动建池版，无预设账号池）。

用法:
    python src/build.py            # 产出 dist/chaoxing-ai-helper.user.js
"""
import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)

SRC = os.path.join(BASE, "base", "chaoxing-helper-3.2.9-original.js")
MOD = os.path.join(BASE, "crack_module.js")
OUT = os.path.join(ROOT, "dist", "chaoxing-ai-helper.user.js")

REPO = "Zhao-Yicheng/chaoxing-ai-helper"
RAW = f"https://raw.githubusercontent.com/{REPO}/main/dist/chaoxing-ai-helper.user.js"

HEADER_OLD = """// @name                ChatGPT学习通作业考试助手
// @version             3.2.9
// @description         本脚本【采用ChatGPT,Claude,Gemini等世界顶尖AI生成答案】 【🥇操作简单】ChatGPT学习通助手，安装即可使用；推荐使用作业、考试自动答题【✨版本特性】版本特性:无题库，全采用AI回复答案，原作者:Ne-21
"""

HEADER_NEW = f"""// @name                学习通AI答题助手（免积分版）
// @namespace           https://github.com/{REPO}
// @version             3.2.12
// @description         学习通/超星作业考试 AI 自动答题。免积分破解：u=0 免费通道 + 后台自动铸号建池，不消耗积分。原作者: Ne-21
// @author              Zhao-Yicheng (破解改造)
// @updateURL           {RAW}
// @downloadURL         {RAW}
// @connect             *
// @connect             cors.eu.org
// @connect             api.allorigins.win
// @connect             api.cors.lol
"""

PANEL_OLD = """            $('#userInfo').html(notice + "积分余额:" + score);"""

PANEL_NEW = """            $('#userInfo').html(
                (CRACK.enabled ? '<b style="color:#059669">免积分破解模式：答题走免费通道，不消耗积分</b><br>' : '')
                + notice + '积分余额:' + score + (CRACK.enabled ? '（仅展示，不再扣费）' : '')
            );
            function _poolText() {
                var left = crackPoolCredits();
                var st = '';
                try {
                    var raw = localStorage.getItem('GPTJsCrack.keeperStatus');
                    if (raw) {
                        var o = JSON.parse(raw);
                        if (o && o.t && Date.now() - (o.ts || 0) < 10 * 60 * 1000) st = ' · ' + o.t;
                    }
                } catch (e) { }
                return '账号池：' + crackPoolRead().length + ' 个号 / 约 ' + left + ' 道题' + (CRACK.autoRefill ? '（后台自动补充）' : '') + st;
            }
            var $poolLine = $('<div>').css({ marginTop: '6px', fontSize: '12px', color: '#059669' }).text(_poolText());
            $('#userInfo').append($poolLine);
            if (!$poolLine.data('crackTimer')) {
                var _t = setInterval(function () {
                    if (!document.body.contains($poolLine[0])) { clearInterval(_t); return; }
                    var left = crackPoolCredits();
                    $poolLine.css('color', left > 0 ? '#059669' : '#ea580c').text(_poolText());
                }, 5000);
                $poolLine.data('crackTimer', _t);
            }"""

AUTH_OLD = "var _authPromise = initFastestHost();"
AUTH_NEW = """var _authPromise = CRACK.enabled
    ? Promise.resolve({ host: _host, skipped: true, response: '{"code":"200","data":{"score":"破解模式","notice":"<b style=\\\\"color:#059669\\\\">已跳过账号校验（破解版），不会弹验证码</b><br>"}}' })
    : initFastestHost();"""

MODEL_OLD = """    if (lastSelectedModel) {
        $('#modelSelect').val(lastSelectedModel);
    }"""

MODEL_NEW = MODEL_OLD + """
    if (CRACK.enabled) {
        localStorage.setItem('GPTJsSetting.model', CRACK.freeModel);
        $('#modelSelect').val(CRACK.freeModel);
    }"""

FN_OLD = "function getAnswer(_t, _q, retryCount = 0) {\n    var preserveWhitespace = Boolean(_q && _q.preserveWhitespace);"
FN_NEW = "function getAnswerLegacy(_t, _q, retryCount = 0) {\n    var preserveWhitespace = Boolean(_q && _q.preserveWhitespace);"

GETANSWER = """/* ==================== 破解版入口 getAnswer ==================== */
function getAnswer(_t, _q, retryCount = 0) {
    var preserveWhitespace = Boolean(_q && _q.preserveWhitespace);

    var _payload, _display;
    if (_q && typeof _q === 'object' && (_q.payload != null || _q.display != null)) {
        _payload = _q.payload != null ? String(_q.payload) : '';
        _display = _q.display != null ? String(_q.display) : _payload;
    } else {
        _payload = _q == null ? '' : String(_q);
        _display = _payload;
    }

    var _qPrefix = '';
    if (_currentQuestionMeta) {
        var _m = _currentQuestionMeta;
        _qPrefix = '第' + ((_m.index != null ? _m.index : -1) + 1);
        if (_m.total) _qPrefix += '/' + _m.total;
        _qPrefix += '题 [' + (_m.typeName || '未知') + '] ';
    }

    var _intervalMs = Math.min(60000, setting.time !== undefined ? setting.time : 2500);
    var _nowTs = Date.now();
    var _waitMs = Math.max(0, _ne21NextAiAllowedAt - _nowTs);
    _ne21NextAiAllowedAt = Math.max(_nowTs, _ne21NextAiAllowedAt) + _intervalMs;

    function crackRun() {
        var $thinkingLog = logger('<span class="ne21-log-spinner"></span>AI 思考中<span class="ne21-log-dots"><i></i><i></i><i></i></span>' + (retryCount > 0 ? '（第' + (retryCount + 1) + '次）' : ''), 'gray');

        if (!CRACK.enabled) return getAnswerLegacy(_t, _q, retryCount);

        return crackGetAnswer(_payload, CRACK.freeModel, { log: $thinkingLog }).then(function (answer) {
            return preserveWhitespace ? answer : answer.replace(/^[A-Z]\\s*\\n\\s*/, '').trim();
        }).catch(function (err) {
            var reason = (err && (err.msg || err.message)) || '未知错误';
            updateLogEntry($thinkingLog, '免积分通道失败（' + reason + '），回退原版通道...', 'orange');
            return getAnswerLegacy(_t, _q, retryCount);
        });
    }

    if (_waitMs > 0) {
        return new Promise(function (resolve, reject) {
            var $waitLog = logger('<span class="ne21-log-spinner"></span>搜题间隔限制，等待 ' + Math.round(_waitMs / 1000) + 's 后发起请求...', 'gray');
            setTimeout(function () {
                updateLogEntry($waitLog, '开始请求（免积分模式）', 'gray');
                crackRun().then(resolve).catch(reject);
            }, _waitMs);
        });
    }
    return crackRun();
}

function doWork(index, doms, dom) {"""


def main():
    src = open(SRC, encoding="utf-8").read()
    mod = open(MOD, encoding="utf-8").read().replace("__SEED__", json.dumps([]))

    assert HEADER_OLD in src, "脚本头部不匹配"
    src = src.replace(HEADER_OLD, HEADER_NEW, 1)

    anchor = "var _w = unsafeWindow,\n"
    assert anchor in src
    src = src.replace(anchor, mod.strip() + "\n\n" + anchor, 1)

    assert AUTH_OLD in src
    src = src.replace(AUTH_OLD, AUTH_NEW, 1)

    assert PANEL_OLD in src
    src = src.replace(PANEL_OLD, PANEL_NEW, 1)

    assert MODEL_OLD in src
    src = src.replace(MODEL_OLD, MODEL_NEW, 1)

    assert FN_OLD in src
    src = src.replace(FN_OLD, FN_NEW, 1)

    # 原版逻辑里的版本号固定为接口版本，避免 @version 升级影响 v 参数
    src = src.replace("GM_info['script']['version']", "'3.2.9'")
    src = src.replace("encodeURIComponent(GM_info.script.version)", "'3.2.9'")

    assert "function doWork(index, doms, dom) {" in src
    src = src.replace("function doWork(index, doms, dom) {", GETANSWER, 1)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(src)
    print(f"[OK] {os.path.relpath(OUT, ROOT)}  ({len(src)} chars)")


if __name__ == "__main__":
    main()
