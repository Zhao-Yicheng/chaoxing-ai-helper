// ==UserScript==
// @name                学习通AI答题助手（免积分版）
// @namespace           https://github.com/Zhao-Yicheng/chaoxing-ai-helper
// @version             3.2.11
// @description         学习通/超星作业考试 AI 自动答题。免积分破解：u=0 免费通道 + 后台自动铸号建池，不消耗积分。原作者: Ne-21
// @author              Zhao-Yicheng (破解改造)
// @updateURL           https://raw.githubusercontent.com/Zhao-Yicheng/chaoxing-ai-helper/main/dist/chaoxing-ai-helper.user.js
// @downloadURL         https://raw.githubusercontent.com/Zhao-Yicheng/chaoxing-ai-helper/main/dist/chaoxing-ai-helper.user.js
// @match               *://*.chaoxing.com/*
// @match               *://*.xuexitong.com/*
// @match               *://*.edu.cn/*
// @match               *://*.org.cn/*
// @match               *://*.ac.cn/*
// @match               *://*.xueyinonline.com/*
// @match               *://*.sslibrary.com/*
// @match               *://*.neauce.com/*
// @match               *://*.nbdlib.cn/*
// @match               *://*.hnsyu.net/*
// @match               *://*.qutjxjy.cn/*
// @match               *://*.ynny.cn/*
// @match               *://*.hnvist.cn/*
// @match               *://*.fjlecb.cn/*
// @match               *://*.gdhkmooc.com/*
// @match               *://*.cugbonline.cn/*
// @match               *://*.zjelib.cn/*
// @match               *://*.cqrspx.cn/*
// @match               *://*.zhihui-yun.com/*
// @match               *://*.cqie.cn/*
// @match               *://*.ccqmxx.com/*
// @match               *://*.jxgmxy.com/*
// @match               *://*.jnzyjsxy.cn/*
// @connect             911285.xyz
// @connect             gptjs.808860.xyz
// @connect             127.0.0.1
// @run-at              document-end
// @grant               unsafeWindow
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @grant               GM_deleteValue
// @grant               GM_info
// @grant               GM_getResourceText
// @require             https://gptjs.808860.xyz/libs/TyprMd5.js
// @require             https://gptjs.808860.xyz/libs/sweetalert2-11.1.0.all.min.js
// @require             https://gptjs.808860.xyz/libs/jquery-3.7.1.min.js
// @require             https://gptjs.808860.xyz/libs/request-guard.js?v=1
// @resource            Table https://gptjs.808860.xyz/libs/table.json
// @icon                data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2Utd2lkdGg9IjEuNSIgY2xhc3M9ImgtNiB3LTYiIHJvbGU9ImltZyI+PHRpdGxlPkNoYXRHUFQ8L3RpdGxlPjx0ZXh0IHg9Ii05OTk5IiB5PSItOTk5OSI+Q2hhdEdQVDwvdGV4dD48cGF0aCBkPSJNMzcuNTMyNCAxNi44NzA3QzM3Ljk4MDggMTUuNTI0MSAzOC4xMzYzIDE0LjA5NzQgMzcuOTg4NiAxMi42ODU5QzM3Ljg0MDkgMTEuMjc0NCAzNy4zOTM0IDkuOTEwNzYgMzYuNjc2IDguNjg2MjJDMzUuNjEyNiA2LjgzNDA0IDMzLjk4ODIgNS4zNjc2IDMyLjAzNzMgNC40OTg1QzMwLjA4NjQgMy42Mjk0MSAyNy45MDk4IDMuNDAyNTkgMjUuODIxNSAzLjg1MDc4QzI0Ljg3OTYgMi43ODkzIDIzLjcyMTkgMS45NDEyNSAyMi40MjU3IDEuMzYzNDFDMjEuMTI5NSAwLjc4NTU3NSAxOS43MjQ5IDAuNDkxMjY5IDE4LjMwNTggMC41MDAxOTdDMTYuMTcwOCAwLjQ5NTA0NCAxNC4wODkzIDEuMTY4MDMgMTIuMzYxNCAyLjQyMjE0QzEwLjYzMzUgMy42NzYyNCA5LjM0ODUzIDUuNDQ2NjYgOC42OTE3IDcuNDc4MTVDNy4zMDA4NSA3Ljc2Mjg2IDUuOTg2ODYgOC4zNDE0IDQuODM3NyA5LjE3NTA1QzMuNjg4NTQgMTAuMDA4NyAyLjczMDczIDExLjA3ODIgMi4wMjgzOSAxMi4zMTJDMC45NTY0NjQgMTQuMTU5MSAwLjQ5ODkwNSAxNi4yOTg4IDAuNzIxNjk4IDE4LjQyMjhDMC45NDQ0OTIgMjAuNTQ2NyAxLjgzNjEyIDIyLjU0NDkgMy4yNjggMjQuMTI5M0MyLjgxOTY2IDI1LjQ3NTkgMi42NjQxMyAyNi45MDI2IDIuODExODIgMjguMzE0MUMyLjk1OTUxIDI5LjcyNTYgMy40MDcwMSAzMS4wODkyIDQuMTI0MzcgMzIuMzEzOEM1LjE4NzkxIDM0LjE2NTkgNi44MTIzIDM1LjYzMjIgOC43NjMyMSAzNi41MDEzQzEwLjcxNDEgMzcuMzcwNCAxMi44OTA3IDM3LjU5NzMgMTQuOTc4OSAzNy4xNDkyQzE1LjkyMDggMzguMjEwNyAxNy4wNzg2IDM5LjA1ODcgMTguMzc0NyAzOS42MzY2QzE5LjY3MDkgNDAuMjE0NCAyMS4wNzU1IDQwLjUwODcgMjIuNDk0NiA0MC40OTk4QzI0LjYzMDcgNDAuNTA1NCAyNi43MTMzIDM5LjgzMjEgMjguNDQxOCAzOC41NzcyQzMwLjE3MDQgMzcuMzIyMyAzMS40NTU2IDM1LjU1MDYgMzIuMTExOSAzMy41MTc5QzMzLjUwMjcgMzMuMjMzMiAzNC44MTY3IDMyLjY1NDcgMzUuOTY1OSAzMS44MjFDMzcuMTE1IDMwLjk4NzQgMzguMDcyOCAyOS45MTc4IDM4Ljc3NTIgMjguNjg0QzM5Ljg0NTggMjYuODM3MSA0MC4zMDIzIDI0LjY5NzkgNDAuMDc4OSAyMi41NzQ4QzM5Ljg1NTYgMjAuNDUxNyAzOC45NjM5IDE4LjQ1NDQgMzcuNTMyNCAxNi44NzA3Wk0yMi40OTc4IDM3Ljg4NDlDMjAuNzQ0MyAzNy44ODc0IDE5LjA0NTkgMzcuMjczMyAxNy42OTk0IDM2LjE1MDFDMTcuNzYwMSAzNi4xMTcgMTcuODY2NiAzNi4wNTg2IDE3LjkzNiAzNi4wMTYxTDI1LjkwMDQgMzEuNDE1NkMyNi4xMDAzIDMxLjMwMTkgMjYuMjY2MyAzMS4xMzcgMjYuMzgxMyAzMC45Mzc4QzI2LjQ5NjQgMzAuNzM4NiAyNi41NTYzIDMwLjUxMjQgMjYuNTU0OSAzMC4yODI1VjE5LjA1NDJMMjkuOTIxMyAyMC45OThDMjkuOTM4OSAyMS4wMDY4IDI5Ljk1NDEgMjEuMDE5OCAyOS45NjU2IDIxLjAzNTlDMjkuOTc3IDIxLjA1MiAyOS45ODQyIDIxLjA3MDcgMjkuOTg2NyAyMS4wOTAyVjMwLjM4ODlDMjkuOTg0MiAzMi4zNzUgMjkuMTk0NiAzNC4yNzkxIDI3Ljc5MDkgMzUuNjg0MUMyNi4zODcyIDM3LjA4OTIgMjQuNDgzOCAzNy44ODA2IDIyLjQ5NzggMzcuODg0OVpNNi4zOTIyNyAzMS4wMDY0QzUuNTEzOTcgMjkuNDg4OCA1LjE5NzQyIDI3LjcxMDcgNS40OTgwNCAyNS45ODMyQzUuNTU3MTggMjYuMDE4NyA1LjY2MDQ4IDI2LjA4MTggNS43MzQ2MSAyNi4xMjQ0TDEzLjY5OSAzMC43MjQ4QzEzLjg5NzUgMzAuODQwOCAxNC4xMjMzIDMwLjkwMiAxNC4zNTMyIDMwLjkwMkMxNC41ODMgMzAuOTAyIDE0LjgwODggMzAuODQwOCAxNS4wMDczIDMwLjcyNDhMMjQuNzMxIDI1LjExMDNWMjguOTk3OUMyNC43MzIxIDI5LjAxNzcgMjQuNzI4MyAyOS4wMzc2IDI0LjcxOTkgMjkuMDU1NkMyNC43MTE1IDI5LjA3MzYgMjQuNjk4OCAyOS4wODkzIDI0LjY4MjkgMjkuMTAxMkwxNi42MzE3IDMzLjc0OTdDMTQuOTA5NiAzNC43NDE2IDEyLjg2NDMgMzUuMDA5NyAxMC45NDQ3IDM0LjQ5NTRDOS4wMjUwNiAzMy45ODExIDcuMzg3ODUgMzIuNzI2MyA2LjM5MjI3IDMxLjAwNjRaTTQuMjk3MDcgMTMuNjE5NEM1LjE3MTU2IDEyLjA5OTggNi41NTI3OSAxMC45MzY0IDguMTk4ODUgMTAuMzMyN0M4LjE5ODg1IDEwLjQwMTMgOC4xOTQ5MSAxMC41MjI4IDguMTk0OTEgMTAuNjA3MVYxOS44MDhDOC4xOTM1MSAyMC4wMzc4IDguMjUzMzQgMjAuMjYzOCA4LjM2ODIzIDIwLjQ2MjlDOC40ODMxMiAyMC42NjE5IDguNjQ4OTMgMjAuODI2NyA4Ljg0ODYzIDIwLjk0MDRMMTguNTcyMyAyNi41NTQyTDE1LjIwNiAyOC40OTc5QzE1LjE4OTQgMjguNTA4OSAxNS4xNzAzIDI4LjUxNTUgMTUuMTUwNSAyOC41MTczQzE1LjEzMDcgMjguNTE5MSAxNS4xMTA3IDI4LjUxNiAxNS4wOTI0IDI4LjUwODJMNy4wNDA0NiAyMy44NTU3QzUuMzIxMzUgMjIuODYwMSA0LjA2NzE2IDIxLjIyMzUgMy41NTI4OSAxOS4zMDQ2QzMuMDM4NjIgMTcuMzg1OCAzLjMwNjI0IDE1LjM0MTMgNC4yOTcwNyAxMy42MTk0Wk0zMS45NTUgMjAuMDU1NkwyMi4yMzEyIDE0LjQ0MTFMMjUuNTk3NiAxMi40OTgxQzI1LjYxNDIgMTIuNDg3MiAyNS42MzMzIDEyLjQ4MDUgMjUuNjUzMSAxMi40Nzg3QzI1LjY3MjkgMTIuNDc2OSAyNS42OTI4IDEyLjQ4MDEgMjUuNzExMSAxMi40ODc5TDMzLjc2MzEgMTcuMTM2NEMzNC45OTY3IDE3Ljg0OSAzNi4wMDE3IDE4Ljg5ODIgMzYuNjYwNiAyMC4xNjEzQzM3LjMxOTQgMjEuNDI0NCAzNy42MDQ3IDIyLjg0OSAzNy40ODMyIDI0LjI2ODRDMzcuMzYxNyAyNS42ODc4IDM2LjgzODIgMjcuMDQzMiAzNS45NzQzIDI4LjE3NTlDMzUuMTEwMyAyOS4zMDg2IDMzLjk0MTUgMzAuMTcxNyAzMi42MDQ3IDMwLjY2NDFDMzIuNjA0NyAzMC41OTQ3IDMyLjYwNDcgMzAuNDczMyAzMi42MDQ3IDMwLjM4ODlWMjEuMTg4QzMyLjYwNjYgMjAuOTU4NiAzMi41NDc0IDIwLjczMjggMzIuNDMzMiAyMC41MzM4QzMyLjMxOSAyMC4zMzQ4IDMyLjE1NCAyMC4xNjk4IDMxLjk1NSAyMC4wNTU2Wk0zNS4zMDU1IDE1LjAxMjhDMzUuMjQ2NCAxNC45NzY1IDM1LjE0MzEgMTQuOTE0MiAzNS4wNjkgMTQuODcxN0wyNy4xMDQ1IDEwLjI3MTJDMjYuOTA2IDEwLjE1NTQgMjYuNjgwMyAxMC4wOTQzIDI2LjQ1MDQgMTAuMDk0M0MyNi4yMjA2IDEwLjA5NDMgMjUuOTk0OCAxMC4xNTU0IDI1Ljc5NjMgMTAuMjcxMkwxNi4wNzI2IDE1Ljg4NThWMTEuOTk4MkMxNi4wNzE1IDExLjk3ODMgMTYuMDc1MyAxMS45NTg1IDE2LjA4MzcgMTEuOTQwNUMxNi4wOTIxIDExLjkyMjUgMTYuMTA0OCAxMS45MDY4IDE2LjEyMDcgMTEuODk0OUwyNC4xNzE5IDcuMjUwMjVDMjUuNDA1MyA2LjUzOTAzIDI2LjgxNTggNi4xOTM3NiAyOC4yMzgzIDYuMjU0ODJDMjkuNjYwOCA2LjMxNTg5IDMxLjAzNjQgNi43ODA3NyAzMi4yMDQ0IDcuNTk1MDhDMzMuMzcyMyA4LjQwOTM5IDM0LjI4NDIgOS41Mzk0NSAzNC44MzM0IDEwLjg1MzFDMzUuMzgyNiAxMi4xNjY3IDM1LjU0NjQgMTMuNjA5NSAzNS4zMDU1IDE1LjAxMjhaTTE0LjI0MjQgMjEuOTQxOUwxMC44NzUyIDE5Ljk5ODFDMTAuODU3NiAxOS45ODkzIDEwLjg0MjMgMTkuOTc2MyAxMC44MzA5IDE5Ljk2MDJDMTAuODE5NSAxOS45NDQxIDEwLjgxMjIgMTkuOTI1NCAxMC44MDk4IDE5LjkwNThWMTAuNjA3MUMxMC44MTA3IDkuMTgyOTUgMTEuMjE3MyA3Ljc4ODQ4IDExLjk4MTkgNi41ODY5NkMxMi43NDY2IDUuMzg1NDQgMTMuODM3NyA0LjQyNjU5IDE1LjEyNzUgMy44MjI2NEMxNi40MTczIDMuMjE4NjkgMTcuODUyNCAyLjk5NDY0IDE5LjI2NDkgMy4xNzY3QzIwLjY3NzUgMy4zNTg3NiAyMi4wMDg5IDMuOTM5NDEgMjMuMTAzNCA0Ljg1MDY3QzIzLjA0MjcgNC44ODM3OSAyMi45MzcgNC45NDIxNSAyMi44NjY4IDQuOTg0NzNMMTQuOTAyNCA5LjU4NTE3QzE0LjcwMjUgOS42OTg3OCAxNC41MzY2IDkuODYzNTYgMTQuNDIxNSAxMC4wNjI2QzE0LjMwNjUgMTAuMjYxNiAxNC4yNDY2IDEwLjQ4NzcgMTQuMjQ3OSAxMC43MTc1TDE0LjI0MjQgMjEuOTQxOVpNMTYuMDcxIDE3Ljk5OTFMMjAuNDAxOCAxNS40OTc4TDI0LjczMjUgMTcuOTk3NVYyMi45OTg1TDIwLjQwMTggMjUuNDk4M0wxNi4wNzEgMjIuOTk4NVYxNy45OTkxWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PC9zdmc+
// @homepage            https://scriptcat.org/script-show-page/1027
// @license             未经授权请勿二开
// ==/UserScript==


var setting = {
    showBox: 1,

    task: 0,

    video: 1,
    audio: 1,
    rate: 1,
    review: 0,

    work: 1,
    time: 2500,
    sub: 1,
    force: 0,
    decrypt: 1,
    redo: 0,

    examTurn: 0,
    examTurnTime: 0,
    goodStudent: 1,
    alterTitle: 1,

    autoLogin: 0,
    phone: '',
    password: ''
}

var ANSWER_SEPARATOR = '¦';

try {
    var domainMatch = location.hostname.match(/(?:^|\.)(chaoxing\.com|xuexitong\.com)$/);
    if (domainMatch) document.domain = domainMatch[1];
} catch (e) {
    console.error('[GPTJs] 无法设置 document.domain', e);
}

try {

    Object.defineProperty(unsafeWindow, 'onblur', {
        get: function () { return function () { }; },
        set: function () { }
    });

    document.hasFocus = function () { return true; };

    Object.defineProperty(document, 'visibilityState', {
        get: function () { return 'visible'; },
        configurable: true
    });
    Object.defineProperty(document, 'hidden', {
        get: function () { return false; },
        configurable: true
    });
} catch (e) {
    console.error('[GPTJs] 无法劫持 window.onblur / document.hasFocus', e);
}

var localStorage = {

    _getPrefix: function () {
        try {
            var host = window.location.hostname;

            if (host === 'xuexitong.com' || host.endsWith('.xuexitong.com')) {
                host = 'chaoxing.com';
            }
            var matches = host.match(/([^.]+\.(?:com|net|org|edu)\.cn|[^.]+\.[^.]+)$/i);
            return (matches ? matches[0] : host) + ':';
        } catch (e) {
            return '';
        }
    },
    getItem: function (key) {
        var prefixedKey = this._getPrefix() + key;
        var val = undefined;

        try {
            val = GM_getValue(prefixedKey);
        } catch (e) {

        }

        if (val === undefined || val === null) {
            try {
                val = window.localStorage.getItem(key);
                if (val !== null) {
                    GM_setValue(prefixedKey, val);
                }
            } catch (e) {

            }
        }
        return (val !== undefined && val !== null) ? val : null;
    },
    setItem: function (key, value) {
        var prefixedKey = this._getPrefix() + key;

        try {
            GM_setValue(prefixedKey, String(value));
        } catch (e) { }

        try {
            window.localStorage.setItem(key, String(value));
        } catch (e) { }
    },
    removeItem: function (key) {
        var prefixedKey = this._getPrefix() + key;
        try {
            GM_deleteValue(prefixedKey);
        } catch (e) { }
        try {
            window.localStorage.removeItem(key);
        } catch (e) { }
    }
};

/* ==================== 破解模块 START ====================
 * 纯脚本版（不依赖任何本地服务、不做验证码识别）
 *
 * 实测结论:
 *   1. POST /api/v1/cx 传 u=0 不计费直接给答案，但每个出口 IP 只有约 20 次额度。
 *   2. 新 UID 首次查询 /api/v1/auth 会自动注册并送 20 积分；同一 IP 注册次数很少，
 *      超额后对新 UID 直接返回 429 请求过于频繁。
 *   3. UID 不绑定 IP：注册出来的号在任何网络下都能直连答题。
 *
 * 于是脚本按这个顺序拿答案:
 *   免费额度 u=0 → 账号池（内置种子号 + 本地攒的号）→ 直连注册新号 → 回退原版
 * ======================================================= */

/* 预置账号池（每号 20 积分，1 题 1 分；用完脚本会自动踢掉） */
var CRACK_SEED = [];

var CRACK = {
    enabled: true,
    uid: '0',
    freeModel: 'GPT-3.5',
    apiVersion: '3.2.9',
    poolKey: 'GPTJsCrack.pool.v2',
    seedFlag: 'GPTJsCrack.seedLoaded.v2',
    mint: true,
    mintFirst: true,
    mintCooldown: 10 * 60 * 1000,
    maxRetry: 2,
    log: true,

    /* 后台自动补池 */
    autoRefill: true,
    poolTarget: 200,
    keeperInterval: 45000,     // 保留兼容（已不再用于 setInterval）
    keeperHeartbeat: 15000,    // 心跳间隔
    mintParallel: 2,
    relayTimeout: 15000
};

function crackLog() {
    if (!CRACK.log) return;
    try { console.log.apply(console, ['[CRACK]'].concat([].slice.call(arguments))); } catch (e) { }
}

function crackCid() {
    var cid = '';
    try { cid = localStorage.getItem('GPTJsCrack.cid') || ''; } catch (e) { }
    if (!/^[a-f0-9]{32}$/.test(cid)) {
        var s = '';
        for (var i = 0; i < 32; i++) s += '0123456789abcdef'.charAt(Math.floor(Math.random() * 16));
        cid = s;
        try { localStorage.setItem('GPTJsCrack.cid', cid); } catch (e) { }
    }
    return cid;
}

/* ---------------- 账号池 ---------------- */
function crackPoolRead() {
    var pool = [];
    try { pool = JSON.parse(localStorage.getItem(CRACK.poolKey) || '[]') || []; } catch (e) { pool = []; }
    if (!Array.isArray(pool)) pool = [];
    return pool.filter(function (x) { return x && /^\d+$/.test(String(x.u)); });
}

function crackPoolWrite(pool) {
    try { localStorage.setItem(CRACK.poolKey, JSON.stringify(pool.slice(0, 200))); } catch (e) { }
}

function crackSeedLoad() {
    var flag = '';
    try { flag = localStorage.getItem(CRACK.seedFlag) || ''; } catch (e) { }
    var pool = crackPoolRead();
    var seen = {};
    pool.forEach(function (x) { seen[String(x.u)] = true; });
    var added = 0;
    (CRACK_SEED || []).forEach(function (x) {
        var u = String(x && x.u);
        if (!/^\d+$/.test(u) || seen[u]) return;
        pool.push({ u: u, s: Number(x.s) || 20 });
        seen[u] = true;
        added++;
    });
    if (added) crackPoolWrite(pool);
    try { localStorage.setItem(CRACK.seedFlag, '1'); } catch (e) { }
    return added;
}

function crackPoolDrop(uid) {
    var pool = crackPoolRead().filter(function (x) { return String(x.u) !== String(uid); });
    crackPoolWrite(pool);
}

function crackPoolSpend(uid) {
    var pool = crackPoolRead();
    for (var i = 0; i < pool.length; i++) {
        if (String(pool[i].u) === String(uid)) {
            pool[i].s = Math.max(0, (Number(pool[i].s) || 0) - 1);
            if (pool[i].s <= 0) pool.splice(i, 1);
            break;
        }
    }
    crackPoolWrite(pool);
}

function crackPoolBest() {
    var pool = crackPoolRead();
    if (!pool.length) return null;
    pool.sort(function (a, b) { return (Number(b.s) || 0) - (Number(a.s) || 0); });
    return pool[0];
}

/* ---------------- 答题请求 ---------------- */
function crackOnce(host, question, model, uid) {
    return new Promise(function (resolve) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: host + '/api/v1/cx?v=' + CRACK.apiVersion,
            headers: { 'Content-type': 'application/x-www-form-urlencoded', 'Authorization': '' },
            data: 'question=' + encodeURIComponent(question) + '&u=' + encodeURIComponent(uid) + '&model=' + encodeURIComponent(model),
            timeout: 25000,
            onload: function (xhr) {
                var obj = {};
                try { obj = JSON.parse(xhr.responseText) || {}; } catch (e) { }
                resolve({
                    status: xhr.status,
                    code: obj.code,
                    msg: obj.msg || '',
                    answer: (obj.data && typeof obj.data.answer === 'string') ? obj.data.answer : ''
                });
            },
            ontimeout: function () { resolve({ status: -1, msg: '请求超时', answer: '' }); },
            onerror: function () { resolve({ status: -2, msg: '网络错误', answer: '' }); }
        });
    });
}

/* 单账号通道：主机轮换 + 429/5xx 重试 */
function crackChannel(question, model, uid) {
    var hosts = [_host].concat(HOST_CANDIDATES.filter(function (h) { return h !== _host; }));
    var tried = 0;
    var lastMsg = '';

    function next() {
        if (tried >= CRACK.maxRetry * hosts.length) {
            var err = new Error(lastMsg || '通道失败');
            err.status = -3;
            throw err;
        }
        var host = hosts[tried % hosts.length];
        tried++;
        return crackOnce(host, question, model, uid).then(function (res) {
            if (res.status === 200 && res.code == 200 && res.answer) return res.answer;
            lastMsg = res.msg || ('HTTP ' + res.status);
            if (res.status === 429 || res.status === 403 || res.status === 500 || res.status === -1 || res.status === -2) {
                return new Promise(function (r) { setTimeout(r, 900 + tried * 500); }).then(next);
            }
            var err = new Error(lastMsg);
            err.status = res.status;
            err.msg = lastMsg;
            throw err;
        });
    }
    return next();
}

/* ---------------- 自己 IP 或公共 CORS 中转 注册新号 ---------------- */
/* 公共 CORS 中转：换出口 IP 去注册（每个干净 IP 送 20 分） */
var CRACK_RELAYS = [
    { base: 'https://cors.eu.org/', mode: 'path' },
    { base: 'https://api.allorigins.win/raw?url=', mode: 'query' },
    { base: 'https://api.allorigins.win/get?url=', mode: 'query' },
    { base: 'https://api.cors.lol/?url=', mode: 'query' }
];

function crackRelayUrl(relay, target) {
    return relay.mode === 'path' ? relay.base + target : relay.base + encodeURIComponent(target);
}

function crackParseScore(text) {
    var obj = {};
    try { obj = JSON.parse(text) || {}; } catch (e) { return null; }
    if (obj.contents && typeof obj.contents === 'string') {
        try { obj = JSON.parse(obj.contents) || {}; } catch (e) { return null; }
    }
    if (obj.data && obj.data.score !== undefined) return Number(obj.data.score);
    return null;
}

function crackAuthVia(url, uid) {
    return new Promise(function (resolve) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: { 'X-Client-Id': crackCid() },
            timeout: CRACK.relayTimeout || 15000,
            onload: function (xhr) {
                resolve({ status: xhr.status, score: crackParseScore(xhr.responseText) });
            },
            onerror: function () { resolve({ status: -1, score: null }); },
            ontimeout: function () { resolve({ status: -1, score: null }); }
        });
    });
}

var crackRelayCool = {};

function crackRelayScore(relay) {
    try {
        var sc = JSON.parse(localStorage.getItem('GPTJsCrack.relayScore') || '{}') || {};
        return Number(sc[relay.base] || 0);
    } catch (e) { return 0; }
}
function crackRelayScoreUp(relay, delta) {
    if (!relay) return;
    try {
        var sc = JSON.parse(localStorage.getItem('GPTJsCrack.relayScore') || '{}') || {};
        sc[relay.base] = Math.max(0, Number(sc[relay.base] || 0) + delta);
        localStorage.setItem('GPTJsCrack.relayScore', JSON.stringify(sc));
    } catch (e) { }
}
function crackRelayMark(relay, ms) {
    if (!relay) return;
    crackRelayCool[relay.base] = Date.now() + ms;
}
function crackRelayAvailable() {
    var now = Date.now();
    return CRACK_RELAYS.filter(function (r) { return (crackRelayCool[r.base] || 0) < now; });
}

function crackShuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

/* 一次铸号：随机挑一个中转发一个新 UID，成功（score>0）就入池 */
function crackMintAttempt(relay) {
    var uid = String(Math.floor(10000000 + Math.random() * 89000000));
    var target = _host + '/api/v1/auth?uid=' + encodeURIComponent(uid) + '&v=' + CRACK.apiVersion;
    var url = relay ? crackRelayUrl(relay, target) : target;
    return crackAuthVia(url, uid).then(function (res) {
        var tag = relay ? relay.base.replace(/^https?:\/\//, '').slice(0, 18) : '直连';
        if (res.score && res.score > 0) {
            var pool = crackPoolRead();
            if (!pool.some(function (x) { return String(x.u) === uid; })) {
                pool.push({ u: uid, s: res.score });
                crackPoolWrite(pool);
            }
            crackRelayScoreUp(relay, 1);
            crackLog('铸号成功 [' + tag + '] ' + uid + ' +' + res.score + ' 分');
            return { u: uid, s: res.score };
        }
        crackLog('铸号失败 [' + tag + '] http=' + res.status + ' score=' + res.score);
        crackRelayScoreUp(relay, -0.2);
        if (res.status === 429) crackRelayMark(relay, 180000);        // 限流：3 分钟
        else if (res.status === -1 || res.status === 408) crackRelayMark(relay, 90000); // 超时：1.5 分钟
        else if (res.status >= 500) crackRelayMark(relay, 120000);     // 中转自身故障：2 分钟
        else if (res.status === 200 && res.score === 0) crackRelayMark(relay, 600000); // 该出口 IP 已被用过
        return null;
    });
}

/* 并发铸一批：同时打多个中转，谁成都算 */
function crackMintRound(parallel) {
    var n = Math.max(1, parallel || 3);
    var avail = crackRelayAvailable();
    if (!avail.length) {
        var wait = 0;
        CRACK_RELAYS.forEach(function (r) {
            var left = (crackRelayCool[r.base] || 0) - Date.now();
            if (left > 0) wait = Math.min(wait || left, left);
        });
        crackLog('所有中转都在冷却中，' + Math.max(1, Math.round(wait / 1000)) + 's 后恢复（期间只试直连）');
        crackKeeperStatus('中转冷却中（' + Math.max(1, Math.round(wait / 1000)) + 's）');
    }
    avail.sort(function (a, b) { return crackRelayScore(b) - crackRelayScore(a); });
    var relays = crackShuffle(avail.slice(0, Math.max(2, n)));
    var jobs = [];
    // 第一个用直连（自己 IP 有余量时最快）
    jobs.push(crackMintAttempt(null));
    relays.forEach(function (r, i) {
        jobs.push(crackMintAttempt(r));
        if (i === 0) {
            // 命中率最高的那个，稍后复投一次
            jobs.push(new Promise(function (res) {
                setTimeout(function () { crackMintAttempt(r).then(res, function () { res(null); }); }, 1500);
            }));
        }
    });
    return Promise.all(jobs).then(function (all) {
        var got = all.filter(Boolean);
        crackPoolStats(got.length ? 1 : 0, got.length ? 0 : 1);
        return got;
    });
}

function crackPoolStats(okDelta, failDelta) {
    try {
        var st = JSON.parse(localStorage.getItem('GPTJsCrack.mintStats') || '{}') || {};
        st.ok = (st.ok || 0) + okDelta;
        st.fail = (st.fail || 0) + failDelta;
        st.last = Date.now();
        localStorage.setItem('GPTJsCrack.mintStats', JSON.stringify(st));
    } catch (e) { }
}

function crackPoolCredits() {
    return crackPoolRead().reduce(function (a, b) { return a + (Number(b.s) || 0); }, 0);
}

/* 单次铸号（答题前用，短预算） */
function crackMint(budgetMs) {
    if (!CRACK.mint) return Promise.resolve(null);
    var last = 0;
    try { last = parseInt(localStorage.getItem('GPTJsCrack.lastMint') || '0', 10); } catch (e) { }
    if (Date.now() - last < CRACK.mintCooldown) return Promise.resolve(null);
    try { localStorage.setItem('GPTJsCrack.lastMint', String(Date.now())); } catch (e) { }

    var deadline = Date.now() + (budgetMs || 6000);
    return Promise.race([
        crackMintRound(2),
        new Promise(function (resolve) { setTimeout(function () { resolve([]); }, (budgetMs || 6000) + 500); })
    ]).then(function (got) {
        return (got && got.length) ? got[0] : null;
    });
}

/* ---------------- 后台自动补池 ---------------- */
var crackKeeperTimer = null;
var crackKeeperBusy = false;
var crackKeeperBusyAt = 0;
var crackKeeperFails = 0;
var crackKeeperNextAt = 0;
var crackKeeperTicks = 0;

function crackKeeperStatus(text) {
    try { localStorage.setItem('GPTJsCrack.keeperStatus', JSON.stringify({ t: text, ts: Date.now() })); } catch (e) { }
}

/* 心跳间隔固定 15s，真正的"什么时候补"由 crackKeeperNextAt 控制，避免被 clearInterval 搞崩 */
function crackKeeperTick() {
    try {
        if (!CRACK.autoRefill) return;
        var now = Date.now();

        // 同一个页面可能有多个 iframe，各自都跑一份 keeper：用本地时间戳做互斥
        var lastAny = parseInt(localStorage.getItem('GPTJsCrack.keeperLast') || '0', 10);
        if (now - lastAny < 20000) return;

        if (now < crackKeeperNextAt) return;

        if (crackKeeperBusy) {
            if (now - crackKeeperBusyAt < 75000) return;   // 上一轮还在跑
            crackLog('上一轮补池超时（>75s），强制重置');
            crackKeeperBusy = false;
        }

        crackKeeperTicks++;
        var credits = crackPoolCredits();
        if (credits >= (CRACK.poolTarget || 200)) {
            crackKeeperStatus('\u5df2\u5145\u8db3\uff08' + crackPoolRead().length + ' \u4e2a\u53f7 / ' + credits + ' \u5206\uff09');
            if (crackKeeperTicks % 4 === 0) { crackLog('keeper 心跳：池 ' + crackPoolRead().length + ' 个号 / ' + credits + ' 分 ≥ 目标 ' + (CRACK.poolTarget || 200) + '，无需补充'); }
            return;
        }

        crackKeeperBusy = true;
        crackKeeperBusyAt = now;
        try { localStorage.setItem('GPTJsCrack.keeperLast', String(now)); } catch (e) { }
        crackKeeperStatus('\u8865\u6c60\u4e2d\u2026\uff08\u5f53\u524d ' + credits + ' \u5206\uff09');
        crackLog('keeper 心跳：池 ' + crackPoolRead().length + ' 个号 / ' + credits + ' 分，开始补');

        Promise.resolve()
            .then(function () { return crackMintRound(CRACK.mintParallel || 3); })
            .then(function (got) {
                got = got || [];
                var left = crackPoolCredits();
                if (got.length) {
                    crackKeeperFails = 0;
                    crackKeeperNextAt = Date.now() + 5000;
                    crackLog('\u8865\u6c60\u5b8c\u6210 +' + got.length + ' \u4e2a\u53f7\uff0c\u5f53\u524d ' + crackPoolRead().length + ' \u4e2a\u53f7 / ' + left + ' \u5206');
                    crackKeeperStatus('\u521a\u8865\u5230 ' + crackPoolRead().length + ' \u4e2a\u53f7 / ' + left + ' \u5206');
                } else {
                    crackKeeperFails++;
                    var wait = Math.min(120000, 15000 * Math.pow(1.8, crackKeeperFails));
                    crackKeeperNextAt = Date.now() + wait;
                    crackLog('\u672c\u8f6e\u6ca1\u6210\u529f\uff0c' + Math.round(wait / 1000) + 's \u540e\u91cd\u8bd5\uff08\u7b2c ' + crackKeeperFails + ' \u6b21\u8fde\u7eed\u5931\u8d25\uff09');
                    if (crackKeeperFails >= 3) {
                        crackLog('\u516c\u5171\u4e2d\u8f6c\u53ef\u80fd\u88ab\u9650\u6d41\uff1a\u5efa\u8bae\u5207\u6362\u7f51\u7edc\uff08\u624b\u673a\u70ed\u70b9\uff09\u6216\u7b49\u51e0\u5206\u949f');
                    }
                    crackKeeperStatus('\u4e0a\u6b21\u8865\u6c60\u5931\u8d25\uff0c' + Math.round(wait / 1000) + 's \u540e\u91cd\u8bd5');
                }
            })
            .catch(function (e) {
                crackKeeperFails++;
                crackKeeperNextAt = Date.now() + 60000;
                crackLog('补池异常: ' + (e && e.message ? e.message : e));
                crackKeeperStatus('\u8865\u6c60\u5f02\u5e38\uff0c\u7a0d\u540e\u91cd\u8bd5');
            })
            .then(function () { crackKeeperBusy = false; });
    } catch (e) {
        crackKeeperBusy = false;
        crackLog('keeper 出错: ' + (e && e.message ? e.message : e));
    }
}

function crackStartKeeper() {
    if (!CRACK.autoRefill || crackKeeperTimer) return;
    setTimeout(crackKeeperTick, 1500);
    crackKeeperTimer = setInterval(crackKeeperTick, CRACK.keeperHeartbeat || 15000);
    crackLog('\u540e\u53f0\u8865\u6c60\u5df2\u542f\u52a8\uff1a\u76ee\u6807 ' + (CRACK.poolTarget || 200) + ' \u5206\uff0c\u6bcf 15s \u5fc3\u8df3\uff0c\u4e0d\u8db3\u65f6\u81ea\u52a8\u8865\u5145');
}

/* ---------------- 主流程 ---------------- */
function crackFreeBlocked() {
    var until = 0;
    try { until = parseInt(localStorage.getItem('GPTJsCrack.freeBlockedUntil') || '0', 10); } catch (e) { }
    return Date.now() < until;
}

function crackFreeFail(err) {
    if (err && /积分不足/.test(err.message || '')) {
        try { localStorage.setItem('GPTJsCrack.freeBlockedUntil', String(Date.now() + 30 * 60 * 1000)); } catch (e) { }
        crackLog('免费额度已耗尽，30 分钟内直接走账号池');
    }
    throw err;
}

/* 账号池里挨个试，最多试 N 个号 */
function crackTryPool(question, model, rounds) {
    var pool = crackPoolRead();
    if (!pool.length) return Promise.reject(new Error('账号池为空'));
    pool.sort(function (a, b) { return (Number(b.s) || 0) - (Number(a.s) || 0); });
    var limit = Math.min(rounds || 3, pool.length);
    var i = 0;

    function next() {
        if (i >= limit) return Promise.reject(new Error('账号池里的号都失败了'));
        var acc = pool[i++];
        return crackChannel(question, model, String(acc.u)).then(function (answer) {
            crackPoolSpend(acc.u);
            crackLog('用号 ' + acc.u + ' 答题成功');
            return answer;
        }).catch(function (e) {
            var msg = (e && e.message) || '';
            crackLog('池账号 ' + acc.u + ' 失败: ' + msg);
            if (/积分不足|UID/i.test(msg)) crackPoolDrop(acc.u);
            return next();
        });
    }
    return next();
}

function crackAsk(question) {
    var model = CRACK.freeModel;

    if (!crackPoolRead().length) crackSeedLoad();

    var freeStep = crackFreeBlocked()
        ? Promise.reject(new Error('免费额度冷却中'))
        : crackChannel(question, model, CRACK.uid).catch(crackFreeFail);

    function useAccount(acc) {
        return crackChannel(question, model, acc.u).then(function (answer) {
            crackPoolSpend(acc.u);
            return answer;
        });
    }

    function afterFree() {
        var reg = CRACK.mintFirst ? crackMint(6000) : Promise.resolve(null);
        return reg.then(function (acc) {
            if (acc) return useAccount(acc);
            return crackTryPool(question, model, 3).catch(function (poolErr) {
                // 池子空的：现铸一个再答（自动版首次答题走这里）
                if (crackPoolRead().length) throw poolErr;
                crackLog('账号池为空，正在现铸账号...');
                return crackMint(12000).then(function (acc2) {
                    if (!acc2) throw poolErr;
                    return useAccount(acc2);
                });
            });
        });
    }

    return freeStep.catch(afterFree).catch(function (err) {
        crackLog('本次无可用通道: ' + err.message + ' → 后台补池中，先回退原版');
        crackKeeperTick();
        throw err;
    });
}

/* 兼容 getAnswer 的 Promise 契约（无缓存） */
function crackGetAnswer(payload, model, ctx) {
    return crackAsk(payload).then(function (answer) {
        var clean = answer.replace(/。$/, '');
        if (ctx && ctx.log) updateLogEntry(ctx.log, '答案:' + clean, 'purple');
        return clean;
    });
}

/* 启动自检 + 后台补池 */
function crackIsTop() {
    try { return window.top === window; } catch (e) { return false; }
}

function crackBoot() {
    var n = crackSeedLoad();
    var size = crackPoolRead().length;
    if (crackIsTop()) {
    crackLog('账号池就绪: ' + size + ' 个号（本次灌入 ' + n + ' 个种子），可用题目约 ' + crackPoolCredits() + ' 道');
    } else {
        crackLog('子框架加载：账号池 ' + size + ' 个号 / ' + crackPoolCredits() + ' 分（补池由顶层页面负责）');
    }
    crackStartKeeper();
}
setTimeout(crackBoot, 800);
/* ==================== 破解模块 END ==================== */

var _w = unsafeWindow,
    _l = location,
    _d = _w.document,
    $ = _w.jQuery || (function () {
        try { if (top.jQuery) return top.jQuery; } catch (_) {}
        return jQuery;
    })(),
    md5 = md5 || window.md5,
    UE = _w.UE,
    Swal = Swal || window.Swal;

var HOST_CANDIDATES = [
    "https://911285.xyz",
    "https://gptjs.808860.xyz"
];

var _cachedHost = localStorage.getItem('GPTJsSetting.hostSelected');
var _cachedAt = parseInt(localStorage.getItem('GPTJsSetting.hostSelectedAt') || '0');

var _host = _cachedHost || HOST_CANDIDATES[0];

function requestGuardClientId() {
    var saved = GM_getValue('GPTJsSetting.guardClientId', '');
    if (!/^[a-f0-9]{32}$/.test(saved)) {
        saved = GptRequestGuard.clientId();
        GM_setValue('GPTJsSetting.guardClientId', saved);
    }
    return saved;
}
var _guardClientId = requestGuardClientId();

function guardHttp(host, path, method, data, headers) {
    return new Promise(function (resolve, reject) {
        GM_xmlhttpRequest({
            method: method,
            url: host + path,
            headers: Object.assign({ 'X-Client-Id': _guardClientId }, data ? { 'Content-Type': 'application/json' } : {}, headers || {}),
            data: data ? JSON.stringify(data) : undefined,
            timeout: 8000,
            onload: function (xhr) {
                var body = {};
                try {
                    var parsed = JSON.parse(xhr.responseText);
                    if (parsed && typeof parsed === 'object') body = parsed;
                } catch (_) { }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({ data: body, response: xhr.responseText });
                } else {
                    var error = new Error(body.message || body.msg || '服务器请求失败，请稍后重试。');
                    error.response = { status: xhr.status, data: body };
                    reject(error);
                }
            },
            onerror: function () { reject(new Error('暂时无法连接服务器，请稍后重试。')); },
            ontimeout: function () { reject(new Error('服务器响应超时，请稍后重试。')); }
        });
    });
}

function requestAuthRaw(host, headers) {
    var startAt = Date.now();
    var learningAccountId = getLearningAccountId();
    return guardHttp(host, '/api/v1/auth?uid=' + encodeURIComponent(learningAccountId || '')
        + '&v=' + '3.2.9', 'GET', null, headers)
        .then(function (result) {
            return { host: host, ms: Date.now() - startAt, response: result.response, learningAccountId: learningAccountId };
        });
}

function requestAuth(host, initialError) {
    var pendingError = initialError;
    return GptRequestGuard.withCaptcha(function (headers) {
        if (pendingError) {
            var error = pendingError;
            pendingError = null;
            return Promise.reject(error);
        }
        return requestAuthRaw(host, headers);
    }, {
        clientId: _guardClientId,
        refresh: function (captchaId, headers) {
            return guardHttp(host, '/api/security/captcha/refresh', 'POST', { captchaId: captchaId }, headers);
        }
    });
}

function rememberHost(result) {
    _host = result.host;
    localStorage.setItem('GPTJsSetting.hostSelected', _host);
    localStorage.setItem('GPTJsSetting.hostSelectedAt', String(Date.now()));
    return result;
}

function findFastest() {
    return new Promise(function (resolve, reject) {
        var finished = false;
        var failures = 0;
        var limitedHost;
        var firstError;
        HOST_CANDIDATES.forEach(function (host) {

            requestAuthRaw(host, { 'X-Client-Id': _guardClientId }).then(function (result) {
                if (!finished) {
                    finished = true;
                    resolve(rememberHost(result));
                }
            }).catch(function (error) {
                firstError = firstError || error;
                if (error.response && error.response.status === 429 && !limitedHost) limitedHost = { host: host, error: error };
                failures++;
                if (failures === HOST_CANDIDATES.length && !finished) {
                    finished = true;
                    if (limitedHost) requestAuth(limitedHost.host, limitedHost.error).then(function (result) {
                        resolve(rememberHost(result));
                    }).catch(reject);
                    else reject(firstError);
                }
            });
        });
    });
}

function initFastestHost() {
    var twoHours = 2 * 60 * 60 * 1000;
    if (_cachedAt && Date.now() - _cachedAt < twoHours) {
        return requestAuthRaw(_host, { 'X-Client-Id': _guardClientId }).catch(function (error) {

            if (error.response && error.response.status === 429) return requestAuth(_host, error);
            return findFastest();
        });
    }
    return findFastest();
}

var _authPromise = CRACK.enabled
    ? Promise.resolve({ host: _host, skipped: true, response: '{"code":"200","data":{"score":"破解模式","notice":"<b style=\\"color:#059669\\">已跳过账号校验（破解版），不会弹验证码</b><br>"}}' })
    : initFastestHost();

_authPromise.catch(function () { });

var _mlist, _defaults, _domList, $subBtn, $saveBtn, $frame_c, $okBtn;
var _currentQuestionMeta = null;

var _ne21NextAiAllowedAt = 0;

$('.navshow').find('a:contains(体验新版)')[0] ? $('.navshow').find('a:contains(体验新版)')[0].click() : '';

setting.decrypt ? decryptFont() : '';

if (localStorage.getItem('GPTJsSetting.time') !== null) {
    var _savedTime = parseFloat(localStorage.getItem('GPTJsSetting.time'));
    if (isFinite(_savedTime) && _savedTime >= 0) {
        setting.time = _savedTime * 1000;
    }
}

function getPanelShortcut() {
    try {
        var shortcut = JSON.parse(localStorage.getItem('GPTJsSetting.panelShortcut'));
        if (shortcut && /^(F([1-9]|1[0-2])|Key[A-Z]|Digit[0-9])$/.test(shortcut.code) &&
            (/^F\d+$/.test(shortcut.code) || shortcut.ctrlKey || shortcut.altKey || shortcut.metaKey)) {
            return shortcut;
        }
    } catch (_) {}
    return { code: 'F9' };
}

function formatPanelShortcut(shortcut) {
    return [shortcut.ctrlKey && 'Ctrl', shortcut.altKey && 'Alt', shortcut.shiftKey && 'Shift',
        shortcut.metaKey && 'Meta', shortcut.code.replace(/^(Key|Digit)/, '')].filter(Boolean).join('+');
}

function refreshPanelShortcut(doc) {
    var label = formatPanelShortcut(getPanelShortcut());
    var badge = doc.querySelector('#ne-21box .ne21-kbd');
    if (badge) {
        badge.textContent = label + ' 显隐';
        badge.title = '按 ' + label + ' 显示/隐藏面板，可在设置中修改';
    }
    var header = doc.querySelector('#ne-21box .ne21-header');
    if (header) header.title = '按住标题栏可拖动 / 按 ' + label + ' 显示或隐藏面板 / 点击右侧按钮收起';
    var input = doc.getElementById('GPTJsSetting.panelShortcut');
    if (input) input.value = label;
}

function bindPanelShortcut(doc) {
    if (doc._ne21ShortcutHandler) return;
    doc._ne21ShortcutHandler = function (event) {
        if (event.defaultPrevented || event.isComposing ||
            event.target && event.target.id === 'GPTJsSetting.panelShortcut') return;
        var shortcut = getPanelShortcut();
        if (event.code !== shortcut.code || !!event.ctrlKey !== !!shortcut.ctrlKey ||
            !!event.altKey !== !!shortcut.altKey || !!event.shiftKey !== !!shortcut.shiftKey ||
            !!event.metaKey !== !!shortcut.metaKey) return;

        if (!/^F\d+$/.test(shortcut.code) && event.target &&
            (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;
        if (!getPanelDocument().getElementById('ne-21box')) return;
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) toggleBoxVisibility();
    };
    doc.addEventListener('keydown', doc._ne21ShortcutHandler, true);
}

function toggleBoxVisibility() {
    var $box = $('#ne-21box', getPanelDocument());
    if ($box.length === 0) return;
    if (localStorage.getItem('GPTJsSetting.showBox') === 'hide') {
        $box.css('display', '');
        localStorage.setItem('GPTJsSetting.showBox', 'show');
    } else {
        $box.css('display', 'none');
        localStorage.setItem('GPTJsSetting.showBox', 'hide');
    }
}
bindPanelShortcut(document);
try {
    bindPanelShortcut(getPanelDocument());
} catch (_) {}

function waitForJQueryElement(selector, timeout) {
    return new Promise(function (resolve) {
        var interval = setInterval(function () {
            if ($(selector).length > 0) {
                clearInterval(interval);
                if (timer) clearTimeout(timer);
                resolve(true);
            }
        }, 500);
        var timer = null;
        if (timeout && timeout > 0) {
            timer = setTimeout(function () {
                clearInterval(interval);
                resolve(false);
            }, timeout);
        }
    });
}

if (window === top) {
    showBox();
}

if (_l.hostname.startsWith('i.mooc.') || _l.hostname.startsWith('i.chaoxing.com') ||
    (_l.hostname === 'i.xuexitong.com' && (_l.pathname === '/' || _l.pathname.startsWith('/space/')))) {
    if (window === top) {
        if (_l.pathname.includes('/space/out_link.shtml')) {
            logger('检测到外链嵌套页面，脚本将在 iframe 内自动运行考试/作业', 'green');
        } else {
            logger('ChatGPT学习通助手已就绪，进入课程视频、作业或考试页面即可自动运行', 'green');
        }
    }
} else if (_l.pathname == '/login') {
    showBox()
    if (setting.autoLogin) waitForJQueryElement('#phone', 30000).then(function (found) { if (found) autoLogin(); else logger('登录页等待超时（30s），未找到手机号输入框', 'red'); });
} else if (_l.pathname.includes('/mycourse/studentstudy')) {
    showBox()
    clearLogEntries('初始化完毕！')
    setupAntiSleep()
    setupAutoRefresh()

    setInterval(function () {
        try {
            if (typeof _w.checkJob === 'function' && !_w._gptCheckJobHooked) {
                _w._gptCheckJobHooked = true;
                _w.checkJob = function () { return false; };
            }
        } catch (_) {}
        try {
            if (_w.PCount && typeof _w.PCount.next === 'function' && !_w.PCount._gptHooked) {
                var _origPCountNext = _w.PCount.next;
                _w.PCount.next = function () {

                    if (_w._gptJsJumpAllowed) {
                        _w._gptJsJumpAllowed = false;
                        return _origPCountNext.apply(this, arguments);
                    }
                    console.log('[GPTJs] 拦截 PCount.next 自动跳转');
                    return false;
                };
                _w.PCount._gptHooked = true;
            }
        } catch (_) {}
    }, 1000);

    var _blankSectionChecks = 0;
    var _lastBlankSectionDoc = null;
    setInterval(function () {
        var cardsDoc = getStudyCardsDocument(_w);
        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true' || !isEmptyStudyPage(cardsDoc)) {
            _blankSectionChecks = 0;
            _lastBlankSectionDoc = null;
            return;
        }
        if (cardsDoc !== _lastBlankSectionDoc) {
            _blankSectionChecks = 0;
            _lastBlankSectionDoc = cardsDoc;
        }
        _blankSectionChecks++;
        if (_blankSectionChecks >= 2) {
            _blankSectionChecks = 0;
            toNext(true);
        }
    }, 5000);
} else if (_l.pathname.includes('/knowledge/cards')) {
    setupAntiSleep()
    var params = getTaskParams()
    var parsedParams = null;
    if (params && params !== '$mArg') {
        try { parsedParams = $.parseJSON(params); } catch (e) { parsedParams = null; }
    }
    if (!parsedParams || !parsedParams['attachments'] || parsedParams['attachments'].length <= 0) {
        logger('检测到无任务点（无任务参数），自动跳过', 'red')
        setTimeout(function () { toNext(true) }, 2000)
    } else {

        waitForJQueryElement('.wrap .ans-cc .ans-attach-ct', 8000).then(function (found) {
            if (!found) {

                var anyExists = document.querySelectorAll('.ans-attach-ct, .ans-job-ct, .chapter-item').length;
                if (anyExists > 0) {
                    logger('章节任务均已完成，准备跳转', 'green')
                } else {
                    logger('检测到无任务点（DOM 无任务节点），自动跳过', 'red')
                }
                setTimeout(function () { toNext(anyExists === 0) }, 2000)
                return;
            }

            try { if (typeof top.checkJob === 'function') top.checkJob = function () { return false; }; } catch (_) {}
            var _checkJobGuard = setInterval(function () {
                try { if (typeof top.checkJob === 'function') top.checkJob = function () { return false; }; } catch (_) {}
            }, 3000);
            _defaults = parsedParams['defaults']

            var allDomNodes = []
            $.each($('.wrap .ans-cc .ans-attach-ct'), function (i, t) {
                var iframeEl = $(t).find('iframe')
                var dataStr = ''
                try { dataStr = iframeEl.attr('data') || '' } catch (_) {}
                allDomNodes.push({ iframe: iframeEl, data: dataStr })
            })

            var rawList = parsedParams['attachments']
            _mlist = []
            _domList = []
            var usedDomIndexes = {}
            for (var ai = 0; ai < rawList.length; ai++) {
                var att = rawList[ai]
                var attMid = (att['property'] && att['property']['mid']) || ''
                var attObjId = (att['property'] && att['property']['objectid']) || ''
                var matched = false

                for (var di = 0; di < allDomNodes.length; di++) {
                    if (usedDomIndexes[di]) continue
                    var dStr = allDomNodes[di].data
                    if (dStr && ((attMid && dStr.indexOf(attMid) !== -1) || (attObjId && dStr.indexOf(attObjId) !== -1))) {
                        _mlist.push(att)
                        _domList.push(allDomNodes[di].iframe)
                        usedDomIndexes[di] = true
                        matched = true
                        break
                    }
                }
                if (!matched) {
                    var skipType = att['type'] || (att['property'] && att['property']['module']) || 'unknown'
                    var skipName = (att['property'] && att['property']['name']) || ''

                    if (skipType === 'knowledgeGraph') {
                        _mlist.push(att)
                        _domList.push(null)
                        console.log('[GPTJs] 保留 knowledgeGraph 任务点: ' + (skipName || '知识图谱'))
                    } else {
                        console.log('[GPTJs] 跳过无DOM对应的附件: type=' + skipType + (skipName ? ', name=' + skipName : ''))
                    }
                }
            }

            if (_mlist.length === 0 && rawList.length > 0 && allDomNodes.length > 0) {
                console.log('[GPTJs] 精确匹配未命中，回退到索引对应模式')
                _mlist = rawList
                _domList = []
                for (var fi = 0; fi < allDomNodes.length; fi++) {
                    _domList.push(allDomNodes[fi].iframe)
                }
            }
            missonStart()
        });
    }
} else if (_l.pathname.includes('/exam/test/reVersionTestStartNew')) {
    showBox()
    waitForJQueryElement('.mark_table .whiteDiv', 30000).then(function (found) { if (found) missonExam(); else logger('考试页等待超时（30s），未找到题目容器', 'red'); });
} else if (_l.pathname.includes('/mooc2/exam/preview')) {
    showBox()
    waitForJQueryElement('.mark_table .questionLi', 30000).then(function (found) { if (found) missonExamPreview(); else logger('整卷预览页等待超时（30s），未找到题目列表', 'red'); });
} else if (_l.pathname.includes('/mooc2/work/dowork')) {
    showBox()
    waitForJQueryElement('.mark_table form', 30000).then(function (found) { if (found) missonHomeWork(); else logger('作业页等待超时（30s），未找到作业表单', 'red'); });
} else if (_l.pathname.includes('/work/phone/doHomeWork')) {
    var _oldal = _w.alert
    _w.alert = function (msg) {
        if (msg == '保存成功') {
            return;
        }
        return _oldal(msg)
    }
    var _oldcf = _w.confirm
    _w.confirm = function (msg) {
        if (msg.includes('确认提交') || msg.includes('未做完')) {
            return true
        }
        return _oldcf(msg)
    }
} else if (_l.pathname.includes('/page/quiz/stu/answerQuestion')) {
    showBox()
    waitForJQueryElement('.question-item', 30000).then(function (found) {
        if (found) missonQuizPractice();
        else logger('随堂练习页等待超时（30s），未找到题目容器', 'red');
    });
} else if (_l.pathname.includes('/mooc2/exam/exam-list')) {

} else if (_l.pathname == '/mycourse/stu') {
    checkBrowser()
} else {

    if (window === top) {
        logger('ChatGPT学习通助手已就绪，进入课程视频、作业或考试页面即可自动运行', 'green');
    }
}

function checkBrowser() {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('Chrome') == -1 || GM_info.scriptHandler != 'ScriptCat') {

    }
}

function parseUrlParams() {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let _p = {}
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        _p[pair[0]] = pair[1]
    }
    return _p
}

function updateLocalStorage(event) {
    var checkbox = event.target;
    localStorage.setItem(checkbox.id, checkbox.checked);
}

function isRedoMode() {
    var stored = localStorage.getItem('GPTJsSetting.redo');
    if (stored !== null) return stored === 'true';
    return !!setting.redo;
}

function isFuzzyMatchEnabled() {
    return true;
}

function stringSimilarity(s1, s2) {
    if (!s1 && !s2) return 1;
    if (!s1 || !s2) return 0;

    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return 1;
    var len1 = s1.length, len2 = s2.length;
    if (len1 === 0 || len2 === 0) return 0;

    var prev = [], curr = [];
    for (let j = 0; j <= len2; j++) prev[j] = j;
    for (let i = 1; i <= len1; i++) {
        curr[0] = i;
        for (let j = 1; j <= len2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }
        var tmp = prev; prev = curr; curr = tmp;
    }
    var maxLen = Math.max(len1, len2);
    return 1 - prev[len2] / maxLen;
}

function findBestFuzzyMatch(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return -1;
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return -1;
    threshold = (threshold !== undefined) ? threshold : 0.5;
    var bestIndex = -1, bestScore = 0;
    for (var i = 0; i < optionTexts.length; i++) {
        var score = stringSimilarity(optionTexts[i], aiAnswer);
        if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
        }
    }
    if (bestScore >= threshold) {
        logger('相似度匹配: 最佳匹配项[' + bestIndex + '] 相似度=' + (bestScore * 100).toFixed(1) + '%', 'blue');
        return bestIndex;
    }
    logger('相似度匹配: 所有选项相似度均低于阈值(' + (threshold * 100) + '%)，最高=' + (bestScore * 100).toFixed(1) + '%', 'orange');
    return -1;
}

function findFuzzyMatchMultiple(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return [];
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return [];
    threshold = (threshold !== undefined) ? threshold : 0.5;
    var parts = aiAnswer.split(ANSWER_SEPARATOR);
    var matched = [];
    for (var p = 0; p < parts.length; p++) {
        var part = parts[p].trim();
        if (!part) continue;
        var bestIndex = -1, bestScore = 0;
        for (var i = 0; i < optionTexts.length; i++) {
            var score = stringSimilarity(optionTexts[i], part);
            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }
        if (bestScore >= threshold && matched.indexOf(bestIndex) === -1) {
            matched.push(bestIndex);
            logger('相似度匹配(多选): "' + part + '" → 选项[' + bestIndex + '] 相似度=' + (bestScore * 100).toFixed(1) + '%', 'blue');
        }
    }
    return matched;
}

function normalizeChoiceText(text) {
    return String(text == null ? '' : text)
        .replace(/^[A-Z]\s*[\.、．:：)]\s*/i, '')
        .replace(/\s+/g, '')
        .trim();
}

function getAnswerLetterIndexes(answer, optionCount) {
    var s = String(answer == null ? '' : answer).toUpperCase();
    var result = [];
    var letterPattern = /(?:^|[^A-Z])([A-Z])(?=$|[^A-Z])/g;
    var m;
    while ((m = letterPattern.exec(s)) !== null) {
        var idx = m[1].charCodeAt(0) - 65;
        if (idx >= 0 && idx < optionCount && result.indexOf(idx) === -1) result.push(idx);
    }
    var compact = String(answer == null ? '' : answer).trim();
    if (result.length === 0 && /^[A-Z]+$/.test(compact) && Array.from(compact).every(function (letter) {
        return letter.charCodeAt(0) - 65 < optionCount;
    })) {
        for (var i = 0; i < s.trim().length; i++) {
            var charIdx = s.trim().charCodeAt(i) - 65;
            if (charIdx >= 0 && charIdx < optionCount && result.indexOf(charIdx) === -1) result.push(charIdx);
        }
    }
    return result;
}

function splitAiAnswers(answer) {
    return String(answer == null ? '' : answer)
        .split(ANSWER_SEPARATOR)
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
}

function findVideoQuizMatchIndexes(optionTexts, aiAnswer, isMultiple) {
    var normalizedOptions = optionTexts.map(normalizeChoiceText);
    var parts = isMultiple ? splitAiAnswers(aiAnswer) : [String(aiAnswer == null ? '' : aiAnswer).trim()];
    var exactIndexes = parts.map(function (part) { return normalizedOptions.indexOf(normalizeChoiceText(part)); });
    if (exactIndexes.length > 0 && exactIndexes.every(function (idx) { return idx >= 0; })) {
        return Array.from(new Set(exactIndexes));
    }

    var result = getAnswerLetterIndexes(aiAnswer, optionTexts.length);
    if (result.length > 0) return isMultiple ? result : [result[0]];

    if (parts.length === 0 && aiAnswer) parts = [String(aiAnswer).trim()];

    for (var p = 0; p < parts.length; p++) {
        var normalizedAnswer = normalizeChoiceText(parts[p]);
        if (!normalizedAnswer) continue;
        for (var i = 0; i < normalizedOptions.length; i++) {
            if (result.indexOf(i) !== -1) continue;
            if (normalizedOptions[i] === normalizedAnswer ||
                normalizedOptions[i].indexOf(normalizedAnswer) !== -1 ||
                normalizedAnswer.indexOf(normalizedOptions[i]) !== -1) {
                result.push(i);
                break;
            }
        }
    }

    if (result.length === 0) {
        result = isMultiple ? findFuzzyMatchMultiple(normalizedOptions, aiAnswer, 0.45) : [findBestFuzzyMatch(normalizedOptions, aiAnswer, 0.45)];
        result = result.filter(function (idx) { return idx >= 0; });
    }
    return isMultiple ? result : result.slice(0, 1);
}

function getVideoQuizText(container, optionNodes) {
    var title = container.querySelector('.tkItem_title, .ans-videoquiz-title, .ans-videoquiz-subject, .ans-videoquiz-question, .videoquiz-title, .videoquiz-question');
    if (title) return (title.innerText || title.textContent || '').replace(/\s+/g, ' ').trim();

    var clone = container.cloneNode(true);
    try {
        Array.prototype.forEach.call(clone.querySelectorAll('.ans-videoquiz-opt, .tkTopic_numbar, .tkTopic_title, .tkTopic_oper, .tkParsing, .rightInfo, .spanNot, .spanNotBack, [id^="videoquiz-"], #knowledgeBack, #viewAnalysis, [id^="ascrail"], [hidden], [aria-hidden="true"], button, input, label'), function (node) {
            if (node.parentNode) node.parentNode.removeChild(node);
        });
    } catch (_) {}
    var text = (clone.innerText || clone.textContent || '').trim();
    (optionNodes || []).forEach(function (label) {
        var optText = (label.innerText || label.textContent || '').trim();
        if (optText) text = text.replace(optText, '');
    });
    return text.replace(/\s+/g, ' ').trim();
}

function isVideoQuizNodeVisible(node) {
    if (!node || !node.isConnected) return false;
    var view = node.ownerDocument.defaultView;
    for (var el = node; el && el.nodeType === 1; el = el.parentElement) {
        if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false;
        var style = view.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    }
    return true;
}

function getVisibleVideoQuizNode(container, selector) {
    return Array.prototype.slice.call(container.querySelectorAll(selector)).find(isVideoQuizNodeVisible);
}

function getVideoQuizResult(container) {
    if (getVisibleVideoQuizNode(container, '#videoquiz-submitting')) return 'pending';
    var wrong = getVisibleVideoQuizNode(container, '#spanNot, #spanNotBack, #spanNotBackPoint, .spanNot, .spanNotBack');
    if (wrong && /真遗憾|回答错误|答错/.test(wrong.textContent || '')) return 'wrong';
    var right = getVisibleVideoQuizNode(container, '#spanHas, .rightInfo');
    if (right && /答对|回答正确/.test(right.textContent || '')) return 'correct';
    if (getVisibleVideoQuizNode(container, '#videoquiz-continue, .ans-videoquiz-continue')) return 'correct';
    return 'pending';
}

function getVideoQuizInput(label) {
    var option = label.closest('.ans-videoquiz-opt');
    return label.control || label.querySelector('input') || (option && option.querySelector('input'));
}

function getVideoQuizFallbackIndexes(record, optionCount, isMultiple) {
    if (record.triedAnswers.length >= 16) return [];
    if (!isMultiple) {
        for (var i = 0; i < optionCount; i++) {
            if (record.triedAnswers.indexOf(String(i)) === -1) return [i];
        }
        return [];
    }

    var selected = record.aiIndexes.slice();
    var findCombination = function (start, remaining) {
        if (remaining === 0) {
            var indexes = selected.slice().sort(function (a, b) { return a - b; });
            return indexes.length && record.triedAnswers.indexOf(indexes.join(',')) === -1 ? indexes : null;
        }
        for (var idx = start; idx <= optionCount - remaining; idx++) {
            var pos = selected.indexOf(idx);
            if (pos === -1) selected.push(idx);
            else selected.splice(pos, 1);
            var found = findCombination(idx + 1, remaining - 1);
            if (pos === -1) selected.splice(selected.indexOf(idx), 1);
            else selected.push(idx);
            if (found) return found;
        }
        return null;
    };

    for (var distance = 1; distance <= optionCount; distance++) {
        var next = findCombination(0, distance);
        if (next) return next;
    }
    return [];
}

function handleVideoQuiz(doc, media, taskName) {
    if (!setting.work || localStorage.getItem('GPTJsSetting.isPaused') === 'true') return false;
    var container = getVisibleVideoQuizNode(doc, '.ans-videoquiz');
    if (!container || !media) return false;
    var result = getVideoQuizResult(container);
    var optionNodes = Array.prototype.slice.call(container.querySelectorAll('.ans-videoquiz-opt label'));
    if (optionNodes.length === 0) optionNodes = Array.prototype.slice.call(container.querySelectorAll('label'));
    var optionTexts = optionNodes.map(function (label) { return (label.innerText || label.textContent || '').trim(); });
    var inputs = optionNodes.map(getVideoQuizInput);
    var typeNode = container.querySelector('.tkTopic_title');
    var typeText = typeNode ? typeNode.textContent : '';
    var isMultiple = /多选|多项/.test(typeText) || inputs.some(function (input) { return input && input.type === 'checkbox'; });
    var isJudge = !isMultiple && (/判断/.test(typeText) || (optionTexts.length === 2 && optionTexts.every(function (t) {
        return /^(正确|错误|对|错|是|否|true|false|√|×)$/i.test(normalizeChoiceText(t));
    })));
    var question = getVideoQuizText(container, optionNodes);
    var typeName = isMultiple ? '多选题' : (isJudge ? '判断题' : '单选题');
    var quizKey = JSON.stringify([media.currentSrc || media.src || taskName, typeName, question, optionTexts]);
    media._ne21VideoQuizRecords = media._ne21VideoQuizRecords || Object.create(null);
    var record = media._ne21VideoQuizRecords[quizKey];
    if (!record) record = media._ne21VideoQuizRecords[quizKey] = { phase: 'idle', triedAnswers: [], aiIndexes: [], pendingIndexes: [] };

    if (result === 'correct') {
        record.phase = 'solved';
        record.solvedIndexes = [];
        inputs.forEach(function (input, idx) { if (input && input.checked) record.solvedIndexes.push(idx); });
        if (!record.solvedIndexes.length) record.solvedIndexes = record.pendingIndexes.slice();
        if (container.getAttribute('data-ne21-status') === 'done') return true;
        container.setAttribute('data-ne21-status', 'done');
        logger('弹题已答对，尝试点击“继续学习”并清理弹窗', 'green');
        var completedQuestion = getVideoQuizText(container);
        var btn = getVisibleVideoQuizNode(container, '#videoquiz-continue, .ans-videoquiz-continue');
        if (btn) try { btn.click(); } catch (_) {}
        setTimeout(function () {
            try {
                if (container.isConnected && getVideoQuizText(container) === completedQuestion && getVideoQuizResult(container) === 'correct') {
                    container.remove();
                }
                if (!getVisibleVideoQuizNode(doc, '.ans-videoquiz') && media.isConnected && media.paused && !media.ended && localStorage.getItem('GPTJsSetting.isPaused') !== 'true') {
                    var play = media.play();
                    if (play && play.catch) play.catch(function () {});
                }
            } catch (_) {}
        }, 800);
        return true;
    }

    if (optionNodes.length === 0) return false;

    try { media.pause(); } catch (_) {}

    var waitForManual = function (message) {
        record.phase = 'manual';
        container.setAttribute('data-ne21-status', 'manual');
        logger(message + '，已停止自动重试，请手动处理', 'orange');
    };
    if (record.phase === 'manual' || record.phase === 'requesting' || record.phase === 'selecting') return true;
    if (!question) { waitForManual('视频弹题未能提取题干'); return true; }
    var submitBtn = getVisibleVideoQuizNode(container, '#videoquiz-submit');

    if (record.phase === 'submitted') {
        if (result === 'wrong') record.phase = 'retry';
        else {
            if (Date.now() - record.submittedAt >= 15000) waitForManual('视频弹题提交结果未确认');
            return true;
        }
    }
    if (record.phase === 'retry' && !getVideoQuizFallbackIndexes(record, optionTexts.length, isMultiple).length) {
        waitForManual('视频弹题已尝试可用答案或达到 16 次上限');
        return true;
    }
    if (result === 'wrong' && !submitBtn) {
        if (!record.replayRequestedAt) {
            var back = getVisibleVideoQuizNode(container, '#knowledgeBack, .ans-videoquiz-back');
            if (!back) { waitForManual('视频弹题答错后无法恢复答题'); return true; }
            record.replayRequestedAt = Date.now();
            logger('视频弹题回答错误，先回看知识点再重试', 'orange');
            try { back.click(); } catch (_) { waitForManual('视频弹题回看失败'); }
        } else if (Date.now() - record.replayRequestedAt >= 15000) {
            waitForManual('视频弹题未能恢复答题');
        }
        return true;
    }
    if (!submitBtn || submitBtn.disabled) return true;
    record.replayRequestedAt = 0;

    var isCurrentQuiz = function () {
        return media.isConnected && isVideoQuizNodeVisible(container) && getVideoQuizText(container, optionNodes) === question && optionNodes.every(function (label) {
            return label.isConnected && container.contains(label);
        });
    };
    var doSubmit = function (indexes) {
        record.pendingIndexes = indexes.slice().sort(function (a, b) { return a - b; });
        record.phase = 'ready';
        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true' || !isCurrentQuiz()) return;
        indexes.forEach(function (idx) {
            var label = optionNodes[idx];
            if (!label) return;
            label.style.fontWeight = 'bold';
            label.style.color = '#dc2626';
        });
        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
            waitForManual('视频弹题答案已加粗，当前为好学生模式');
            return;
        }
        try {
            optionNodes.forEach(function (label, idx) {
                var wanted = indexes.indexOf(idx) !== -1;
                var input = inputs[idx];
                if (input ? input.checked !== wanted && (isMultiple || wanted) : wanted) label.click();
            });
            if (inputs.some(function (input, idx) { return input && input.checked !== (indexes.indexOf(idx) !== -1); })) {
                waitForManual('视频弹题选项未能正确勾选');
                return;
            }
        } catch (_) { waitForManual('视频弹题选项点击失败'); return; }

        record.phase = 'selecting';
        container.setAttribute('data-ne21-status', 'processing');
        setTimeout(function () {
            record.phase = 'ready';
            if (localStorage.getItem('GPTJsSetting.isPaused') === 'true' || !isCurrentQuiz()) return;
            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') { waitForManual('当前为好学生模式'); return; }
            if (!isVideoQuizNodeVisible(submitBtn) || submitBtn.disabled) { waitForManual('视频弹题提交按钮不可用'); return; }
            if (inputs.some(function (input, idx) { return input && input.checked !== (record.pendingIndexes.indexOf(idx) !== -1); })) {
                waitForManual('视频弹题勾选状态已变化');
                return;
            }
            record.phase = 'submitted';
            record.submittedAt = Date.now();
            record.triedAnswers.push(record.pendingIndexes.join(','));
            try {
                submitBtn.click();
                logger('视频弹题已提交，等待答题结果', 'green');
            } catch (_) { waitForManual('视频弹题提交失败'); }
        }, 600);
    };

    if (record.phase === 'solved') {
        if (!record.solvedIndexes.length || record.triedAnswers.length >= 16) { waitForManual('视频弹题重复出现次数过多或已验证答案不可用'); return true; }
        logger('视频弹题重复出现，沿用已验证答案', 'orange');
        doSubmit(record.solvedIndexes);
    } else if (record.phase === 'ready') {
        doSubmit(record.pendingIndexes);
    } else if (record.phase === 'retry') {
        var nextIndexes = getVideoQuizFallbackIndexes(record, optionTexts.length, isMultiple);
        if (!nextIndexes.length) { waitForManual('视频弹题已尝试可用答案或达到 16 次上限'); return true; }
        logger('视频弹题上一答案错误，尝试未提交过的' + (isMultiple ? '组合: ' : '选项: ') + nextIndexes.map(function (i) { return optionTexts[i]; }).join(','), 'orange');
        doSubmit(nextIndexes);
    } else {
        record.phase = 'requesting';
        container.setAttribute('data-ne21-status', 'processing');
        var prompt = buildPrompt({
            type: typeName,
            question: question,
            options: optionTexts,
            answer_format: isMultiple ? "用'" + ANSWER_SEPARATOR + "'分割多个答案，或回答选项字母" : (isJudge ? '只回答正确或错误，或回答选项字母' : '只回答一个选项字母或选项内容')
        });

        logger('检测到视频中题目，开始处理：' + (taskName || ''), 'purple');
        getAnswer(isMultiple ? 1 : (isJudge ? 3 : 0), prompt).then(function (answer) {
            if (record.phase !== 'requesting') return;
            var indexes;
            if (isJudge) {
                var parsed = parseJudgeAnswer(answer);
                if (parsed) {
                    indexes = [];
                    optionTexts.forEach(function (text, idx) {
                        var norm = normalizeChoiceText(text);
                        if (parsed === 'true' && /正确|对|是|true|√/i.test(norm)) indexes.push(idx);
                        if (parsed === 'false' && /错误|错|否|false|×/i.test(norm)) indexes.push(idx);
                    });
                }
            }
            if (!indexes || indexes.length === 0) {
                indexes = findVideoQuizMatchIndexes(optionTexts, answer, isMultiple);
            }

            if (indexes.length === 0) {
                waitForManual('视频弹题未能匹配到选项');
                return;
            }

            record.aiIndexes = indexes.slice();
            doSubmit(indexes);
        }).catch(function () {
            if (record.phase === 'requesting') waitForManual('视频弹题 AI 作答失败');
        });
    }
    return true;
}

function getRate() {
    var stored = localStorage.getItem('GPTJsSetting.rate');
    var n = stored !== null ? parseFloat(stored) : (setting.rate || 1);
    if (!isFinite(n) || n <= 0) n = 1;
    if (n > 16) n = 16;
    return n;
}

function parseJudgeAnswer(agrs) {
    if (!agrs) return null;
    var s = agrs.replace(/[。，.,!！\s]/g, '').toLowerCase();
    var trueWords = ['正确', '是', '对', '√', 't', 'true', 'ri', 'right', 'yes'];
    var falseWords = ['错误', '否', '错', '×', 'f', 'false', 'wr', 'wrong', 'no'];

    for (let i = 0; i < trueWords.length; i++) {
        if (s === trueWords[i]) return 'true';
    }
    for (let i = 0; i < falseWords.length; i++) {
        if (s === falseWords[i]) return 'false';
    }

    for (let i = 0; i < falseWords.length; i++) {
        if (s.indexOf(falseWords[i]) !== -1) return 'false';
    }
    for (let i = 0; i < trueWords.length; i++) {
        if (s.indexOf(trueWords[i]) !== -1) return 'true';
    }
    return null;
}

function findJudgeOptionIndex(optionTexts, isTrue) {
    var trueWords = ['正确', '是', '对', '√', 'T', 'ri'];
    var falseWords = ['错误', '否', '错', '×', 'F', 'wr'];
    var words = isTrue ? trueWords : falseWords;
    for (var i = 0; i < optionTexts.length; i++) {
        var t = optionTexts[i];
        for (var j = 0; j < words.length; j++) {
            if (t.indexOf(words[j]) !== -1) return i;
        }
    }
    return -1;
}

function findAnswerTextareas($container) {
    if (!$container || $container.length === 0) return $();

    var $eles = $container.find('textarea[name^="answerEditor"]');
    if ($eles.length > 0) return $eles;

    $eles = $container.find('.subEditor textarea, .Answer .divText textarea, .stem_answer textarea, .edui-editor textarea');
    if ($eles.length > 0) return $eles;

    return $container.find('textarea');
}

function getWorkQuestionType($item, typeName) {
    var name = typeName || $item.attr('typename') || $item.find('.newZy_TItle, .Zy_TItle, .Py-m1-title, .colorShallow, .read_type, .grey-text').first().text();
    name = String(name || '').replace(/\s+/g, '');
    var prefix = name.match(/[【\[（(]([^】\]）),，]+)[】\]）),，]/);
    if (prefix) name = prefix[1];
    var code = Number.parseInt($item.attr('qtype') || $item.attr('data-qtype'), 10);
    if (Number.isNaN(code) && $item.is('.readCompreHensionItem')) {
        code = Number.parseInt($item.find('input[name="readCompreHension-childType"]').val(), 10);
        if (Number.isNaN(code)) code = Number.parseInt($item.find('ul[qtype]').first().attr('qtype'), 10);
    }
    if (Number.isNaN(code)) code = Number.parseInt($item.find('input[id^="answertype"], input[name^="type"]').first().val(), 10);
    if (Number.isNaN(code) && $item.is('.TiMu')) code = Number.parseInt($item.attr('data'), 10);
    var codes = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4, 11: 11, 13: 13, 14: 15, 15: 15 };
    if (codes[code] !== undefined) return { type: codes[code], typeName: name || ['单选题', '多选题', '填空题', '判断题'][code] || '文字题' };
    var rules = [
        [/编程|程序|代码/, 17], [/连线|匹配/, 11], [/排序/, 13],
        [/完[型形]|阅读|听力|综合/, 15], [/多[项选]*选|不定项/, 1],
        [/单[项选]*选|选择题/, 0], [/判断|是非/, 3], [/填空|思政元素/, 2],
        [/简答|问答|名词解释|论述|计算|分录|材料|资料|写作|作文|翻译|证明|分析|应用|其它|其他/, 4]
    ];
    for (var i = 0; i < rules.length; i++) {
        if (rules[i][0].test(name)) return { type: rules[i][1], typeName: name };
    }
    if ($item.find('.saveMultipleSelect, .saveMultiSelect, input[type="checkbox"], [role="checkbox"], .num_option_dx').length) return { type: 1, typeName: name || '多选题' };
    if ($item.find('.saveSingleSelect, [class*="before-after"], .answerBg, .answerList li, input[type="radio"], [role="radio"]').length) return { type: 0, typeName: name || '单选题' };
    if ($item.find('.CodeMirror, .ace_editor, .monaco-editor').length) code = 17;
    return { type: code === 17 ? 17 : codes[code], typeName: name || '题型' + code };
}

function getWorkSubQuestions($item) {
    var selector = '.reading_answer, .filling_answer, .reader_answer, .readCompreHensionItem, [class*="clozeTextItem"]';
    var $subs = $item.find(selector);
    if (!$subs.length) {
        $subs = $item.find('[qtype], [data-qtype]').filter(function () {
            return !$(this).is('li, a, span, input') &&
                $(this).find('.saveSingleSelect, .saveMultipleSelect, .answerBg, [role="radio"], input[type="radio"], textarea').length > 1;
        });
    }
    return $subs.filter(function () {
        var node = this;
        return !$subs.toArray().some(function (parent) { return parent !== node && parent.contains(node); });
    });
}

function getWorkQuestionText($item) {
    var $title = $item.is('.readCompreHensionItem') ? $item.children('.clear').children('div').first() : $();
    if (!$title.length) $title = $item.find('.fontLabel, h3.mark_name, .Zy_TItle > div, .Py-m1-title, .reader_answer_tit').first();
    var html = $title.html() || '';
    return (tidyQuestion(html.replace(/<br\s*\/?\s*>|<\/(?:p|div|pre|tr)>/gi, '\n')) || '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

function getWorkTextEditors($item, isCode) {
    var win = $item[0].ownerDocument.defaultView;
    var editors = [];
    $item.find('.CodeMirror, .ace_editor, .monaco-editor').each(function () {
        var node = this, editor;
        if (node.CodeMirror) {
            editor = node.CodeMirror;
            editors.push({
                get: function () { return editor.getValue(); }, set: function (value) {
                    editor.setValue(value); if (editor.save) editor.save();
                    return editor.getValue() === value;
                }
            });
        } else if (node.classList.contains('ace_editor') && win.ace) {
            editor = win.ace.edit(node);
            editors.push({
                get: function () { return editor.getValue(); }, set: function (value) {
                    editor.setValue(value, -1); return editor.getValue() === value;
                }
            });
        } else if (win.monaco && win.monaco.editor && win.monaco.editor.getEditors) {
            editor = win.monaco.editor.getEditors().find(function (e) { return e.getDomNode() === node; });
            if (editor) editors.push({
                get: function () { return editor.getValue(); }, set: function (value) {
                    editor.setValue(value); return editor.getValue() === value;
                }
            });
        }
    });
    if (editors.length) return editors;
    findAnswerTextareas($item).filter(function () {
        return !$(this).closest('.CodeMirror, .ace_editor, .monaco-editor').length;
    }).each(function () {
        var textarea = this, ue;
        var ids = [textarea.name, textarea.id, 'ananas-editor-' + textarea.id];
        if (win.UE) {
            for (var i = 0; i < ids.length && !ue; i++) {
                if (ids[i]) ue = win.UE.instants && win.UE.instants[ids[i]];
            }
            if (!ue) ue = Object.values(win.UE.instants || {}).find(function (editor) {
                return editor.textarea === textarea || ids.includes(editor.key) || ids.includes(editor.id);
            });
            if (!ue && /^answerEditor/.test(textarea.name || '')) {
                try { ue = win.UE.getEditor(textarea.name); } catch (_) {}
            }
        }
        editors.push({
            get: function () { return ue && ue.getContentTxt ? ue.getContentTxt() : textarea.value; },
            set: async function (value) {
                if (ue) {
                    if (!ue.isReady && ue.ready) {
                        await new Promise(function (resolve, reject) {
                            var timer = setTimeout(function () { reject(new Error('编辑器加载超时')); }, 10000);
                            ue.ready(function () { clearTimeout(timer); resolve(); });
                        });
                    }
                    var html = $('<div>').text(value).html().replace(/\n/g, '<br>');
                    ue.setContent('<p style="white-space:pre-wrap">' + html + '</p>');
                }
                setQuizPracticeValue($(textarea), value);
                return ue && ue.getContentTxt ? Boolean(ue.getContentTxt().trim()) : textarea.value === value;
            }
        });
    });
    if (!editors.length && !isCode) {
        $item.find('[contenteditable="true"]').each(function () {
            var node = this;
            editors.push({
                get: function () { return node.textContent; }, set: function (value) {
                    node.textContent = value;
                    node.dispatchEvent(new win.Event('input', { bubbles: true }));
                    return node.textContent === value;
                }
            });
        });
    }
    return editors;
}

function workOptionSelected(node) {
    var $node = $(node);
    return $node.attr('aria-checked') === 'true' || $node.attr('aria-label') && /未选|未选择/.test($node.attr('aria-label')) === false && /已选/.test($node.attr('aria-label')) ||
        $node.is(':checked, .cur, .check_answer, .check_answer_dx') ||
        $node.find('input:checked, .check_answer, .check_answer_dx').length > 0;
}

async function answerWorkQuestion($item, info, question) {
    var type = info.type;
    if (!question) throw new Error('未找到题干');
    var $subs = getWorkSubQuestions($item);
    if ($subs.length) {
        return new Promise(function (resolve) {
            processSubQuestions(0, $subs, question, function () { return setting.time; }, resolve);
        });
    }
    if (type === 15 && findAnswerTextareas($item).length) type = 4;
    if ([0, 1, 3].includes(type)) {
        var $options = $item.find('.saveSingleSelect, .saveMultipleSelect, .saveMultiSelect');
        if (!$options.length) $options = $item.find('[class*="before-after"]');
        if (!$options.length) $options = $item.find('.Zy_ulTop li, .answerBg, .answerList li, [role="radio"], [role="checkbox"]');
        if (!$options.length) throw new Error('未找到选项');
        if (!isRedoMode() && $options.toArray().some(workOptionSelected)) return true;
        var texts = $options.map(function () {
            var $text = $(this).find('.fl.after, .answer_p, .optiontext').first();
            return ($text.length ? $text : $(this)).text().replace(/\s+/g, ' ').trim();
        }).get();
        var prompt = buildPrompt({
            type: info.typeName, question: question, options: texts,
            answer_format: type === 3 ? '只回答正确或错误' : type === 1 ? "多个答案用'" + ANSWER_SEPARATOR + "'分隔，或回答选项字母" : '只回答一个选项字母或选项内容'
        });
        var answer = await getAnswer(type, prompt);
        var indexes;
        if (type === 3) {
            var judge = parseJudgeAnswer(answer);
            var idx = judge === null ? -1 : findJudgeOptionIndex(texts, judge === 'true');
            indexes = idx < 0 ? getAnswerLetterIndexes(answer, texts.length) : [idx];
        } else {
            indexes = findVideoQuizMatchIndexes(texts, answer, type === 1);
        }
        if (!indexes.length || type !== 1 && indexes.length !== 1) throw new Error('未匹配到完整答案');
        $options.each(function (i) {
            var selected = workOptionSelected(this), wanted = indexes.includes(i);
            if (wanted && !selected || type === 1 && selected && !wanted) this.click();
        });
        return true;
    }
    if (type === 11 || type === 13) {
        var $boxes = $item.find('.line_answer_ct .selectBox, .thirdUlList .dept_select, .line_answer select, .sort_answer select, .sortQuesSelect select');
        if (!$boxes.length) throw new Error('未找到连线或排序控件，请手动作答');
        var selectedValues = $boxes.toArray().map(function (box) { return box.value; });
        var $savedAnswer = $item.find('input[name^="answer"]').not('[name^="answertype"]').first();
        if (!isRedoMode() && (!$savedAnswer.length || $savedAnswer.val()) &&
            (type !== 13 || new Set(selectedValues).size === $boxes.length) && $boxes.toArray().every(function (box) {
                return $(box).is('select') && Boolean(box.value);
            })) return true;
        if (type === 13) {
            var $sortContent = $item.clone();
            $sortContent.find('select, input, script, style, .chosen-container').remove();
            question += '\n排序项目：\n' + (tidyQuestion($sortContent.html().replace(/<\/(?:li|p|div)>/gi, '\n')) || '');
        }
        var groups = ['.firstUlList', '.secondUlList'].map(function (selector) {
            return $item.find(selector + ' > li').not('.groupTitile').map(function () {
                return {
                    key: $(this).find('i').first().text().replace(/[、.．\s]+$/g, ''),
                    text: tidyQuestion($(this).find('div').first().html() || '') || ''
                };
            }).get();
        });
        if (groups[0].length && groups[1].length) {
            question += '\n第一组数据：\n' + groups[0].map(function (item) { return item.key + '=' + item.text; }).join('\n');
            question += '\n第二组数据：\n' + groups[1].map(function (item) { return item.key + '=' + item.text; }).join('\n');
        }
        var options = $boxes.map(function (i) {
            return (i + 1) + ': ' + $(this).find('li[data], option[value]').map(function () {
                var key = $(this).attr('data') || this.value;
                if (!key || this.disabled) return null;
                var item = groups[1].find(function (item) { return item.key === key; });
                return key + '=' + (item ? item.text : $(this).text().trim());
            }).get().join('; ');
        }).get();
        var answer = await getAnswer(4, buildPrompt({
            type: info.typeName, question: question, options: options,
            answer_format: '按第一组项目或排序位置依次返回对应的选项值，用' + ANSWER_SEPARATOR + '分隔（例如A' + ANSWER_SEPARATOR + 'B），不要返回项目编号，不要解释'
        }));
        var parts = answer.split(ANSWER_SEPARATOR).map(function (part) { return part.trim(); });
        if (parts.length !== $boxes.length) throw new Error('连线或排序答案数量不匹配');
        var targets = $boxes.toArray().map(function (box, i) {
            var candidates = $(box).find('li[data], option[value]').toArray().filter(function (node) {
                return !node.disabled && Boolean($(node).attr('data') || node.value);
            });
            var exact = candidates.find(function (node) { return String($(node).attr('data') || node.value) === parts[i]; });
            if (exact) return exact;
            var matched = candidates.filter(function (node) {
                var key = $(node).attr('data') || node.value;
                var item = groups[1].find(function (item) { return item.key === key; });
                return item && item.text === parts[i];
            });
            return matched.length === 1 ? matched[0] : undefined;
        });
        if (targets.some(function (node) { return !node; })) throw new Error('连线或排序答案不匹配');
        if (type === 13 && new Set(targets.map(function (node) { return node.value || $(node).attr('data'); })).size !== targets.length) {
            throw new Error('排序答案存在重复选项，请手动检查');
        }
        targets.forEach(function (node) {
            if (node.tagName === 'OPTION') {
                setQuizPracticeValue($(node.parentElement), node.value);
            } else {
                ($(node).find('a')[0] || node).click();
            }
        });
        var win = $item[0].ownerDocument.defaultView;
        if (type === 11 && typeof win.setConnLineAnswer === 'function') win.setConnLineAnswer();
        if (type === 13 && typeof win.setSortQuesAnswer === 'function') win.setSortQuesAnswer();
        return true;
    }
    if (![2, 4, 17].includes(type)) throw new Error('无法识别题型，请手动作答');
    var editors = getWorkTextEditors($item, type === 17);
    if (!editors.length) throw new Error('未找到可写入的答案编辑器，请手动作答');
    if (!isRedoMode() && editors.every(function (editor) { return String(editor.get() || '').trim(); })) return true;
    var format = type === 17 ? '只返回符合题目语言要求的完整代码，保留缩进换行，不要Markdown代码围栏或解释' :
        type === 2 ? '共' + editors.length + "空，按顺序用'" + ANSWER_SEPARATOR + "'分隔，只返回答案" :
            '按题目要求完整作答，保留必要的步骤；多个答题区域请按顺序返回JSON字符串数组';
    var answer = await getAnswer(4, buildPrompt({ type: info.typeName, question: question, answer_format: format, preserveWhitespace: type === 17 }));
    if (!answer || /^(暂无答案|无答案)$/.test(answer.trim())) throw new Error('暂无答案');
    var parts;
    if (type === 17) {
        parts = [answer.replace(/^\s*\x60\x60\x60[^\n]*\r?\n/, '').replace(/\r?\n\x60\x60\x60\s*$/, '')];
    } else if (type === 2) {
        parts = answer.split(ANSWER_SEPARATOR).map(function (part) { return part.trim(); });
    } else if (editors.length === 1) {
        parts = [answer];
    } else {
        parts = JSON.parse(answer);
    }
    if (!Array.isArray(parts) || parts.length !== editors.length || parts.some(function (part) {
        return typeof part !== 'string' || !part.trim();
    })) throw new Error('答案数量与输入区域不匹配');
    for (var i = 0; i < editors.length; i++) {
        if (!await editors[i].set(parts[i])) throw new Error('答案写入失败');
    }
    return true;
}

function runWorkQuestion($item, info, question, next) {
    return answerWorkQuestion($item, info, question).catch(function (error) {
        localStorage.setItem('GPTJsSetting.sub', false);
        logger(error && error.message || '答题失败，请手动检查', 'red');
        return false;
    }).then(function (success) { next(success); return success; });
}

function handleExtraWorkQuestion($item, next) {
    var info = getWorkQuestionType($item);
    if (![2, 4, 11, 13, 17].includes(info.type)) return false;
    runWorkQuestion($item, info, getWorkQuestionText($item), function () { setTimeout(next, setting.time); });
    return true;
}

function getPanelDocument() {
    var current = window;
    try {
        while (true) {
            if (current.document.querySelector('#ne-21box')) return current.document;
            if (current === current.parent) break;
            current = current.parent;
        }
    } catch (_) {}
    return document;
}

function showBox() {

    if (!setting.showBox || getPanelDocument().querySelector('#ne-21box')) return;

    if (setting.showBox && getPanelDocument().querySelector('#ne-21notice') == undefined) {

        if (!document.getElementById('ne-21style')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'ne-21style';
            styleEl.textContent = `
            /* === Liquid Glass UI (iOS 26 style, neutral light glass) === */
            #ne-21box{position:fixed;top:5%;right:16%;width:340px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:13px;color:rgba(15,23,42,.86);background:linear-gradient(180deg,rgba(255,255,255,.62) 0%,rgba(241,245,249,.55) 100%);backdrop-filter:blur(22px) saturate(180%) brightness(1.04);-webkit-backdrop-filter:blur(22px) saturate(180%) brightness(1.04);border:1px solid rgba(255,255,255,.65);border-radius:22px;box-shadow:0 0 0 1px rgba(15,23,42,.09),0 24px 48px -12px rgba(15,23,42,.45),0 10px 26px -8px rgba(15,23,42,.3),inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(15,23,42,.06);overflow:hidden;transition:opacity .25s ease,transform .25s ease;animation:ne21-in .4s cubic-bezier(.2,.9,.3,1) both;}
            @keyframes ne21-in{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:none}}
            #ne-21box .ne21-header{position:relative;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(180deg,rgba(255,255,255,.72) 0%,rgba(248,250,252,.35) 100%);color:rgba(15,23,42,.92);border-bottom:1px solid rgba(15,23,42,.07);cursor:move;user-select:none;}
            #ne-21box .ne21-header::after{content:'';position:absolute;left:14px;right:14px;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);pointer-events:none;}
            #ne-21box.ne21-collapsed .ne21-body{display:none;}
            #ne-21box.ne21-collapsed .ne21-header{border-bottom:none;}
            #ne-21box.ne21-collapsed .ne21-header::after{display:none;}
            #ne-21box .ne21-title{display:flex;align-items:center;gap:9px;font-weight:600;font-size:14px;letter-spacing:.3px;margin:0;color:inherit;}
            #ne-21box .ne21-dot{width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.98),rgba(255,255,255,.5) 55%,rgba(15,23,42,.18) 100%);box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95);animation:ne21-pulse 2s infinite;flex-shrink:0;}
            @keyframes ne21-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95)}70%{box-shadow:0 0 0 8px rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.95)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.95)}}
            #ne-21box #ne-21close, #ne-21box #ne-21pause{margin:0;width:24px;height:24px;padding:0;display:inline-flex;align-items:center;justify-content:center;font-size:0;line-height:1;color:rgba(15,23,42,.7);cursor:pointer;border:1px solid rgba(255,255,255,.65);border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8),0 1px 2px rgba(15,23,42,.08);transition:background .2s,color .2s,transform .15s;user-select:none;}
            #ne-21box #ne-21close:hover, #ne-21box #ne-21pause:hover{background:rgba(255,255,255,.78);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.9),0 1px 2px rgba(15,23,42,.1);}
            #ne-21box #ne-21close:active, #ne-21box #ne-21pause:active{transform:scale(.92);}
            #ne-21box .ne21-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}
            #ne-21box .ne21-kbd{display:block;max-width:76px;overflow:hidden;text-overflow:ellipsis;padding:3px 8px;font-size:10.5px;font-weight:500;letter-spacing:.2px;color:rgba(15,23,42,.66);background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.72);border-radius:8px;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.85),0 1px 2px rgba(15,23,42,.06);user-select:none;cursor:default;font-family:"SF Mono","Cascadia Code",Consolas,Menlo,monospace;line-height:1;white-space:nowrap;}
            #ne-21box .ne21-kbd b{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;font-weight:600;color:rgba(15,23,42,.78);}
            #ne-21box .ne21-body{padding:14px 16px 16px;}
            #ne-21box #ne-21notice{border-top:none!important;margin:0 0 6px!important;overflow:visible;}
            #ne-21box .ne21-uid{display:flex;align-items:center;gap:6px;color:rgba(15,23,42,.62);font-size:12px;margin-bottom:10px;padding:8px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(15,23,42,.05);}
            #ne-21box .ne21-uid b{color:rgba(15,23,42,.92);font-weight:600;}
            #ne-21box .ne21-uid-missing{flex-direction:column;align-items:flex-start;gap:4px;line-height:1.6;}
            #ne-21box .ne21-row{display:flex;gap:8px;align-items:center;}
            #ne-21box .ne21-btn{display:inline-flex;align-items:center;justify-content:center;padding:7px 14px;font-size:12px;font-weight:500;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,.7);transition:transform .15s,box-shadow .2s,background .2s,color .2s;white-space:nowrap;}
            #ne-21box .ne21-btn-primary{color:rgba(15,23,42,.92);background:rgba(255,255,255,.72);box-shadow:0 0 0 1px rgba(15,23,42,.07),inset 0 1px 0 rgba(255,255,255,.95),inset 0 -6px 12px -6px rgba(15,23,42,.08),0 4px 10px -2px rgba(15,23,42,.22);}
            #ne-21box .ne21-btn-primary:hover{transform:translateY(-1px);background:rgba(255,255,255,.88);box-shadow:0 0 0 1px rgba(15,23,42,.09),inset 0 1px 0 rgba(255,255,255,1),inset 0 -6px 12px -6px rgba(15,23,42,.1),0 6px 14px -2px rgba(15,23,42,.28);}
            #ne-21box .ne21-btn-secondary{color:rgba(15,23,42,.78);background:rgba(255,255,255,.45);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(15,23,42,.06);}
            #ne-21box .ne21-btn-secondary:hover{background:rgba(255,255,255,.65);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.85),0 2px 4px rgba(15,23,42,.08);}
            #ne-21box .ne21-btn:active{transform:translateY(0) scale(.98);}
            #ne-21box .ne21-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
            #ne-21box #modelSelect{flex:1;min-width:0;padding:7px 10px;font-size:12px;border-radius:14px;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.55);color:rgba(15,23,42,.86);cursor:pointer;outline:none;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8);transition:background .2s,box-shadow .2s;}
            #ne-21box #modelSelect:hover{background:rgba(255,255,255,.7);}
            #ne-21box #modelSelect:focus{background:rgba(255,255,255,.75);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.85),0 0 0 4px rgba(15,23,42,.1);}
            #ne-21box .ne21-select{padding:5px 8px;font-size:12px;border-radius:10px;border:1px solid rgba(255,255,255,.65);background:rgba(255,255,255,.5);color:rgba(15,23,42,.86);cursor:pointer;outline:none;min-width:80px;flex-shrink:0;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);transition:background .2s,box-shadow .2s;}
            #ne-21box .ne21-select:hover{background:rgba(255,255,255,.7);}
            #ne-21box .ne21-select:focus{background:rgba(255,255,255,.72);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.82),0 0 0 3px rgba(15,23,42,.06);}
            #ne-21box #userInfo{margin:10px 0 0;padding:10px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);font-size:12px;color:rgba(15,23,42,.66);line-height:1.6;overflow:hidden;}
            #ne-21box #userInfo:empty{display:none;}
            #ne-21box #userInfo b{color:rgba(15,23,42,.9);font-weight:600;}
            #ne-21box #moreSettings{padding:4px 14px;background:rgba(255,255,255,.42);border:1px solid rgba(255,255,255,.65);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.7);margin:10px 0 0;}
            #ne-21box #moreSettings label{display:flex;flex-direction:row-reverse;align-items:center;justify-content:space-between;margin:0;padding:8px 2px;font-size:12px;color:rgba(15,23,42,.78);cursor:pointer;user-select:none;line-height:1.4;}
            #ne-21box #moreSettings label + label{border-top:1px dashed rgba(15,23,42,.1);}
            #ne-21box #moreSettings input[type=checkbox]{appearance:none;-webkit-appearance:none;width:34px;height:20px;border:1px solid rgba(15,23,42,.08);border-radius:20px;cursor:pointer;position:relative;transition:background .25s,box-shadow .25s;background:rgba(15,23,42,.16);box-shadow:inset 0 1px 2px rgba(15,23,42,.12);margin:0 0 0 10px;flex-shrink:0;}
            #ne-21box #moreSettings input[type=checkbox]::before{content:'';position:absolute;top:1px;left:1px;width:16px;height:16px;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,1),rgba(255,255,255,.85));box-shadow:0 1px 3px rgba(15,23,42,.25),inset 0 1px 0 rgba(255,255,255,1);transition:transform .25s cubic-bezier(.2,.9,.3,1);}
            #ne-21box #moreSettings input[type=checkbox]:hover{background:rgba(15,23,42,.24);}
            #ne-21box #moreSettings input[type=checkbox]:checked{background:rgba(255,255,255,.78);border-color:rgba(15,23,42,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -2px 4px rgba(15,23,42,.08),0 0 0 1px rgba(15,23,42,.06);}
            #ne-21box #moreSettings input[type=checkbox]:checked:hover{background:rgba(255,255,255,.92);}
            #ne-21box #moreSettings input[type=checkbox]:checked::before{transform:translateX(14px);}
            #ne-21box #moreSettings p{display:none;}
            #ne-21box .ne21-shortcut-controls{display:flex;align-items:center;gap:6px;min-width:0;}
            #ne-21box .ne21-shortcut-controls input{width:112px;min-width:0;box-sizing:border-box;}
            #ne-21box .ne21-shortcut-controls button{padding:5px 7px;}
            #ne-21box #ne21-shortcut-hint{display:block;font-size:11px;line-height:1.5;color:#64748b;padding:0 2px 8px;}
            #ne-21box #ne-21thinking{display:none!important;}
            @keyframes ne21-spin{to{transform:rotate(360deg)}}
            @keyframes ne21-dot{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}
            #ne-21box #ne-21log .ne21-log-spinner{display:inline-block;width:9px;height:9px;margin-right:5px;border:1.5px solid rgba(15,23,42,.18);border-top-color:rgba(15,23,42,.7);border-radius:50%;vertical-align:-1px;animation:ne21-spin .8s linear infinite;}
            #ne-21box #ne-21log .ne21-log-dots{display:inline-flex;gap:2px;margin-left:3px;vertical-align:1px;}
            #ne-21box #ne-21log .ne21-log-dots i{width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.65;animation:ne21-dot 1.2s infinite ease-in-out both;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(2){animation-delay:.16s;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(3){animation-delay:.32s;}
            #ne-21box #ne-21log{max-height:140px;overflow-y:auto;margin:12px 0 0;padding:10px 12px;background:rgba(15,23,42,.06);border:1px solid rgba(255,255,255,.55);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 16px rgba(15,23,42,.06);font-family:"SF Mono","Cascadia Code",Consolas,Menlo,monospace;font-size:11px;line-height:1.6;color:rgba(15,23,42,.78);}
            #ne-21box #ne-21log:empty{display:none;}
            #ne-21box #ne-21log::-webkit-scrollbar{width:5px;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb{background:rgba(15,23,42,.2);border-radius:4px;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb:hover{background:rgba(15,23,42,.32);}
            #ne-21box #ne-21log p{margin:0;padding:2px 0;word-break:break-all;}
            #ne-21box #ne-21log hr{display:none;}
            #ne-21box #ne-21log .ne21-time{color:rgba(15,23,42,.4);margin-right:6px;}
            #ne-21box #ne-21log-latest{display:block;margin:6px 0 0 auto;padding:4px 10px;font-size:11px;}
            #ne-21box #ne-21log-latest[hidden]{display:none;}
            `;
            document.head.appendChild(styleEl);
        }
        var box_html = `
            <div id="ne-21box">
                <div class="ne21-header" title="按住标题栏可拖动 / 按 F9 显示或隐藏面板 / 点击右侧按钮收起">
                    <h3 class="ne21-title"><span class="ne21-dot"></span>ChatGPT 学习通助手</h3>
                    <div class="ne21-actions">
                        <span class="ne21-kbd" title="按 F9 可显示/隐藏整个面板">F9 <b>显隐</b></span>
                        <button id="ne-21pause" type="button" aria-label="暂停/继续" style="margin-right:4px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg></button>
                        <button id="ne-21close" type="button" aria-label="收起"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
                    </div>
                </div>
                <div class="ne21-body">
                    <div id="ne-21notice"></div>
                    <div id="userInfo"></div>
                    <div id="moreSettings" style="display:none;">
                        <label><span class="ne21-shortcut-controls">
                            <input id="GPTJsSetting.panelShortcut" type="text" class="ne21-select" readonly aria-label="显隐快捷键，点击后按键录制" title="点击后按下新快捷键，自动保存">
                            <button id="ne21-shortcut-reset" type="button" class="ne21-btn ne21-btn-secondary">恢复 F9</button>
                        </span>显隐快捷键</label>
                        <small id="ne21-shortcut-hint" role="status">点击输入框录制，自动保存；Esc 退出。</small>
                        <label title="倍速过高可能导致异常"><select id="GPTJsSetting.rate" class="ne21-select"><option value="1">1×</option><option value="1.5">1.5×</option><option value="2">2×</option><option value="3">3×</option><option value="4">4×</option><option value="6">6×</option><option value="8">8×</option><option value="16">16×</option></select>视频/音频倍速</label>
                        <label title="题目作答间隔与 AI 搜题节流间隔（秒），默认 2.5 秒">
                            <input type="number" id="GPTJsSetting.time" class="ne21-select" min="0" max="60" step="0.5" style="min-width:56px;width:56px;padding:5px 8px;">答题间隔 (秒)
                        </label>
                        <p></p>
                        <label><input type="checkbox" id="GPTJsSetting.sub">测验自动提交</label>
                        <label><input type="checkbox" id="GPTJsSetting.force">测验强制提交</label>
                        <label><input type="checkbox" id="GPTJsSetting.examTurn">考试自动跳转</label>
                        <p></p>
                        <label><input type="checkbox" id="GPTJsSetting.goodStudent">答案加粗不选择</label>
                        <label><input type="checkbox" id="GPTJsSetting.alterTitle" checked>答案插入题目后</label>
                        <p></p>
                        <label><input type="checkbox" id="GPTJsSetting.redo">重做模式 (不跳过已答题)</label>
                    </div>
                    <div id="ne-21thinking">
                        <div class="ne21-thinking-spinner"></div>
                        <span class="ne21-thinking-text">AI 思考中<span class="ne21-thinking-dots"><i></i><i></i><i></i></span></span>
                    </div>
                    <div id="ne-21log" tabindex="0" aria-label="运行日志"></div>
                    <button id="ne-21log-latest" type="button" class="ne21-btn ne21-btn-secondary" hidden>回到最新日志</button>
                </div>
            </div>
        `;
        $(box_html).appendTo('body');
        refreshPanelShortcut(document);

        (function () {
            var $box = $('#ne-21box');

            try {
                var savedPos = localStorage.getItem('GPTJsSetting.boxPosition');
                if (savedPos) {
                    var pos = JSON.parse(savedPos);
                    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
                        var vw = window.innerWidth, vh = window.innerHeight;
                        var w = $box.outerWidth() || 340;

                        var nx = Math.max(40 - w, Math.min(pos.left, vw - 40));
                        var ny = Math.max(0, Math.min(pos.top, vh - 40));
                        $box.css({ left: nx + 'px', top: ny + 'px', right: 'auto' });
                    }
                }
            } catch (_) {}

            if (localStorage.getItem('GPTJsSetting.boxCollapsed') === 'true') {
                $box.addClass('ne21-collapsed');
                $('#ne-21close').html('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>').attr('aria-label', '展开');
            }

            if (localStorage.getItem('GPTJsSetting.showBox') === 'hide') {
                $box.css('display', 'none');
            }
        })();

        $('#ne-21box').on('mousedown', '#ne-21pause', function (e) {
            e.stopPropagation();
        }).on('click', '#ne-21pause', function (e) {
            e.stopPropagation();
            var isPaused = localStorage.getItem('GPTJsSetting.isPaused') === 'true';
            isPaused = !isPaused;
            localStorage.setItem('GPTJsSetting.isPaused', isPaused);
            $(this).html(isPaused ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="margin-left:1px"><path d="M7 4v16l13-8z"/></svg>' : '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>');
            $(this).attr('title', isPaused ? '已暂停，点击继续' : '运行中，点击暂停');
            if (isPaused) {
                try { logger('脚本已暂停运行', 'orange'); } catch (_) { }
            } else {
                try { logger('脚本已恢复运行', 'green'); } catch (_) { }
            }
        });

        (function () {
            var isPaused = localStorage.getItem('GPTJsSetting.isPaused') === 'true';
            var $pauseBtn = $('#ne-21pause');
            $pauseBtn.html(isPaused ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="margin-left:1px"><path d="M7 4v16l13-8z"/></svg>' : '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>');
            $pauseBtn.attr('title', isPaused ? '已暂停，点击继续' : '运行中，点击暂停');
        })();

        $('#ne-21close').on('mousedown', function (e) {
            e.stopPropagation();
        }).on('click', function (e) {
            e.stopPropagation();
            var collapsed = $('#ne-21box').toggleClass('ne21-collapsed').hasClass('ne21-collapsed');
            $(this).html(collapsed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg>');
            $(this).attr('aria-label', collapsed ? '展开' : '收起');

            try { localStorage.setItem('GPTJsSetting.boxCollapsed', collapsed ? 'true' : 'false'); } catch (_) {}
        });

        (function () {
            var $box = $('#ne-21box');
            var $header = $box.find('.ne21-header');
            var dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
            $header.on('mousedown', function (e) {
                if (e.which !== 1) return;
                if ($(e.target).closest('#ne-21close').length) return;
                dragging = true;
                var rect = $box[0].getBoundingClientRect();
                startX = e.clientX;
                startY = e.clientY;
                startLeft = rect.left;
                startTop = rect.top;

                $box.css({ left: startLeft + 'px', top: startTop + 'px', right: 'auto' });
                $('body').css('user-select', 'none');
                e.preventDefault();
            });
            $(document).on('mousemove.ne21drag', function (e) {
                if (!dragging) return;
                var nx = startLeft + (e.clientX - startX);
                var ny = startTop + (e.clientY - startY);
                var w = $box.outerWidth();
                var vw = window.innerWidth;
                var vh = window.innerHeight;

                nx = Math.max(40 - w, Math.min(nx, vw - 40));
                ny = Math.max(0, Math.min(ny, vh - 40));
                $box.css({ left: nx + 'px', top: ny + 'px' });
            }).on('mouseup.ne21drag', function () {
                if (!dragging) return;
                dragging = false;
                $('body').css('user-select', '');

                try {
                    var rect = $box[0].getBoundingClientRect();
                    localStorage.setItem('GPTJsSetting.boxPosition', JSON.stringify({ left: rect.left, top: rect.top }));
                } catch (_) {}
            });
        })();

        (function () {
            var moreSettings = document.getElementById('moreSettings');
            var userInfo = document.getElementById('userInfo');
            if (!moreSettings || !userInfo) return;

            var isSettingsVisible = false;
            $('#ne-21box').on('click', '#moreSettingsBtn', function () {
                userInfo.style.display = isSettingsVisible ? 'block' : 'none';
                moreSettings.style.display = isSettingsVisible ? 'none' : 'block';
                this.textContent = isSettingsVisible ? '设置' : '返回';
                isSettingsVisible = !isSettingsVisible;
            });

            var shortcutInput = document.getElementById('GPTJsSetting.panelShortcut');
            var shortcutHint = document.getElementById('ne21-shortcut-hint');
            shortcutInput.addEventListener('keydown', function (event) {
                if (event.key === 'Tab') return;
                event.preventDefault();
                event.stopPropagation();
                if (event.repeat || event.isComposing) return;
                if (event.key === 'Escape') {
                    refreshPanelShortcut(document);
                    shortcutInput.blur();
                    return;
                }
                if (/^(Control|Alt|Shift|Meta)$/.test(event.key)) return;
                if (!/^(F([1-9]|1[0-2])|Key[A-Z]|Digit[0-9])$/.test(event.code) ||
                    (!/^F\d+$/.test(event.code) && !event.ctrlKey && !event.altKey && !event.metaKey)) {
                    shortcutHint.textContent = '请用 F1–F12 或 Ctrl/Alt/Meta + 字母/数字。';
                    return;
                }
                var shortcut = { code: event.code, ctrlKey: event.ctrlKey, altKey: event.altKey,
                    shiftKey: event.shiftKey, metaKey: event.metaKey };
                localStorage.setItem('GPTJsSetting.panelShortcut', JSON.stringify(shortcut));
                refreshPanelShortcut(document);
                shortcutHint.textContent = '已保存：' + formatPanelShortcut(shortcut);
            });
            document.getElementById('ne21-shortcut-reset').addEventListener('click', function () {
                localStorage.removeItem('GPTJsSetting.panelShortcut');
                refreshPanelShortcut(document);
                shortcutHint.textContent = '已恢复 F9';
            });

            if (localStorage.getItem('GPTJsSetting.alterTitle') === null) {
                localStorage.setItem('GPTJsSetting.alterTitle', 'true');
            }

            if (localStorage.getItem('GPTJsSetting.fuzzyMatch') === null) {
                localStorage.setItem('GPTJsSetting.fuzzyMatch', 'true');
            }

            if (localStorage.getItem('GPTJsSetting.sub') === null) {
                localStorage.setItem('GPTJsSetting.sub', 'true');
            }

            ['sub', 'force', 'examTurn', 'goodStudent', 'alterTitle', 'redo', 'fuzzyMatch'].forEach(function (settingId) {
                var checkbox = document.getElementById('GPTJsSetting.' + settingId);
                if (!checkbox) return;
                checkbox.addEventListener('change', updateLocalStorage);
                checkbox.checked = localStorage.getItem('GPTJsSetting.' + settingId) === 'true';
            });

            var rateSelect = document.getElementById('GPTJsSetting.rate');
            if (rateSelect) {
                rateSelect.value = String(getRate());
                rateSelect.addEventListener('change', function () {
                    localStorage.setItem('GPTJsSetting.rate', rateSelect.value);
                });
            }

            var timeInput = document.getElementById('GPTJsSetting.time');
            if (timeInput) {
                var savedTime = localStorage.getItem('GPTJsSetting.time');
                timeInput.value = (savedTime !== null && isFinite(parseFloat(savedTime)))
                    ? savedTime
                    : String((setting.time || 2500) / 1000);
                timeInput.addEventListener('change', function () {
                    var v = parseFloat(timeInput.value);
                    if (!isFinite(v) || v < 0) v = 0;
                    if (v > 60) v = 60;
                    timeInput.value = String(v);
                    localStorage.setItem('GPTJsSetting.time', String(v));
                    setting.time = v * 1000;
                });
            }
        })();
    }
    let _u = [getCk('_uid'), getCk('UID')].find(value => /^\d+$/.test(value || '') && Number(value) > 0 && Number(value) <= 2147483647) || '';

    $('#ne-21notice').html(`
        <div class="ne21-uid${_u ? '' : ' ne21-uid-missing'}">${_u ? '学习通账号 UID：<b>' + _u + '</b>' : '<b>未获取到学习通 UID</b><span>仍可点击充值前往充值页，页内有客服联系方式。</span>'}</div>
        <div class="ne21-row">
            <button class="ne21-btn ne21-btn-primary" onclick="window.open('${_host}${_u ? '?uid=' + _u : ''}', '_blank', 'noopener,noreferrer')" title="前往充值页，可联系客服">充值</button>
            <select id="modelSelect">
                <option value="GPT-3.5">GPT-4.1 (普通｜低价)</option>
                <option value="ERNIE-Bot-4.0">GPT-5 (最新)</option>
                <option value="GPT-4">DeepSeek-R1 (思考｜推荐)</option>
                <option value="GPT-4-All">DeepSeek-R1 (联网｜高价)</option>
            </select>
            <button id="moreSettingsBtn" class="ne21-btn ne21-btn-secondary">设置</button>
        </div>
    `);

    var CACHE_KEY_MODELS = 'GPTJsSetting.cachedModels';
    var cachedModels = localStorage.getItem(CACHE_KEY_MODELS);
    if (cachedModels) {
        $('#modelSelect').html(cachedModels);
    }

    var lastSelectedModel = localStorage.getItem('GPTJsSetting.model');
    if (lastSelectedModel) {
        $('#modelSelect').val(lastSelectedModel);
    }
    if (CRACK.enabled) {
        localStorage.setItem('GPTJsSetting.model', CRACK.freeModel);
        $('#modelSelect').val(CRACK.freeModel);
    }

    $('#modelSelect').off('change.gptjsModel').on('change.gptjsModel', function () {
        localStorage.setItem('GPTJsSetting.model', $(this).val());
    });

    updateAuthPanel(cachedModels);
}

var LEARNING_ACCOUNT_STORAGE_KEY = 'GPTJsSetting.lastLearningAccount';

function getLearningAccountId() {
    return [getCk('_uid'), getCk('UID')].find(function (value) {
        return /^\d+$/.test(value || '') && Number(value) > 0 && Number(value) <= 2147483647;
    }) || '';
}

function openRechargePage(learningAccountId) {
    var url = _host + (learningAccountId ? '?uid=' + encodeURIComponent(learningAccountId) : '');
    window.open(url, '_blank', 'noopener,noreferrer');
}

function showLearningAccountChangeNotice(learningAccountId) {
    var message = '检测到您已更换学习通账号，积分是根据学习通账号同步的。如有疑问，请前往充值页联系售后。';
    if (Swal && typeof Swal.fire === 'function') {
        Swal.fire({
            icon: 'info',
            title: '学习通账号已更换',
            text: message,
            confirmButtonText: '前往充值页',
            showCancelButton: true,
            cancelButtonText: '知道了',
            confirmButtonColor: '#0071e3',
            reverseButtons: true
        }).then(function (result) {
            if (result.isConfirmed) openRechargePage(learningAccountId);
        });
        return;
    }
    if (window.confirm(message + '\n\n是否前往充值页？')) openRechargePage(learningAccountId);
}

function checkLearningAccountChange(learningAccountId) {
    if (!learningAccountId) return;
    var previousLearningAccountId = String(GM_getValue(LEARNING_ACCOUNT_STORAGE_KEY, '') || '');
    if (previousLearningAccountId === learningAccountId) return;
    GM_setValue(LEARNING_ACCOUNT_STORAGE_KEY, learningAccountId);
    if (previousLearningAccountId) showLearningAccountChangeNotice(learningAccountId);
}

function updateAuthPanel(cachedModels) {
    var CACHE_KEY_MODELS = 'GPTJsSetting.cachedModels';

    if (_authPromise) {
        _authPromise.then(function (res) {
            var obj = {};
            try { obj = $.parseJSON(res.response) || {}; } catch (e) {}
            var data = obj.data || {};
            var notice = data.notice || '';
            var score = (data.score !== undefined && data.score !== null) ? data.score : '-';
            checkLearningAccountChange(res.learningAccountId);
            $('#userInfo').html(
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
            }

            if (data.models && data.models !== cachedModels) {
                localStorage.setItem(CACHE_KEY_MODELS, data.models);

                var selectedValue = localStorage.getItem('GPTJsSetting.model') || $('#modelSelect').val();
                $('#modelSelect').html(data.models);
                if (selectedValue) {
                    $('#modelSelect').val(selectedValue);
                }
            }
        }).catch(function (error) {
            var body = GptRequestGuard.errorBody(error);
            var message = body.message || error.message || '暂时无法获取账号信息，请稍后重试。';
            var $retry = $('<button type="button" class="ne21-btn ne21-btn-secondary">重新验证</button>').css({ marginTop: '8px' });
            $('#userInfo').empty().append($('<div>').text(message)).append($retry);
            $retry.on('click', function () {
                $retry.prop('disabled', true);
                _authPromise = requestAuth(_host);
                updateAuthPanel(cachedModels);
            });
        });
    }
}

var _ne21LogColorMap = {
    red: '#dc2626', green: '#059669', blue: '#2563eb',
    yellow: '#ca8a04', orange: '#ea580c', purple: '#7c3aed',
    pink: '#db2777', gray: '#64748b', grey: '#64748b'
}

function getLogScrollState(log) {
    if (log._ne21ScrollState) return log._ne21ScrollState
    var state = { follow: true, hasNew: false, lastTop: log.scrollTop, latest: null }
    log._ne21ScrollState = state
    function refreshButton() {
        var button = log.ownerDocument.getElementById('ne-21log-latest')
        if (!button) return
        button.hidden = state.follow
        button.textContent = state.hasNew ? '有新提示 · 回到最新日志' : '回到最新日志'
    }
    state.refreshButton = refreshButton
    state.resume = function () {
        state.follow = true
        state.hasNew = false

        if (state.latest && state.latest.parentNode === log && state.latest !== log.lastChild) log.appendChild(state.latest)
        if (log.clientHeight > 0) log.scrollTop = log.scrollHeight
        state.lastTop = log.scrollTop
        refreshButton()
    }
    log.addEventListener('wheel', function (event) {
        if (event.deltaY < 0 && log.scrollHeight > log.clientHeight) {
            state.follow = false
            refreshButton()
        }
    }, { passive: true })
    log.addEventListener('scroll', function () {

        if (log.clientHeight === 0 || log.scrollTop === state.lastTop) return
        state.lastTop = log.scrollTop
        if (log.scrollHeight - log.clientHeight - log.scrollTop <= 12) state.resume()
        else {
            state.follow = false
            refreshButton()
        }
    }, { passive: true })
    var button = log.ownerDocument.getElementById('ne-21log-latest')
    if (button) button.addEventListener('click', state.resume)

    var view = log.ownerDocument.defaultView
    if (view && view.ResizeObserver) {
        new view.ResizeObserver(function () {
            if (state.follow && log.clientHeight > 0) state.resume()
        }).observe(log)
    }
    return state
}

function followLatestLog(log, entry) {
    var state = getLogScrollState(log)
    state.latest = entry
    if (state.follow) state.resume()
    else {
        state.hasNew = true
        state.refreshButton()
    }
}

function clearLogEntries(message) {
    var log = getPanelDocument().getElementById('ne-21log')
    if (!log) return
    log.textContent = message || ''
    var state = getLogScrollState(log)
    state.latest = null
    state.resume()
}

function logger(str, color) {
    var _time = new Date().toLocaleTimeString()
    var c = (_ne21LogColorMap || {})[color] || color || '#334155'
    var $p = $('<p><span class="ne21-time">[' + _time + ']</span><span class="ne21-msg" style="color:' + c + ';">' + str + '</span></p>')
    var log = getPanelDocument().getElementById('ne-21log')
    if (log) {
        getLogScrollState(log)
        $(log).append($p)
        followLatestLog(log, $p[0])
    }
    return $p
}

function updateLogEntry($p, str, color) {
    if (!$p || !$p.length) return
    var log = $p[0].parentNode
    if (log && log.id === 'ne-21log') getLogScrollState(log)
    var c = _ne21LogColorMap[color] || color || '#334155'
    $p.find('.ne21-msg').css('color', c).html(str)
    if (log && log.id === 'ne-21log') followLatestLog(log, $p[0])
}

function getStr(str, start, end) {
    let res = str.match(new RegExp(`${start}(.*?)${end}`))
    return res ? res[1] : null
}

function getTaskParams(doc) {
    try {
        var _iframeScripts = (doc || _d).scripts,
            _p = null;
        for (let i = 0; i < _iframeScripts.length; i++) {
            if (_iframeScripts[i].innerHTML.indexOf('mArg = "";') != -1 && _iframeScripts[i].innerHTML.indexOf('==UserScript==') == -1) {
                _p = getStr(_iframeScripts[i].innerHTML.replace(/\s/g, ""), 'try{mArg=', ';}catch');
                return _p
            }
        }
        return _p
    } catch (e) {
        return null
    }

}

function getCk(name) {
    return document.cookie.match(`[;\\s+]?${name}=([^;]*)`)?.pop();
}

function autoLogin() {
    logger('用户已设置自动登录', 'green')
    if (setting.phone.length <= 0 || setting.password.length <= 0) {
        logger('用户未设置登录信息', 'red')
        return
    }
    setTimeout(() => {
        $('#phone').val(setting.phone)
        $('#pwd').val(setting.password)
        $('#loginBtn').click()
    }, 3000)
}

function getStudyWindow() {
    var current = _w;
    try {
        while (current) {
            if (current.location.pathname.includes('/mycourse/studentstudy')) return current;
            if (current === current.parent) break;
            current = current.parent;
        }
    } catch (_) {}
    return _w.top;
}

function getStudyCardsDocument(studyWindow) {
    try {
        if (studyWindow.location.pathname.includes('/knowledge/cards')) return studyWindow.document;
        for (var i = 0; i < studyWindow.frames.length; i++) {
            var doc = getStudyCardsDocument(studyWindow.frames[i]);
            if (doc) return doc;
        }
    } catch (_) {}
    return null;
}

function isEmptyStudyPage(doc) {
    if (!doc || doc.readyState !== 'complete') return false;
    var params = getTaskParams(doc);
    try {
        var parsed = JSON.parse(params);
        if (parsed && Array.isArray(parsed.attachments)) {
            return parsed.attachments.length === 0;
        }
    } catch (_) {}
    return !!doc.querySelector('.ans-cc') &&
        !doc.querySelector('.ans-attach-ct, .ans-job-ct, .chapter-item');
}

function scheduleStudyNavigation(studyWindow, navigate) {
    var doc = studyWindow.document;
    var cardsDoc = getStudyCardsDocument(studyWindow);

    var chapterId = doc.querySelector('.posCatalog_active')?.id || '';
    var tabSelector = '#prev_tab > li.active, .prev_ul > li.active, #prevTabBox > li.active, span.currents';
    var activeTab = doc.querySelector(tabSelector);
    var pending = studyWindow._gptJsNextPagePending;
    if (pending && pending.cardsDoc === cardsDoc && pending.chapterId === chapterId && pending.activeTab === activeTab) return;
    pending = { cardsDoc: cardsDoc, chapterId: chapterId, activeTab: activeTab };
    studyWindow._gptJsNextPagePending = pending;

    function release() {
        if (studyWindow._gptJsNextPagePending === pending) studyWindow._gptJsNextPagePending = null;
    }
    studyWindow.setTimeout(function run() {
        if (studyWindow.document !== doc || getStudyCardsDocument(studyWindow) !== cardsDoc ||
            (doc.querySelector('.posCatalog_active')?.id || '') !== chapterId || doc.querySelector(tabSelector) !== activeTab) {
            release();
            return;
        }
        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
            studyWindow.setTimeout(run, 1000);
            return;
        }
        try {
            if (!navigate()) release();
        } catch (error) {
            release();
            logger('自动切换失败：' + error.message, 'red');
        }
    }, 2000);
}

function toNext(noTasks) {
    var studyWindow = getStudyWindow();

    if (_l.pathname.includes('/knowledge/cards') && getStudyCardsDocument(studyWindow) !== _d) return;
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(function () { toNext(noTasks); }, 3000);
        return;
    }

    var courseList = noTasks === true || setting.review || !setting.work ? Promise.resolve(null) : refreshCourseList().catch(function (error) {
        logger(error.message + '，使用页面目录继续处理', 'orange');
        return studyWindow.document.querySelector('#coursetree');
    });
    courseList.then((res) => {

        if (_l.pathname.includes('/knowledge/cards') && getStudyCardsDocument(studyWindow) !== _d) return;

        function detectSubTabPosition() {
            try {

                var selectors = ['#prev_tab > li', '.prev_ul > li', '#prevTabBox > li'];
                for (var i = 0; i < selectors.length; i++) {
                    var nodes = studyWindow.document.querySelectorAll(selectors[i]);
                    if (!nodes || nodes.length === 0) continue;
                    var tabs = Array.prototype.slice.call(nodes);
                    var activeIdx = -1;
                    for (var j = 0; j < tabs.length; j++) {
                        if (tabs[j].classList && tabs[j].classList.contains('active')) {
                            activeIdx = j;
                            break;
                        }
                    }
                    if (activeIdx === -1) continue;
                    return {
                        activeIndex: activeIdx,
                        total: tabs.length,
                        hasNext: activeIdx < tabs.length - 1,
                        tabs: tabs
                    };
                }

                var currents = studyWindow.document.querySelector('span.currents');
                if (currents) {
                    var nextSibs = [];
                    var sib = currents.nextElementSibling;
                    while (sib) {
                        if (sib.tagName === 'SPAN') nextSibs.push(sib);
                        sib = sib.nextElementSibling;
                    }
                    if (nextSibs.length > 0) {
                        return { activeIndex: 0, total: nextSibs.length + 1, hasNext: true, tabs: [currents].concat(nextSibs) };
                    }
                }
            } catch (e) {}
            return null;
        }

        function clickNextPageBtn() {
            clearLogEntries()
            try { studyWindow._gptJsJumpAllowed = true; } catch (_) {}
            var nextBtn = studyWindow.document.querySelector('#mainid .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            var sub = detectSubTabPosition();
            if (sub && sub.hasNext && sub.tabs) {
                sub.tabs[sub.activeIndex + 1].click();
                return true;
            }
            logger('未找到本课时下一页入口，等待页面加载', 'orange');
            return false
        }

        function clickNextChapterBtn() {
            clearLogEntries()
            try { studyWindow._gptJsJumpAllowed = true; } catch (_) {}
            var nextBtn = studyWindow.document.querySelector('#mainid .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            var focusBtn = studyWindow.document.querySelector('#prevNextFocusNext')
            if (focusBtn) { focusBtn.click(); return true }
            logger('未找到下一章节入口，本次不切换', 'orange');
            return false
        }

        var sub = detectSubTabPosition()
        if (sub && sub.hasNext) {
            logger('当前课时存在未完成页面（' + (sub.activeIndex + 1) + '/' + sub.total + '），准备切换到下一页', 'blue')
            scheduleStudyNavigation(studyWindow, clickNextPageBtn)
            return
        }

        if (noTasks === true || setting.review || !setting.work) {
            logger(noTasks === true ? '当前页面无任务点，准备切换到下一章节' : '本课时已无未完成页面，准备切换到下一章节', 'blue')
            scheduleStudyNavigation(studyWindow, clickNextChapterBtn)
            return
        }
        let _t = []
        $.each($(res).find('li'), (_, t) => {
            let curid = $(t).find('.posCatalog_select').attr('id'),
                status = $(t).find('.prevHoverTips').text(),
                name = $(t).find('.posCatalog_name').attr('title');
            if (curid && curid.indexOf('cur') != -1) {
                _t.push({ 'curid': curid, 'status': status, 'name': name })
            }
        })

        let _curChaterId = $('#coursetree', studyWindow.document).find('.posCatalog_active').attr('id')
        let _curIndex = _t.findIndex((item) => item['curid'] == _curChaterId)
        if (_curIndex < 0) {
            logger('课程目录未能定位当前章节，尝试页面下一节入口', 'orange')
            scheduleStudyNavigation(studyWindow, clickNextChapterBtn)
            return
        }
        for (_curIndex; _curIndex < _t.length - 1; _curIndex++) {

            if (_t[_curIndex]['status'].indexOf('待完成') != -1) {
                var subAgain = detectSubTabPosition()
                if (subAgain && subAgain.hasNext) {
                    logger('兜底检测到本课时仍有未完成页面（' + (subAgain.activeIndex + 1) + '/' + subAgain.total + '），切换到下一页', 'blue')
                    scheduleStudyNavigation(studyWindow, clickNextPageBtn)
                    return
                }
            }
            let t = _t[_curIndex + 1]
            if (t['status'].indexOf('待完成') != -1) {
                scheduleStudyNavigation(studyWindow, function () {
                    var clicked = clickNextChapterBtn()
                    showBox()
                    return clicked
                })
                return
            } else if (t['status'].indexOf('闯关') != -1) {
                logger('当前为闯关模式，存在未完成任务点，脚本已暂停运行，请手动完成并点击下一章节', 'red')
                return
            } else if (t['status'].indexOf('开放') != -1) {
                logger('章节未开放', 'red')
                return
            } else {

            }
        }
        logger('此课程处理完毕', 'green')
        return
    }).catch(function (error) {
        logger('自动切换失败：' + error.message, 'red');
    })
}

function missonStart() {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(missonStart, 3000);
        return;
    }
    if (_mlist.length <= 0) {
        logger('此页面任务处理完毕，准备跳转页面', 'green')
        return toNext()
    }
    let _type = _mlist[0]['type'],
        _dom = _domList[0],
        _task = _mlist[0];
    if (_type == undefined) {
        _type = _mlist[0]['property']["module"]
    }
    switch (_type) {
        case "video":
            if (_mlist[0]['property']['module'] == 'insertvideo') {
                logger('开始处理视频', 'purple')
                missonVideo(_dom, _task)
                break
            } else if (_mlist[0]['property']['module'] == 'insertaudio') {
                logger('开始处理音频', 'purple')
                missonVideo(_dom, _task)
                break
            } else {
                logger('未知类型任务，请联系作者，跳过', 'red')
                switchMission()
                break
            }
        case "workid":
            logger('开始处理测验', 'purple')
            missonWork(_dom, _task)
            break
        case "document":
            logger('开始处理文档', 'purple')
            missonDoucument(_dom, _task)
            break
        case "read":
            logger('开始处理阅读', 'purple')
            missonRead(_dom, _task)
            break
        case "insertbook":
            logger('开始处理读书', 'purple')
            missonBook(_dom, _task)
            break
        case "knowledgeGraph":
            logger('开始处理知识图谱', 'purple')
            missonKnowledgeGraph(_task)
            break
        default: {

            let GarbageTasks = ['insertimage', 'insertanswerquestion', 'insertshare', 'insertquestion', 'insertdiscuss', 'insertsubject']
            if (GarbageTasks.indexOf(_type) != -1) {
                logger('发现无需处理任务（' + _type + '），跳过。', 'red')
                switchMission()
            } else {
                logger('暂不支持处理此类型:' + _type + '，跳过。', 'red')
                switchMission()
            }
        }
    }
}

async function playMedia(playFunction) {
    const tryPlayMedia = () => {
        return new Promise((resolve, reject) => {
            try {
                const playRes = playFunction();
                if (playRes) {
                    playRes.then(resolve).catch(reject);
                } else {
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    };
    try {
        await tryPlayMedia();
        return true;
    } catch (err) {
        console.error(err);
        if (String(err).includes("failed because the user didn't interact with the document first")) {
            return new Promise((resolve) => {
                const content = "播放音视频失败，由于浏览器的用户隐私保护措施，如果要播放带有音量的视频，或者某些无法自动播放音视频的网站，您必须先点击一次页面上的任意位置脚本才能进行音视频的播放，后续无需重新点击。";
                if (typeof Swal !== 'undefined' && Swal.fire) {
                    Swal.fire({
                        title: "提示",
                        text: content,
                        icon: "warning",
                        confirmButtonText: "确定"
                    }).then(async () => {
                        try {
                            await tryPlayMedia();
                            resolve(true);
                        } catch (e) {
                            console.error(e);
                            resolve(false);
                        }
                    });
                } else {
                    alert(content);
                    tryPlayMedia().then(() => resolve(true)).catch(() => resolve(false));
                }
            });
        } else if (String(err).includes("The element has no supported sources")) {
            logger("当前视频无法播放。", "red");
        } else if (String(err).includes("background media was paused to save power") || String(err).includes("interrupted because video-only") || String(err).includes("interrupted by a call to pause")) {
            console.log("[GPTJs] 忽略浏览器播放中断:", err);
        } else {
            logger("播放视频时发生未知错误：" + String(err), "red");
        }
        return false;
    }
}

function missonVideo(dom, obj) {
    const { isPassed, otherInfo, property } = obj;
    const { _jobid: jobId, name, objectid: objectId, module } = property;

    const isAudioTask = module === 'insertaudio';
    const taskLabel = isAudioTask ? '音频' : '视频';

    if (isAudioTask ? !setting.audio : !setting.video) {
        logger(`用户设置不处理${taskLabel}任务，准备开始下一个任务。`, 'red');
        return setTimeout(switchMission, 3000);
    }

    if (!setting.review && isPassed === true) {
        logger(`${taskLabel}：${name} 检测已完成，准备处理下一个任务`, 'green');
        return switchMission();
    }

    let mediaType = isAudioTask ? 'audio' : 'video';

    logger(`处理${taskLabel}：${name}，正在解析`);
    let executed = false;
    let _parseDebugLogged = false;

    const PARSE_TIMEOUT_MS = 60 * 1000;
    const parseStartTime = Date.now();

    function searchIframesForMedia(iframes) {
        for (var fi = 0; fi < iframes.length; fi++) {
            var frame = iframes[fi];
            var frameDoc;
            try {
                frameDoc = frame.contentDocument || frame.contentWindow.document;
            } catch (_) { continue; }
            if (!frameDoc) continue;

            var m = frameDoc.querySelector('video') || frameDoc.querySelector('audio');
            if (m) {
                if (m.tagName.toLowerCase() === 'audio') mediaType = 'audio';
                return { media: m, doc: frameDoc };
            }

            try {
                var nested = frameDoc.querySelectorAll('iframe');
                for (var ni = 0; ni < nested.length; ni++) {
                    var nDoc;
                    try { nDoc = nested[ni].contentDocument || nested[ni].contentWindow.document; } catch (_) { continue; }
                    if (!nDoc) continue;
                    m = nDoc.querySelector('video') || nDoc.querySelector('audio');
                    if (m) {
                        if (m.tagName.toLowerCase() === 'audio') mediaType = 'audio';
                        return { media: m, doc: nDoc };
                    }
                }
            } catch (_) {}
        }
        return null;
    }

    const intervalId = setInterval(() => {
        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') return;

        if (!executed && Date.now() - parseStartTime > PARSE_TIMEOUT_MS) {
            clearInterval(intervalId);
            logger(`${taskLabel}：${name} 解析超时（超过60秒未加载），即将刷新页面重试`, 'red');
            setTimeout(() => { location.reload(); }, 2000);
            return;
        }

        var result = dom && dom.length > 0 ? searchIframesForMedia(dom) : null;

        if (!result) {
            try {
                var allIframes = _d.querySelectorAll('.ans-attach-ct iframe');
                if (allIframes.length > 0) {
                    result = searchIframesForMedia(allIframes);
                }
            } catch (_) {}
        }

        if (!_parseDebugLogged) {
            _parseDebugLogged = true;
            var domSrcs = [];
            if (dom && dom.length > 0) {
                for (var di = 0; di < dom.length; di++) domSrcs.push(dom[di].src || '(无src)');
            }
            console.log('[GPTJs Debug] dom iframes:', domSrcs, '| 找到媒体:', !!result);
        }

        if (result && !executed) {
            executed = true;
            clearInterval(intervalId);

            var media = result.media;
            var doc = result.doc;

            const userRate = getRate();
            const finalRate = userRate;
            if (mediaType === 'video' && isPlaybackRateDisabled(doc) && userRate > 1) {
                logger(`${name} 超星倍速菜单不可用，已改用脚本强制倍速：${userRate}×`, 'orange');
            } else if (userRate > 1) {
                logger(`已开启倍速：${userRate}×（高倍速可能被超星判定异常）`, 'orange');
            }

            logger(`${name} - ${mediaType} 播放成功，开始控制播放（${finalRate}×）`);

            const runPlayback = () => {
                return new Promise((resolve, reject) => {

                    const reloadInterval = setInterval(() => {
                        const errorDiv = doc.querySelector(".vjs-modal-dialog-content");
                        if (["视频文件损坏", "网络错误导致视频下载中途失败", "视频因格式不支持", "网络的问题无法加载"].some(
                            (s) => errorDiv && errorDiv.innerText.includes(s)
                        )) {
                            logger("检测到视频/音频加载失败，即将跳过。", "red");
                            clearInterval(reloadInterval);
                            if (quizIntervalId) clearInterval(quizIntervalId);
                            setTimeout(resolve, 3000);
                        }
                    }, 3000);

                    const quizIntervalId = mediaType === 'video' ? setInterval(function () {
                        handleVideoQuiz(doc, media, name);
                    }, 1500) : null;

                    const playFunction = async () => {
                        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') return;
                        if (mediaType === 'video' && doc.querySelector('.ans-videoquiz')) return;
                        if (media.ended === false) {
                            await new Promise(r => setTimeout(r, 1000));
                            if (media.paused && media.ended === false) {
                                media.muted = true;
                                try {
                                    media.play().then(() => {
                                        hookMediaRate(media, finalRate);
                                    }).catch(async (e) => {
                                        console.log('[GPTJs] 后台恢复播放失败，尝试静音并重新播放:', e);
                                        media.muted = true;
                                        await playMedia(() => media.play());
                                        hookMediaRate(media, finalRate);
                                    });
                                } catch (err) {
                                    console.error(err);
                                }
                            }
                        }
                    };

                    media.addEventListener("pause", playFunction);

                    let rateRestored = finalRate <= 1;
                    const onTimeUpdate = () => {
                        if (!rateRestored && isFinite(media.duration) && media.duration - media.currentTime < 10) {
                            rateRestored = true;
                            try { delete media.playbackRate; } catch (_) {}
                            hookMediaRate(media, 1);
                            media.removeEventListener('timeupdate', onTimeUpdate);
                        }
                    };
                    if (!rateRestored) {
                        media.addEventListener('timeupdate', onTimeUpdate);
                    }

                    let _playbackResolved = false;
                    const _doResolve = (reason) => {
                        if (_playbackResolved) return;
                        _playbackResolved = true;
                        logger(`${name} - ${mediaType} ${reason || '已播放完成'}`);
                        media.removeEventListener("pause", playFunction);
                        media.removeEventListener('timeupdate', onTimeUpdate);
                        if (quizIntervalId) clearInterval(quizIntervalId);
                        clearInterval(reloadInterval);
                        clearInterval(_stallCheckId);
                        resolve();
                    };
                    media.addEventListener("ended", () => { _doResolve('已播放完成'); });

                    let _lastProgressTime = -1;
                    let _stalledMs = 0;
                    const _STALL_LIMIT_MS = 5 * 60 * 1000;
                    const _stallCheckId = setInterval(() => {

                        if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                            return;
                        }
                        if (mediaType === 'video' && doc.querySelector('.ans-videoquiz')) {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                            return;
                        }
                        if (Math.abs(media.currentTime - _lastProgressTime) > 0.5) {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                        } else {
                            _stalledMs += 30 * 1000;
                            if (_stalledMs >= _STALL_LIMIT_MS) {
                                _doResolve('播放长时间无进度（疑似卡死），自动跳过');
                            }
                        }
                    }, 30 * 1000);

                    media.muted = true;
                    media.currentTime = 0;
                    setTimeout(() => {
                        playMedia(() => media.play()).then(() => {
                            hookMediaRate(media, finalRate);
                        }).catch(reject);
                    }, 200);
                });
            };

            runPlayback().then(() => {
                setTimeout(switchMission, 1000);
            }).catch(err => {
                logger(`${name} - 播放异常: ${err}，即将切换下一任务`, 'red');
                setTimeout(switchMission, 1000);
            });
        }
    }, 2500);
}

function hookMediaRate(media, rate) {
    try { media.playbackRate = rate; } catch (_) {}
    try {
        Object.defineProperty(media, 'playbackRate', {
            configurable: true,
            get: function () { return rate; },
            set: function () {}
        });
    } catch (_) {
        try {
            media.addEventListener('ratechange', function () {
                if (media.playbackRate !== rate) {
                    try { media.playbackRate = rate; } catch (__) {}
                }
            });
        } catch (___) {}
    }
}

function isPlaybackRateDisabled(iframeDocument) {
    try {
        var items = iframeDocument.querySelectorAll('.vjs-playback-rate .vjs-menu-content .vjs-menu-item');
        return items.length === 0;
    } catch (_) {
        return false;
    }
}

function missonBook(dom, obj) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { missonBook(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['bookname'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('读书：' + name + '检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('读书：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('读书：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        },
    })
}

function missonDoucument(dom, obj) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { missonDoucument(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['name'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('文档：' + name + '检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job/document?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('文档：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('文档：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        },
    })

}

function missonRead(dom, obj) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { missonRead(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['title'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('阅读：' + name + ',检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job/readv2?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('阅读：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('阅读：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        }
    })
}

function missonKnowledgeGraph(obj) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(function () { missonKnowledgeGraph(obj) }, 3000);
        return;
    }
    var taskName = (obj['property'] && obj['property']['name']) || '知识图谱';

    if (obj['job'] == undefined) {
        logger('知识图谱：' + taskName + '，检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }

    var clicked = false;
    try {
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                var iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
                if (!iframeDoc) continue;
                var packBtn = iframeDoc.querySelector('#graphPackBtn');
                if (packBtn) {

                    if (!packBtn.classList.contains('active')) {
                        packBtn.click();
                        logger('知识图谱：' + taskName + '，已点击展开按钮', 'green');
                    } else {
                        logger('知识图谱：' + taskName + '，已是展开状态', 'green');
                    }
                    clicked = true;
                    break;
                }
            } catch (e) {

            }
        }
    } catch (e) {
        console.log('[GPTJs] 查找知识图谱 iframe 异常:', e);
    }
    if (!clicked) {
        logger('知识图谱：' + taskName + '，未找到展开按钮，可能已完成或不在当前页面，跳过', 'orange');
    }

    setTimeout(function () { switchMission() }, 3000);
}

function missonWork(dom, obj) {
    if (!setting.work) {
        logger('用户设置不自动处理测验，准备处理下一个任务', 'green')
        switchMission()
        return
    }
    let isDo;
    if (setting.task) {
        logger("当前只处理任务点任务", 'red')
        if (obj['jobid'] == undefined ? false : true) {
            isDo = true
        } else {
            isDo = false
        }
    } else {
        logger("当前默认处理所有任务（包括非任务点任务）", 'red')
        isDo = true
    }
    if (isDo) {
        setTimeout(() => { startDoCyWork(0, dom) }, 3000)

    } else {
        logger('用户设置只处理属于任务点的任务，准备处理下一个任务', 'green')
        switchMission()
        return
    }
}

function doPhoneWork($dom) {
    let $cy = $dom.find('.Wrappadding form')
    $subBtn = $cy.find('.zquestions .zsubmit .btn-ok-bottom')
    $okBtn = $dom.find('#okBtn')
    $saveBtn = $cy.find('.zquestions .zsubmit .btn-save')
    let TimuList = $cy.find('.zquestions .Py-mian1')
    startDoPhoneTimu(0, TimuList)
}

function startDoPhoneTimu(index, TimuList) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { startDoPhoneTimu(index, TimuList) }, 3000);
        return;
    }
    if (index == TimuList.length) {
        if (localStorage.getItem('GPTJsSetting.sub') === 'true') {
            logger('测验处理完成，准备自动提交。', 'green')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else if (localStorage.getItem('GPTJsSetting.force') === 'true') {
            logger('测验处理完成，存在无答案题目,由于用户设置了强制提交，准备自动提交。', 'red')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else {
            logger('测验处理完成，存在无答案题目或用户设置不自动提交，自动保存！', 'green')
            setTimeout(() => {
                $saveBtn.click()
                setTimeout(() => {
                    logger('保存成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        }
        return
    }

    if (handleExtraWorkQuestion($(TimuList[index]), () => { startDoPhoneTimu(index + 1, TimuList); })) return;
    let contextWindow = TimuList[index] ? (TimuList[index].ownerDocument.defaultView || unsafeWindow) : unsafeWindow;
    let questionFull = $(TimuList[index]).find('.Py-m1-title').html()
    let _question = tidyQuestion(questionFull).replace(/.*?\[.*?题\]\s*\n\s*/, '').trim()
    let typeName = questionFull.match(/.*?\[(.*?)]|$/)[1];
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0, 选择题: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    let _a = []
    let _answerTmpArr
    var check_answer_flag = 0;

    if (_type === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        let singleChoiceList = $(TimuList[index]).find('.answerList.singleChoice li');
        let multiChoiceList = $(TimuList[index]).find('.answerList.multiChoice li');

        if (singleChoiceList && singleChoiceList.length > 0) {
            _type = 0;
            logger('自动识别为单选题', 'green');
        } else if (multiChoiceList && multiChoiceList.length > 0) {
            _type = 1;
            logger('自动识别为多选题', 'green');
        } else {

            let tkList = $(TimuList[index]).find('.blankList2 input');
            if (tkList && tkList.length > 0) {
                _type = 2;
                logger('自动识别为填空题', 'green');
            } else {

                let panduanList = $(TimuList[index]).find('.answerList.panduan li');
                if (panduanList && panduanList.length > 0) {
                    _type = 3;
                    logger('自动识别为判断题', 'green');
                } else {

                    let textareaList = $(TimuList[index]).find('textarea');
                    let editorList = $(TimuList[index]).find('.edui-editor');

                    if ((textareaList && textareaList.length > 0) || (editorList && editorList.length > 0)) {
                        _type = 4;
                        logger('自动识别为简答题或材料题', 'green');
                    }
                }
            }
        }
    }

    _currentQuestionMeta = { index: index, total: TimuList.length, typeName: typeName }
    switch (_type) {
        case 0: {

            _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });

            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
                    $.each(_answerTmpArr, (i, t) => {
                        _a.push(tidyStr($(t).html()).replace(/^[A-Z]\s*\n\s*/, '').trim())
                    })
                    let _i = _a.findIndex((item) => item == agrs)
                    if (_i == -1) {

                        _i = findBestFuzzyMatch(_a, agrs)
                    }
                    if (_i == -1) {
                        logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')

                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        $(_answerTmpArr[_i]).click()
                        logger('自动答题成功，准备切换下一题', 'green')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 1: {

            _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')

                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
                        let _multiOptions = []
                        $.each(_answerTmpArr, (i, t) => {
                            _multiOptions.push(tidyStr($(t).html()).replace(/^[A-Z]\s*\n\s*/, '').trim())
                        })
                        let _matchedAny = false
                        $.each(_answerTmpArr, (i, t) => {
                            if (agrs.indexOf(_multiOptions[i]) != -1) {
                                _matchedAny = true
                                setTimeout(() => { $(_answerTmpArr[i]).click() }, 300)
                            }
                        })

                        if (!_matchedAny) {
                            let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                            for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                                (function (idx) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).click() }, 300)
                                })(fuzzyIndices[fi])
                            }
                        }
                        let check = 0
                        setTimeout(() => {
                            $.each(_answerTmpArr, (i, t) => {
                                if (($(_answerTmpArr[i]).attr('class') || '').indexOf('cur') != -1) {
                                    check = 1
                                }
                            })
                            if (check) {
                                logger('自动答题成功，准备切换下一题', 'green')
                            } else {
                                logger('未能正确选择答案，请手动选择，跳过此题', 'red')

                                localStorage.setItem('GPTJsSetting.sub', false)
                            }
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }, 1000)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {

            let tkList = $(TimuList[index]).find('.blankList2 input')

            let tkEditorBlocks = $(TimuList[index]).find('[data-editorindex]')

            if (tkEditorBlocks && tkEditorBlocks.length > 0) {
                let firstTextarea = $(TimuList[index]).find('textarea[name^="answer"]')
                if (firstTextarea.length > 0 && $(firstTextarea[0]).val() && $(firstTextarea[0]).val().trim() !== '' && !isRedoMode()) {
                    logger("此题已作答,跳过", "green");
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }

                _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'" + ANSWER_SEPARATOR + "'分隔" })
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split(ANSWER_SEPARATOR)
                    let editorBlocks = $(TimuList[index]).find('[data-editorindex]')

                    $.each(editorBlocks, (i, block) => {
                        let editorIndex = $(block).attr('data-editorindex')
                        let itemId = $(block).attr('data-itemid')
                        let answerContent = answers[i] || answers[0] || agrs

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(answerContent)
                                    logger(`填空题第${i + 1}空已填入 (Index: ${editorIndex})`, 'green')
                                } else {
                                    logger(`填空题第${i + 1}空未找到编辑器实例 (Index: ${editorIndex}, ItemId: ${itemId})`, 'yellow')
                                }

                                if (itemId) {
                                    let textarea = $('#answer' + itemId)
                                    if (textarea.length > 0) {
                                        textarea.val(answerContent)
                                        try {
                                            if (textarea[0].value === answerContent) {
                                                textarea[0].dispatchEvent(new Event('change'))
                                                textarea[0].dispatchEvent(new Event('input'))
                                            }
                                        } catch (e) {}
                                    }
                                }
                            } catch (e) {
                                logger('填空题填入详情失败：' + e.message, 'red')
                            }
                        }, 500 * (i + 1))
                    })

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time + 300 * editorBlocks.length)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else if (tkList && tkList.length > 0) {

                if ($(tkList[0]).val() && $(tkList[0]).val().trim() !== '' && !isRedoMode()) {
                    logger("此题已作答,跳过", "green");
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }
                _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'" + ANSWER_SEPARATOR + "'分隔" })
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split(ANSWER_SEPARATOR)
                    let inputList = $(TimuList[index]).find('.blankList2 input')
                    $.each(inputList, (i, t) => {
                        setTimeout(() => {
                            $(t).val(answers[i] || answers[0] || agrs)

                            $(t).trigger('input').trigger('change')
                        }, 200)
                    })
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else {
                logger('未找到填空题输入区域，跳过此题', 'red')
                localStorage.setItem('GPTJsSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TimuList[index]).find('.answerList.panduan li')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger('答案匹配出错，准备切换下一题', 'red')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        logger('未匹配到正确选项，跳过', 'red')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        $(_answerTmpArr[_i]).click()
                        logger('自动答题成功，准备切换下一题', 'green')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }, 300)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: {
            _question = buildPrompt({ type: '简答题或材料题', question: _question })

            let jdEditorBlocks = $(TimuList[index]).find('[data-editorindex]')
            let jdTextareas = $(TimuList[index]).find('textarea[name^="answer"]')

            let jdIsAnswered = false

            if (jdEditorBlocks && jdEditorBlocks.length > 0) {
                if (jdTextareas.length > 0 && $(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(index + 1 + '简答题已作答，准备切换下一题', 'green')
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    break
                }

                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger('AI无法匹配答案，请手动完成', 'red')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }

                    let firstBlock = jdEditorBlocks.first()
                    if (firstBlock.length > 0) {
                        let editorIndex = firstBlock.attr('data-editorindex')
                        let itemId = firstBlock.attr('data-itemid')

                        if (!itemId && jdTextareas.length > 0) {
                            let tid = $(jdTextareas[0]).attr('id')
                            if (tid) itemId = tid.replace('answer', '')
                        }

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(agrs)
                                    logger(`简答题已填入 (Index: ${editorIndex})`, 'green')
                                } else {
                                    logger(`简答题未找到编辑器实例 (Index: ${editorIndex}, ItemId: ${itemId})`, 'yellow')
                                }

                                if (jdTextareas.length > 0) {
                                    let ta = $(jdTextareas[0])
                                    ta.val(agrs)

                                    try {
                                        ta[0].dispatchEvent(new Event('change'))
                                        ta[0].dispatchEvent(new Event('input'))
                                    } catch (e) {}
                                }
                            } catch (e) {
                                logger('简答题填入失败：' + e.message, 'red')

                                if (jdTextareas.length > 0) {
                                    $(jdTextareas[0]).val(agrs)
                                    logger('简答题通过textarea填入答案', 'blue')
                                }
                            }
                        }, 500)
                    } else {

                        if (jdTextareas.length > 0) {
                            $(jdTextareas[0]).val(agrs)
                            logger('简答题通过textarea填入答案', 'blue')
                        }
                    }

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }

            else if (jdTextareas && jdTextareas.length > 0) {

                if ($(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(index + 1 + '简答题已作答，准备切换下一题', 'green')
                    jdIsAnswered = true
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                } else {
                    getAnswer(_type, _question).then((agrs) => {
                        if (agrs == '暂无答案') {
                            logger('AI无法匹配答案，请手动完成', 'red')
                            localStorage.setItem('GPTJsSetting.sub', false)
                        } else {
                            $(jdTextareas[0]).val(agrs)
                            $(jdTextareas[0]).trigger('input').trigger('change')
                            logger('简答题自动答题成功，准备切换下一题', 'green')
                        }
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }).catch((agrs) => {
                        if (agrs && agrs['c'] == 0) {
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }
                    })
                }
            }

            else {
                logger('无法找到简答题输入区域，请手动完成', 'red')
                localStorage.setItem('GPTJsSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 5: {
            getAnswer(_type, _question).then((agrs) => {

                localStorage.setItem('GPTJsSetting.sub', false)
                logger('此类型题目无法区分单/多选，请手动选择答案', 'red')
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }
            })
            break
        }
        default:
            logger('暂不支持处理此类型题目：' + questionFull.match(/.*?\[(.*?)]|$/)[1] + '，跳过！请手动作答。', 'red')

            localStorage.setItem('GPTJsSetting.sub', false)
            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            break
    }
}

function getAccessibleFrameDocument(frame) {
    if (!frame) return null;
    try {
        return frame.contentDocument || (frame.contentWindow && frame.contentWindow.document) || null;
    } catch (_) { return null; }
}

function isCrossOriginAccessError(error) {
    return !!error && (error.name === 'SecurityError' || /Blocked a frame|cross-origin frame|Permission denied/i.test(error.message || ''));
}

function pollForElement(iframeDom, selector, interval, maxAttempts) {
    interval = interval || 2000;
    maxAttempts = (typeof maxAttempts === 'number' && maxAttempts > 0) ? maxAttempts : 60;
    return new Promise(function (resolve) {
        var attempts = 0;
        var check = function () {
            try {
                var doc = getAccessibleFrameDocument(iframeDom);
                if (doc) {
                    var el = doc.querySelector(selector);
                    if (el) return resolve(el);
                }
            } catch (e) {}
            attempts++;
            if (attempts >= maxAttempts) {
                logger('框架等待超时（' + Math.round(attempts * interval / 1000) + 's），上层将重试或跳过', 'red');
                return resolve(null);
            }
            if (attempts % 15 === 0) {
                logger('框架仍在加载中，已等待' + (attempts * interval / 1000) + '秒...请耐心等待', 'orange');
            }
            setTimeout(check, interval);
        };
        check();
    });
}

var _ne21AntiSleepStarted = false;
function setupAntiSleep() {
    if (_ne21AntiSleepStarted) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    function tryStart() {
        if (_ne21AntiSleepStarted) return;
        try {
            var ac = new AC();
            var osc = ac.createOscillator();
            var gain = ac.createGain();
            gain.gain.value = 0;
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start();
            _ne21AntiSleepStarted = true;

            document.addEventListener('visibilitychange', function () {
                try { if (ac.state === 'suspended') ac.resume(); } catch (_) {}
            });
        } catch (_) {}
    }
    tryStart();
    if (!_ne21AntiSleepStarted) {
        var onUserGesture = function () {
            tryStart();
            if (_ne21AntiSleepStarted) {
                document.removeEventListener('click', onUserGesture, true);
                document.removeEventListener('keydown', onUserGesture, true);
                document.removeEventListener('touchstart', onUserGesture, true);
            }
        };
        document.addEventListener('click', onUserGesture, true);
        document.addEventListener('keydown', onUserGesture, true);
        document.addEventListener('touchstart', onUserGesture, true);
    }
}

function setupAutoRefresh() {
    var stored = localStorage.getItem('GPTJsSetting.autoRefresh');
    var enabled = stored !== null ? (stored === 'true') : false;
    if (!enabled) return;
    var minutes = parseInt(localStorage.getItem('GPTJsSetting.autoRefreshMinutes'), 10);
    if (!isFinite(minutes) || minutes < 5) minutes = 30;
    setTimeout(function () {
        logger('已达到自动刷新时间（' + minutes + '分钟），3 秒后刷新页面...', 'orange');
        setTimeout(function () { try { window.location.reload(); } catch (_) {} }, 3000);
    }, minutes * 60 * 1000);
}

function startDoPhoneCyWork(index, doms, phoneWeb) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { startDoPhoneCyWork(index, doms, phoneWeb) }, 3000);
        return;
    }
    if (index == doms.length) {
        logger('此页面全部测验已处理完毕！准备进行下一项任务')
        setTimeout(missonStart, 5000)
        return
    }
    logger('等待测验框架加载...', 'purple')
    pollForElement(doms[index], 'iframe').then(element => {
        let workIframe = element
        if (!workIframe) {
            setTimeout(() => { startDoPhoneCyWork(index, doms, phoneWeb) }, 5000)
            return
        }
        let workStatus = $(workIframe).contents().find('.newTestCon .newTestTitle .testTit_status').text().trim()
        if (!workStatus) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            setTimeout(missonStart, 2000)
            return
        }
        if (isRedoMode() && workStatus.indexOf("已完成") != -1) {
            logger('测验：' + (index + 1) + ',重做模式下重新处理已完成测验', 'blue')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]', 60000).then((element) => {
                if (!element) { logger('测验框架加载超时（60s），跳过此测验', 'red'); setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 3000); return; }
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf("待做") != -1 || workStatus.indexOf("待完成") != -1 || workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1) {
            var isRedoStatus = workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1
            logger('测验：' + (index + 1) + (isRedoStatus ? ',未达到及格线,准备重做...' : ',准备处理此测验...'), 'purple')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]', 60000).then((element) => {
                if (!element) { logger('测验框架加载超时（60s），跳过此测验', 'red'); setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 3000); return; }
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf('待批阅') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',测验待批阅,跳过', 'red')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        } else if (workStatus.indexOf('已完成') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',已完成,跳过', 'green')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        } else {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',未知状态[' + workStatus + '],跳过', 'red')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        }
    })
}

function startDoCyWork(index, doms) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { startDoCyWork(index, doms) }, 3000);
        return;
    }
    if (index >= doms.length) {
        setTimeout(missonStart, 2000);
        return;
    }
    var outerDoc = getAccessibleFrameDocument(doms[index]);
    if (!outerDoc || !outerDoc.querySelector('iframe')) logger('等待测验框架加载...', 'purple');
    pollForElement(doms[index], 'iframe').then(async function (workIframe) {
        if (!workIframe) {
            logger('未找到测验框架，暂停处理，请刷新后重试', 'red');
            return;
        }
        var ready = await pollForElement(workIframe, '.TiMu, .questionLi, .testTit_status', 1000, 60);
        if (!ready) return;
        var currentDoc = getAccessibleFrameDocument(workIframe);
        if (!currentDoc) {
            logger('测验框架正在跳转或受到跨域限制，请等待加载完成后重试', 'orange');
            return;
        }
        var $doc = $(currentDoc);
        var status = $doc.find('.testTit_status').text().trim();
        if (/待批阅|已完成/.test(status) && !(isRedoMode() && /已完成/.test(status))) {
            logger('测验：' + status + '，跳过', 'green');
            _mlist.splice(0, 1);
            _domList.splice(0, 1);
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 2000);
        } else {
            if (!$doc.find('.TiMu, .questionLi').length) {
                var question = await pollForElement(workIframe, '.TiMu, .questionLi', 1000, 60);
                if (!question) {
                    logger('测验当前状态：' + (status || '未加载题目') + '，请手动进入作答页面', 'orange');
                    return;
                }
            }
            doWork(index, doms, workIframe);
        }
    });
}

function getElement(parent, selector, timeout = 0) {
    return new Promise(resolve => {
        var result = parent.querySelector(selector);
        if (result) return resolve(result);
        var timer;
        const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
        if (mutationObserver) {
            const observer = new mutationObserver(mutations => {
                for (var mutation of mutations) {
                    for (var addedNode of mutation.addedNodes) {
                        if (addedNode instanceof Element) {
                            result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
                            if (result) {
                                observer.disconnect();
                                timer && clearTimeout(timer);
                                return resolve(result);
                            }
                        }
                    }
                }
            });
            observer.observe(parent, {
                childList: true,
                subtree: true
            });
            if (timeout > 0) {
                timer = setTimeout(() => {
                    observer.disconnect();
                    return resolve(null);
                }, timeout);
            }
        } else {
            const listener = e => {
                if (e.target instanceof Element) {
                    result = e.target.matches(selector) ? e.target : e.target.querySelector(selector);
                    if (result) {
                        parent.removeEventListener('DOMNodeInserted', listener, true);
                        timer && clearTimeout(timer);
                        return resolve(result);
                    }
                }
            };
            parent.addEventListener('DOMNodeInserted', listener, true);
            if (timeout > 0) {
                timer = setTimeout(() => {
                    parent.removeEventListener('DOMNodeInserted', listener, true);
                    return resolve(null);
                }, timeout);
            }
        }
    });
}

function getQuizPracticeType($item) {
    var typeText = ($item.find('.grey-text').first().text() || '').replace(/\s+/g, '')
    var className = String($item.attr('class') || '')
    if (typeText.indexOf('多选') !== -1 || className.indexOf('multiple-choice') !== -1) {
        return { type: 1, name: '多选题' }
    }
    if (typeText.indexOf('判断') !== -1) {
        return { type: 3, name: '判断题' }
    }
    if (typeText.indexOf('填空') !== -1 || $item.find('.option-fill-list').length > 0) {
        return { type: 2, name: '填空题' }
    }
    if (/(简答|问答|论述|名词解释|计算题|材料题|写作|翻译)/.test(typeText) || $item.find('.short-answer-textarea').length > 0) {
        return { type: 4, name: typeText.replace(/^\[|\]$/g, '') || '简答题' }
    }
    if (typeText.indexOf('单选') !== -1 || className.indexOf('single-choice') !== -1) {
        return { type: 0, name: '单选题' }
    }
    return { type: -1, name: typeText || '未知题型' }
}

function getQuizPracticeQuestionText($item) {
    var $name = $item.find('.question-name').first().clone()
    $name.find('.grey-text').remove()
    var text = ($name.text() || '').replace(/\s+/g, ' ').trim()
    return tidyQuestion(text) || '随堂练习题'
}

function getQuizPracticeOptions($item) {
    return $item.find('.option-list > li').map(function () {
        var $option = $(this)
        var $clone = $option.clone()
        $clone.find('.option-letter').remove()
        return tidyStr($clone.text()) || ''
    }).get()
}

function getQuizPracticeFillInputs($item) {
    return $item.find('input.ofl-ipt, .option-fill-list input, .option-fill-list textarea').filter(function () {
        return !this.disabled
    })
}

function getQuizPracticeTextarea($item) {
    var $textarea = $item.find('.short-answer-textarea textarea').first()
    if ($textarea.length === 0) $textarea = $item.find('textarea').first()
    return $textarea
}

function isQuizPracticeAnswered($item, type) {
    if (type === 0 || type === 1 || type === 3) {
        return $item.find('.option-list > li.active, .option-list > li.selected, .option-list > li.checked').length > 0
    }
    if (type === 2) {
        var $inputs = getQuizPracticeFillInputs($item)
        var hasFill = false
        $inputs.each(function () {
            if ($.trim($(this).val() || '')) hasFill = true
        })
        return hasFill
    }
    if (type === 4) {
        return $.trim(getQuizPracticeTextarea($item).val() || '') !== ''
    }
    return false
}

function setQuizPracticeValue($element, value) {
    var element = $element.get(0)
    if (!element) return
    var text = value == null ? '' : String(value)
    try {
        var win = element.ownerDocument.defaultView
        var prototype = element.tagName === 'SELECT' ? win.HTMLSelectElement.prototype : element.tagName === 'TEXTAREA' ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype
        var descriptor = Object.getOwnPropertyDescriptor(prototype, 'value')
        if (descriptor && descriptor.set) descriptor.set.call(element, text)
        else element.value = text
    } catch (_) {
        element.value = text
    }
    try {
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
        element.dispatchEvent(new Event('blur', { bubbles: true }))
    } catch (_) {}
    if (element.tagName === 'SELECT') {
        element.setAttribute('value', text)
        var pageJQuery = element.ownerDocument.defaultView.jQuery || element.ownerDocument.defaultView.$
        if (pageJQuery) pageJQuery(element).trigger('chosen:updated').trigger('liszt:updated')
    }
}

function isQuizPracticeGoodStudent() {
    var stored = localStorage.getItem('GPTJsSetting.goodStudent')
    return stored === null ? !!setting.goodStudent : stored === 'true'
}

function setQuizPracticeOptionState($options, selectedIndexes) {
    var selected = {}
    selectedIndexes.forEach(function (index) { selected[index] = true })
    $options.each(function (index) {
        var $option = $(this)
        var shouldSelect = !!selected[index]
        if (isQuizPracticeGoodStudent()) {
            if (shouldSelect) $option.find('.option-letter, .option-result').css('font-weight', 'bold')
            return
        }
        var isSelected = $option.hasClass('active') || $option.hasClass('selected') || $option.hasClass('checked')
        if (shouldSelect !== isSelected) {
            try {
                this.click()
            } catch (_) {
                $option.trigger('click')
            }
        }
    })
}

function appendQuizPracticeAnswer($item, answer) {
    var alterTitle = localStorage.getItem('GPTJsSetting.alterTitle')
    var shouldAlter = alterTitle === null ? !!setting.alterTitle : alterTitle === 'true'
    if (!shouldAlter || !answer || $item.attr('data-ne21-answer-appended') === 'true') return
    var $name = $item.find('.question-name').first()
    if ($name.length === 0) return
    $('<p></p>').css('font-weight', 'bold').text('答案：' + answer).appendTo($name)
    $item.attr('data-ne21-answer-appended', 'true')
}

function getQuizPracticeSubmitButton() {
    var candidates = $('button, input[type="button"], input[type="submit"], .van-button, .submit-btn, .submit, [role="button"]').filter(function () {
        if (this.disabled) return false
        if (!$(this).is(':visible')) return false
        var text = ($(this).text() || $(this).val() || '').replace(/\s+/g, '')
        var className = typeof this.className === 'string' ? this.className : ''
        if (text === '提交' || (text.indexOf('提交') !== -1 && text.length <= 8)) return true
        return /(?:^|[-_\s])submit(?:$|[-_\s])/i.test(' ' + className + ' ')
    })
    return candidates.last()
}

function continueQuizPractice(index, questions, state) {
    var wait = Number(setting.time)
    if (!isFinite(wait) || wait < 300) wait = 2500
    wait += Math.floor(Math.random() * 350)
    setTimeout(function () {
        doQuizPractice(index, questions, state)
    }, wait)
}

function finishQuizPractice(state) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(function () { finishQuizPractice(state) }, 3000)
        return
    }
    logger('随堂练习处理完成，共 ' + state.total + ' 题，已作答 ' + state.answered + ' 题，失败 ' + state.failed + ' 题', state.failed ? 'orange' : 'green')
    if (state.failed > 0) localStorage.setItem('GPTJsSetting.sub', false)

    var storedSub = localStorage.getItem('GPTJsSetting.sub')
    var autoSubmit = storedSub === null ? !!setting.sub : storedSub === 'true'
    var storedForce = localStorage.getItem('GPTJsSetting.force')
    var forceSubmit = storedForce === null ? !!setting.force : storedForce === 'true'
    if (!autoSubmit && !forceSubmit) {
        logger('随堂练习未开启自动提交，已保留当前作答', 'blue')
        return
    }
    if (state.failed > 0 && !forceSubmit) {
        logger('存在未完成题目，已停止提交；如需强制提交请开启“测验强制提交”', 'orange')
        return
    }

    var $submit = getQuizPracticeSubmitButton()
    if ($submit.length === 0) {
        logger('未找到随堂练习提交按钮，请手动提交', 'red')
        return
    }
    try {
        $submit.get(0).click()
        logger('已提交随堂练习', 'green')
    } catch (_) {
        logger('随堂练习提交按钮点击失败，请手动提交', 'red')
    }
}

function doQuizPractice(index, questions, state) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(function () { doQuizPractice(index, questions, state) }, 3000)
        return
    }
    if (index >= questions.length) {
        setTimeout(function () { finishQuizPractice(state) }, 500)
        return
    }

    var $item = $(questions[index])
    if ($item.length === 0) {
        state.failed++
        continueQuizPractice(index + 1, questions, state)
        return
    }
    var typeInfo = getQuizPracticeType($item)
    _currentQuestionMeta = { index: index, total: questions.length, typeName: typeInfo.name }
    if (typeInfo.type < 0) {
        state.failed++
        logger('第' + (index + 1) + '题题型未识别，已跳过', 'red')
        continueQuizPractice(index + 1, questions, state)
        return
    }
    if (!isRedoMode() && isQuizPracticeAnswered($item, typeInfo.type)) {
        state.answered++
        logger('第' + (index + 1) + '题已作答，已跳过', 'blue')
        continueQuizPractice(index + 1, questions, state)
        return
    }

    var question = getQuizPracticeQuestionText($item)
    var options = getQuizPracticeOptions($item)
    var prompt
    if (typeInfo.type === 0) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '单选题', question: question, options: options, answer_format: "只回答一个选项字母或选项内容" })
    } else if (typeInfo.type === 1) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '多选题', question: question, options: options, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案，或回答选项字母" })
    } else if (typeInfo.type === 3) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '判断题', question: question, options: options, answer_format: "只回答正确或错误，或回答选项字母" })
    } else if (typeInfo.type === 2) {
        prompt = buildPrompt({ type: '填空题', question: question, answer_format: "多个填空内容用'" + ANSWER_SEPARATOR + "'分隔" })
    } else {
        prompt = buildPrompt({ type: '简答题', question: question })
    }

    getAnswer(typeInfo.type, prompt).then(function (answer) {
        appendQuizPracticeAnswer($item, answer)
        var applied = false

        if (typeInfo.type === 0 || typeInfo.type === 1 || typeInfo.type === 3) {
            var indexes = []
            if (typeInfo.type === 3) {
                var judgeAnswer = parseJudgeAnswer(answer)
                var judgeIndex = judgeAnswer === null ? -1 : findJudgeOptionIndex(options, judgeAnswer === 'true')
                if (judgeIndex !== -1) indexes = [judgeIndex]
            }
            if (indexes.length === 0) {
                indexes = findVideoQuizMatchIndexes(options, answer, typeInfo.type === 1)
            }
            if (typeInfo.type !== 1) indexes = indexes.slice(0, 1)
            if (indexes.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未能匹配到选项，已跳过', 'red')
            } else {
                var $options = $item.find('.option-list > li')
                setQuizPracticeOptionState($options, indexes)
                applied = true
                state.answered++
            }
        } else if (typeInfo.type === 2) {
            var $inputs = getQuizPracticeFillInputs($item)
            var parts = $inputs.length === 1 ? [String(answer || '').trim()] : splitAiAnswers(answer)
            if (parts.length === 0 && answer) parts = [String(answer).trim()]
            if ($inputs.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未找到填空输入框，已跳过', 'red')
            } else {
                $inputs.each(function (inputIndex) {
                    var value = parts[inputIndex] != null ? parts[inputIndex] : (parts.length === 1 ? parts[0] : '')
                    setQuizPracticeValue($(this), value)
                })
                applied = true
                state.answered++
            }
        } else {
            var $textarea = getQuizPracticeTextarea($item)
            if ($textarea.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未找到作答输入框，已跳过', 'red')
            } else {
                setQuizPracticeValue($textarea, answer)
                applied = true
                state.answered++
            }
        }

        if (applied) logger('第' + (index + 1) + '题作答完成', 'green')
        continueQuizPractice(index + 1, questions, state)
    }).catch(function () {
        state.failed++
        localStorage.setItem('GPTJsSetting.sub', false)
        continueQuizPractice(index + 1, questions, state)
    })
}

function missonQuizPractice() {
    if (document.documentElement.getAttribute('data-ne21-quiz-practice') === 'running') return
    var questions = $('.question-item').toArray()
    if (questions.length === 0) {
        logger('未找到随堂练习题目', 'red')
        return
    }
    document.documentElement.setAttribute('data-ne21-quiz-practice', 'running')
    var state = { total: questions.length, answered: 0, failed: 0 }
    logger('检测到随堂练习，共 ' + questions.length + ' 题，开始处理', 'green')
    doQuizPractice(0, questions, state)
}

function missonHomeWork() {
    logger('开始处理作业', 'green')
    let $_homeworktable = $('.mark_table').find('form')
    let TimuList = $_homeworktable.find('.questionLi')
    doHomeWork(0, TimuList)
}

function doHomeWork(index, TiMuList) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { doHomeWork(index, TiMuList) }, 3000);
        return;
    }
    if (index == TiMuList.length) {
        logger('作业题目已全部完成', 'green')
        return
    }

    if (handleExtraWorkQuestion($(TiMuList[index]), () => { doHomeWork(index + 1, TiMuList); })) return;

    let $subQuestions = getWorkSubQuestions($(TiMuList[index]));
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($(TiMuList[index]).find('h3.mark_name').html() || '');
        let currentTypeName = $(TiMuList[index]).attr('typename') || '阅读理解';
        _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: currentTypeName };
        processSubQuestions(0, $subQuestions, parentQuestion, () => setting.time, () => { doHomeWork(index + 1, TiMuList) });
        return;
    }

    function handleNormalTextarea(textareaList, jdt, index, TiMuList) {
        if (!textareaList || textareaList.length === 0) {
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            return;
        }
        getAnswer(4, jdt).then((agrs) => {
            $.each(textareaList, (i, t) => {
                let _id = $(t).attr('id') || $(t).attr('name');
                setTimeout(() => {
                    try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                }, 300 + i * 200);
            });
            logger('自动答题成功，准备切换下一题', 'green');
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * textareaList.length);
        }).catch((agrs) => {
            if (agrs && agrs['c'] == 0) {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            }
        });
    }

    let typeName = $(TiMuList[index]).attr('typename');
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }
    let _questionFull = $(TiMuList[index]).find('.mark_name').html()
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    var check_answer_flag = 0;

    if (_type === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _type = 0;

            let multiChoiceCheck = $(TiMuList[index]).find('.stem_answer input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _type = 1;
                logger('自动识别为多选题', 'green');
            } else {
                logger('自动识别为单选题', 'green');
            }
        }

        else {
            _textareaList = $(TiMuList[index]).find('.stem_answer').find('.subEditor textarea, .Answer .divText textarea, .Answer .divText .textDIV textarea, textarea[name^="answerEditor"], .edui-editor textarea');
            if (_textareaList && _textareaList.length > 0) {
                _type = 4;
                logger('自动识别为简答题', 'green');
            }
        }
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    $.each(_answerTmpArr, (i, t) => {
                        _a.push(tidyStr($(t).html()))
                    })
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {

                        let timuele = $(TiMuList[index]).find('.mark_name')

                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _i = _a.findIndex((item) => item == agrs)

                    if (_i == -1) {

                        _i = findBestFuzzyMatch(_a, agrs)
                    }
                    if (_i == -1) {
                        logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    } else {
                        setTimeout(() => {
                            let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                            if (check.indexOf('check_answer') == -1) {
                                $(_answerTmpArr[_i]).parent().click()
                            }
                            logger('自动答题成功，准备切换下一题', 'green')
                            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        }, 300)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break

        case 1: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                        break
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下取消旧答案', 'blue')
                        $(_answerTmpArr[i]).parent().click()

                    }
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {

                        let timuele = $(TiMuList[index]).find('.mark_name')

                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _multiOptions = []
                    $.each(_answerTmpArr, (i, t) => {
                        _multiOptions.push(tidyStr($(t).html()))
                    })
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true
                            setTimeout(() => {
                                let check = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                                if (check.indexOf('check_answer_dx') == -1) {
                                    $(_answerTmpArr[i]).parent().click()
                                }
                            }, 300)
                        }
                    });

                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                setTimeout(function () {
                                    let check = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                    if (check.indexOf('check_answer_dx') == -1) {
                                        $(_answerTmpArr[idx]).parent().click()
                                    }
                                }, 300)
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" });
            _textareaList = findAnswerTextareas($(TiMuList[index]));
            if (!_textareaList || _textareaList.length === 0) {
                logger('未找到填空题输入区域，跳过此题', 'red');
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                break
            }

            let _id = $(_textareaList[0]).attr('id') || $(_textareaList[0]).attr('name');
            let firstAnswered = false;
            try {
                if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') firstAnswered = true;
            } catch (e) { firstAnswered = false; }
            if (firstAnswered && !isRedoMode()) {
                logger(index + 1 + '此题已作答，准备切换下一题', 'green');
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30);
            } else {
                getAnswer(_type, _question).then((agrs) => {
                    let _answerTmpArr = (agrs || '').split(ANSWER_SEPARATOR);
                    $.each(_textareaList, (i, t) => {
                        let _currentId = $(t).attr('id') || $(t).attr('name');
                        let val = _answerTmpArr[i] !== undefined ? _answerTmpArr[i] : (_answerTmpArr[0] || agrs);
                        setTimeout(() => {
                            try { UE.getEditor(_currentId).setContent(val) } catch (e) {}
                        }, 300 + i * 200);
                    });
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _textareaList.length);
                    logger('自动答题成功，准备切换下一题', 'green');
                }).catch((agrs) => {
                    if (agrs && agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                    }
                });
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，重做模式下重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                        let timuele = $(TiMuList[index]).find('.mark_name')
                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger('答案匹配出错，准备切换下一题', 'red')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        logger('未匹配到正确选项，跳过', 'red')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                        if (check.indexOf('check_answer') == -1) {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }, 300)
                    logger('自动答题成功，准备切换下一题', 'green')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle || _answerEle.length === 0) {
                logger((index + 1) + ' 未找到文本作答区域，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }
            let _isAnswered4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered4 = true } catch (e) {}
            })
            if (_isAnswered4 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 5: {
            let _answerEle5 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle5 || _answerEle5.length === 0) {
                logger((index + 1) + ' 未找到写作题文本框，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }

            let _isAnswered5 = false
            $.each(_answerEle5, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered5 = true } catch (e) {}
            })
            if (_isAnswered5 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt5 = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, jdt5).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle5, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle5.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 6: {
            let _answerEle6 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle6 || _answerEle6.length === 0) {
                logger((index + 1) + ' 未找到翻译题文本框，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }

            let _isAnswered6 = false
            $.each(_answerEle6, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered6 = true } catch (e) {}
            })
            if (_isAnswered6 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt6 = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, jdt6).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle6, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle6.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        default: {
            if (_type === undefined) {
                logger('无法识别题型：' + typeName + '，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            } else {

                _textareaList = $(TiMuList[index]).find('.stem_answer').find('textarea, .subEditor textarea, .divText textarea, .eidtDiv textarea, .divText .edui-editor, textarea[name^="answerEditor"]');
                if (_textareaList && _textareaList.length > 0) {
                    logger('检测到文本输入区域，尝试回答', 'green');
                    let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })

                    let editorTextareas = $(TiMuList[index]).find('.stem_answer textarea[name^="answerEditor"]');
                    if (editorTextareas && editorTextareas.length > 0) {

                        let editorId = $(editorTextareas[0]).attr('id');
                        if (editorId) {
                            getAnswer(_type || 4, jdt).then((agrs) => {
                                setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                                logger('使用富文本编辑器ID回答成功，准备切换下一题', 'green');
                                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                            }).catch((agrs) => {
                                if (agrs['c'] == 0) {
                                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                                }
                            });
                        } else {
                            logger('找到富文本编辑器但无法获取ID，改用普通方法', 'yellow');

                            handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                        }
                    } else {

                        handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                    }

                } else {
                    logger('无法处理此题型：' + typeName + '，跳过此题', 'red');
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                }
            }
        }
    }
}

function missonExam() {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(missonExam, 3000);
        return;
    }
    let $_examtable = $('.mark_table').find('.whiteDiv')
    if (handleExtraWorkQuestion($_examtable, toNextExam)) return;
    let _questionFull = tidyStr($_examtable.find('h3.mark_name').html().trim())
    let typeName = _questionFull.match(/[(](.*?),.*?分[)]|$/)[1];
    let _qType = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]

    let _examCurIdx = null
    try {
        let $curLi = $('.mark_table .mark_li_list li.active, .mark_table .mark_li_list li.current')
        if ($curLi.length) _examCurIdx = parseInt($curLi.text().trim()) - 1
    } catch (_) {}
    _currentQuestionMeta = { index: isFinite(_examCurIdx) ? _examCurIdx : null, total: null, typeName: typeName }
    let _question = tidyQuestion(_questionFull.replace(/[(].*?分[)]/, '').replace(/^\s*/, ''))
    let $_ansdom = $_examtable.find('#submitTest').find('.stem_answer')

    let $subQuestions = getWorkSubQuestions($_ansdom);
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($_examtable.find('h3.mark_name').html() || '');
        _currentQuestionMeta = { index: _examCurIdx, total: null, typeName: typeName || '阅读理解' };
        processSubQuestions(0, $subQuestions, parentQuestion, () => setting.time, () => { toNextExam() });
        return;
    }

    let _answerTmpArr;
    let _a = []

    function handleStandardExamTextarea(standardTextareas, _question) {
        logger('检测到标准文本输入区域，尝试回答', 'green');
        let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })
        getAnswer(4, jdt).then((agrs) => {
            $.each(standardTextareas, (i, t) => {
                let _id = $(t).attr('id')
                setTimeout(() => { UE.getEditor(_id).setContent(agrs) }, 300)
            })
            logger('自动答题成功，准备切换下一题', 'green')
            toNextExam()
        }).catch((agrs) => {
            if (agrs['c'] == 0) {
                toNextExam()
            }
        })
    }

    if (_qType === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p');
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _qType = 0;

            let multiChoiceCheck = $_ansdom.find('.clearfix.answerBg input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _qType = 1;
                logger('自动识别为多选题', 'green');
            } else {
                logger('自动识别为单选题', 'green');
            }
        }

        else {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea, .Answer .divText .edui-editor, .Answer .divText textarea, textarea[name^="answerEditor"]');
            if (_textareaList && _textareaList.length > 0) {
                _qType = 4;
                logger('自动识别为简答题', 'green');
            }
        }
    }

    switch (_qType) {
        case 0: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _answeredIdxE0 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE0 = _ai; break }
            }
            if (_answeredIdxE0 !== -1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_answeredIdxE0 !== -1 && isRedoMode()) {
                logger('此题已作答，重做模式下重新作答', 'blue')
                $(_answerTmpArr[_answeredIdxE0]).parent().click()
            }

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })
            getAnswer(_qType, _question).then((agrs) => {
                $.each(_answerTmpArr, (i, t) => {
                    _a.push(tidyStr($(t).html()))
                })
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')

                    timuele.html(timuele.html() + agrs)
                }

                let _i = _a.findIndex((item) => item == agrs)
                if (_i == -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i == -1) {
                    logger('AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题', 'red')
                    setTimeout(toNextExam, 5000)
                } else {
                    setTimeout(() => {
                        if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[_i]).parent().click() }, 300)
                            }
                            logger('自动答题成功，准备切换下一题', 'green')
                            toNextExam()
                        } else {
                            logger('此题已作答，准备切换下一题', 'green')
                            toNextExam()
                        }
                    }, 300)
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 1: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _alreadyAnsweredE1 = $_ansdom.find('.clearfix.answerBg span.check_answer_dx, .clearfix.answerBg span.check_answer').length > 0
            if (_alreadyAnsweredE1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE1 && isRedoMode()) {
                logger('此题已作答，重做模式下重新作答', 'blue')
                $.each(_answerTmpArr, function (_i2, _t2) {
                    var _cls2 = $(_t2).parent().find('span').attr('class') || ''
                    if (_cls2.indexOf('check_answer') !== -1) {
                        $(_t2).parent().click()
                    }
                })
            }

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')

                    timuele.html(timuele.html() + agrs)
                }

                {
                    let _multiOptions = []
                    $.each(_answerTmpArr, (i, t) => {
                        _multiOptions.push(tidyStr($(t).html()))
                    })
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true

                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    });

                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                    $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold');
                                } else {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 2: {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea')

            let _alreadyAnsweredE2 = false
            $.each(_textareaList, function (_i2, _t2) {
                let _eid = $(_t2).attr('id')
                try {
                    if (_eid && typeof UE !== 'undefined' && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') {
                        _alreadyAnsweredE2 = true
                    }
                } catch (_e) {}
            })
            if (_alreadyAnsweredE2 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE2 && isRedoMode()) {
                logger('此题已作答，重做模式下重新作答', 'blue')
                $.each(_textareaList, function (_i2, _t2) {
                    let _eid = $(_t2).attr('id')
                    try { if (_eid && UE.getEditor(_eid)) UE.getEditor(_eid).setContent('') } catch (_e) {}
                })
            }
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" });

            getAnswer(_qType, _question).then((agrs) => {
                let _answerTmpArr = agrs.split(ANSWER_SEPARATOR)
                $.each(_textareaList, (i, t) => {
                    let _id = $(t).attr('id')
                    setTimeout(() => { UE.getEditor(_id).setContent(_answerTmpArr[i]) }, 300)
                })
                logger('自动答题成功，准备切换下一题', 'green')
                toNextExam()
            }).catch((agrs) => {
                if (agrs && agrs['c'] == 0) { toNextExam() }
            })
            break
        }
        case 3: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _answeredIdxE3 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE3 = _ai; break }
            }
            if (_answeredIdxE3 !== -1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_answeredIdxE3 !== -1 && isRedoMode()) {
                logger('此题已作答，重做模式下重新作答', 'blue')
                $(_answerTmpArr[_answeredIdxE3]).parent().click()
            }
            _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" });
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }

                let judgeResult = parseJudgeAnswer(agrs)
                if (judgeResult === null) {
                    logger('答案匹配出错，准备切换下一题', 'red')
                    toNextExam()
                    return
                }
                let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                if (_i === -1) {
                    logger('未匹配到正确选项，跳过', 'red')
                    toNextExam()
                    return
                }
                if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                    if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                        setTimeout(() => { $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold'); }, 300)
                    } else {
                        $(_answerTmpArr[_i]).parent().click()
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    toNextExam()
                } else {
                    logger('此题已作答，准备切换下一题', 'green')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE4 = true } catch (e) {}
            })
            if (_isAnsweredE4 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 5: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE5 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE5 = true } catch (e) {}
            })
            if (_isAnsweredE5 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 6: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE6 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE6 = true } catch (e) {}
            })
            if (_isAnsweredE6 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        default: {
            if (_qType === undefined) {
                logger('无法识别题型：' + typeName + '，跳过此题', 'red')
                toNextExam()
            } else {

                let standardTextareas = $_ansdom.find('.Answer .divText .subEditor textarea');
                let richEditors = $_ansdom.find('.Answer .divText .edui-editor');

                let editorTextareas = $_ansdom.find('textarea[name^="answerEditor"]');

                if (editorTextareas && editorTextareas.length > 0) {
                    logger('检测到材料题富文本编辑器，尝试回答', 'green');
                    let editorId = $(editorTextareas[0]).attr('id');
                    if (editorId) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                            logger('材料题自动答题成功，准备切换下一题', 'green');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        logger('找到材料题编辑器但无法获取ID，尝试其他方法', 'yellow');
                        handleStandardExamTextarea(standardTextareas, _question);
                    }
                }

                else if (standardTextareas && standardTextareas.length > 0) {
                    handleStandardExamTextarea(standardTextareas, _question);
                }

                else if (richEditors && richEditors.length > 0) {
                    logger('检测到富文本编辑器，尝试查找编辑器ID', 'green');

                    let editorScripts = $('script:contains("UE.getEditor")');
                    let editorIdMatch = null;

                    if (editorScripts && editorScripts.length > 0) {

                        let scriptContent = editorScripts.text();
                        let matches = scriptContent.match(/UE\.getEditor\(['"](.*?)['"]/);
                        if (matches && matches.length > 1) {
                            editorIdMatch = matches[1];
                            logger('从脚本中发现编辑器ID: ' + editorIdMatch, 'green');
                        }
                    }

                    if (editorIdMatch) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorIdMatch).setContent(agrs) }, 300);
                            logger('使用脚本找到的编辑器ID回答成功，准备切换下一题', 'green');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        logger('无法找到有效的编辑器ID，跳过此题', 'red');
                        toNextExam();
                    }
                }
                else {
                    logger('无法处理此题型：' + typeName + '，跳过此题', 'red');
                    toNextExam();
                }

            }
        }
    }
}

function toNextExam() {
    if (localStorage.getItem('GPTJsSetting.examTurn') === 'true') {
        let $_examtable = $('.mark_table').find('.whiteDiv')
        let $nextbtn = $_examtable.find('.nextDiv a.jb_btn')
        setTimeout(() => {
            $nextbtn.click()
        }, setting.examTurnTime ? 2000 + (Math.floor(Math.random() * 5 + 1) * 1000) : 2000)
    } else {
        logger('用户设置不自动跳转下一题，请手动点击', 'blue')
    }
}

function missonExamPreview() {
    logger('进入整卷预览页面，开始处理考试', 'green')
    let TiMuList = $('.mark_table').find('.questionLi')
    if (!TiMuList || TiMuList.length === 0) {
        logger('未解析到题目，请确认页面已渲染', 'red')
        return
    }
    logger('共解析到 ' + TiMuList.length + ' 道题', 'blue')
    doExamPreview(0, TiMuList)
}

function getExamPreviewDelay() {
    let base = (setting && setting.time) ? setting.time : 2500
    return base + Math.floor(Math.random() * 1500)
}

function getExamPreviewType($timu) {
    let typeMap = {
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    }
    let typeName = $timu.attr('typename')
    if (typeName && typeMap[typeName] !== undefined) {
        return { type: typeMap[typeName], typeName: typeName }
    }
    let prefixText = $timu.find('.colorShallow').text() || $timu.find('.mark_name').text() || ''
    let m = prefixText.match(/(单选题|多选题|填空题|判断题|简答题|论述题|写作题|翻译题)/)
    if (m && typeMap[m[1]] !== undefined) {
        return { type: typeMap[m[1]], typeName: m[1] }
    }
    let qid = $timu.attr('data') || $timu.find('.questionId').val() || $timu.find('input.questionId').val()
    if (qid) {
        let typeVal = $('[name="type' + qid + '"]').val()
        if (typeVal !== undefined && typeVal !== null && typeVal !== '') {
            let n = parseInt(typeVal)
            if (!isNaN(n) && n >= 0 && n <= 6) {
                return { type: n, typeName: typeName || ('类型' + n) }
            }
        }
    }
    let $opts = $timu.find('.answerBg .answer_p')
    if ($opts && $opts.length > 0) {
        let hasCheckbox = $timu.find('.answerBg input[type="checkbox"]').length > 0
        return { type: hasCheckbox ? 1 : 0, typeName: typeName || (hasCheckbox ? '多选题' : '单选题') }
    }
    let $textareas = $timu.find('textarea[name^="answerEditor"], .subEditor textarea')
    if ($textareas && $textareas.length > 0) {
        return { type: 4, typeName: typeName || '简答题' }
    }
    return { type: undefined, typeName: typeName || '未知' }
}

function doExamPreview(index, TiMuList) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { doExamPreview(index, TiMuList) }, 3000);
        return;
    }
    if (index >= TiMuList.length) {
        logger('整卷预览答题已完成，请人工核对后手动交卷', 'green')
        return
    }

    if (handleExtraWorkQuestion($(TiMuList[index]), () => { doExamPreview(index + 1, TiMuList); })) return;

    let $subQuestions = getWorkSubQuestions($(TiMuList[index]));
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($(TiMuList[index]).find('h3.mark_name').html() || '');
        let currentTypeName = $(TiMuList[index]).attr('typename') || '阅读理解';
        _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: currentTypeName };
        processSubQuestions(0, $subQuestions, parentQuestion, getExamPreviewDelay, () => { doExamPreview(index + 1, TiMuList) });
        return;
    }
    let $timu = $(TiMuList[index])
    let typeInfo = getExamPreviewType($timu)
    let _type = typeInfo.type
    let typeName = typeInfo.typeName
    let _questionFull = $timu.find('.mark_name').html() || ''
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    let alreadyAnswered = 0
    let prefix = '第' + (index + 1) + '题: '

    function nextSoon() {
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, getExamPreviewDelay())
    }
    function nextFast() {
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, 30)
    }

    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }

    if (_type === undefined) {
        logger(prefix + '无法识别题型(' + typeName + ')，跳过此题', 'red')
        return nextSoon()
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到选项，跳过', 'red')
                return nextSoon()
            }
            let mergedAnswers = []
            _answerTmpArr.each(function () {
                mergedAnswers.push($(this).text().replace(/[ABCD]/g, '').trim())
            })
            let prompt = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                    } else {
                        logger(prefix + '已作答，重做模式下重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerTmpArr, function (i, t) { _a.push(tidyStr($(t).html())) })
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _i = _a.findIndex(function (item) { return item === agrs })
                if (_i === -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i === -1) {
                    logger(prefix + 'AI无法完美匹配正确答案，请手动选择', 'red')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(prefix + '自动答题成功', 'green')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 1: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到选项，跳过', 'red')
                return nextSoon()
            }
            let mergedAnswers = []
            _answerTmpArr.each(function () {
                mergedAnswers.push($(this).text().replace(/[ABCD]/g, '').trim())
            })
            let prompt = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                        break
                    } else {
                        logger(prefix + '已作答，重做模式下取消旧答案', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _multiOptions = []
                $.each(_answerTmpArr, function (i, t) {
                    _multiOptions.push(tidyStr($(t).html()))
                })
                let _matchedAny = false
                $.each(_answerTmpArr, function (i, t) {
                    if (agrs.indexOf(_multiOptions[i]) !== -1) {
                        _matchedAny = true
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                            if (cls.indexOf('check_answer_dx') === -1) {
                                setTimeout(function () { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    }
                })

                if (!_matchedAny) {
                    let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                    for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                        (function (idx) {
                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold')
                            } else {
                                let cls = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                if (cls.indexOf('check_answer_dx') === -1) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            }
                        })(fuzzyIndices[fi])
                    }
                }
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 2: {
            _textareaList = $timu.find('textarea[name^="answerEditor"]')
            if (!_textareaList || _textareaList.length === 0) {
                _textareaList = $timu.find('.subEditor textarea')
            }
            if (!_textareaList || _textareaList.length === 0) {
                logger(prefix + '未找到填空文本框，跳过', 'red')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_textareaList, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) {}
            })
            if (isAnswered && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: '填空题', question: _question, answer_format: "用'" + ANSWER_SEPARATOR + "'分割多个答案" })
            getAnswer(_type, prompt).then(function (agrs) {
                let parts = (agrs || '').split(ANSWER_SEPARATOR)
                $.each(_textareaList, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    let val = parts[i] !== undefined ? parts[i] : (parts[parts.length - 1] || '')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(val) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 3: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到判断选项，跳过', 'red')
                return nextSoon()
            }
            $.each(_answerTmpArr, function (i, t) { _a.push($(t).text().trim()) })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                    } else {
                        logger(prefix + '已作答，重做模式下重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            let prompt = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let judgeResult = parseJudgeAnswer(agrs)
                let _i = judgeResult !== null ? findJudgeOptionIndex(_a, judgeResult === 'true') : -1
                if (_i === -1) {
                    logger(prefix + '答案匹配出错，跳过', 'red')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(prefix + '自动答题成功', 'green')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) {}
            })
            if (isAnswered && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 5: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }

            let isAnswered5 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered5 = true
                    }
                } catch (e) {}
            })
            if (isAnswered5 && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 6: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }

            let isAnswered6 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered6 = true
                    }
                } catch (e) {}
            })
            if (isAnswered6 && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        default: {
            logger(prefix + '无法处理此题型: ' + typeName + '，跳过', 'red')
            nextSoon()
        }
    }
}

function refreshCourseList() {
    let _p = parseUrlParams()
    return new Promise((resolve, reject) => {
        $.ajax({
            url: _l.protocol + '//' + _l.host + '/mycourse/studentstudycourselist?courseId=' + _p['courseid'] + '&chapterId=' + _p['knowledgeid'] + '&clazzid=' + _p['clazzid'] + '&mooc2=1',
            type: 'GET',
            dataType: 'html',
            timeout: 10000,
            success: function (res) {
                resolve(res)
            },
            error: function (xhr, status) {
                reject(new Error(status === 'timeout' ? '课程目录请求超时（10秒）' : '课程目录请求失败（' + (xhr.status || status) + '）'))
            }
        })
    })

}

var _ne21ThinkingCount = 0;
function showThinking() {
    _ne21ThinkingCount++;
    if (_ne21ThinkingCount === 1) {
        $('#ne-21thinking', getPanelDocument()).addClass('ne21-active');
    }
}
function hideThinking() {
    if (_ne21ThinkingCount > 0) _ne21ThinkingCount--;
    if (_ne21ThinkingCount === 0) {
        $('#ne-21thinking', getPanelDocument()).removeClass('ne21-active');
    }
}

function buildPrompt(opts) {
    opts = opts || {}
    let q = opts.question != null ? String(opts.question) : ''
    let payloadObj = {}
    if (opts.type) payloadObj.type = String(opts.type)
    if (opts.answer_format) payloadObj.answer_format = String(opts.answer_format)
    payloadObj.question = q
    if (Array.isArray(opts.options) && opts.options.length > 0) {
        payloadObj.options = opts.options.map(function (s) { return String(s == null ? '' : s).trim() })
    }
    let payload = JSON.stringify(payloadObj, null, 2)
    let display = q
    if (payloadObj.options && payloadObj.options.length) {
        display += '\n' + payloadObj.options.join('\n')
    }
    return { payload: payload, display: display, preserveWhitespace: opts.preserveWhitespace === true }
}

function processSubQuestions(subIndex, $subQuestions, parentQuestion, getDelay, onComplete, allAnswered = true) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { processSubQuestions(subIndex, $subQuestions, parentQuestion, getDelay, onComplete, allAnswered); }, 3000);
        return;
    }
    if (subIndex >= $subQuestions.length) return onComplete(allAnswered);
    var $sub = $($subQuestions[subIndex]);
    var info = getWorkQuestionType($sub);
    if (info.type === undefined) {
        var rawType = Number.parseInt($sub.attr('qtype'), 10);
        if ([0, 1, 2, 3].includes(rawType)) info.type = rawType;
        else if ([4, 5, 6, 7, 8, 9, 10].includes(rawType)) info.type = 4;
        else if ($sub.find('.saveSingleSelect').length) info.type = 0;
    }
    var question = '[大题背景]\n' + parentQuestion + '\n[小题' + (subIndex + 1) + ']\n' + getWorkQuestionText($sub);
    runWorkQuestion($sub, info, question, function (success) {
        var delay = typeof getDelay === 'function' ? getDelay() : setting.time;
        setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete, allAnswered && success); }, delay);
    });
}

function getAnswerLegacy(_t, _q, retryCount = 0) {
    var preserveWhitespace = Boolean(_q && _q.preserveWhitespace);

    let _payload, _display
    if (_q && typeof _q === 'object' && (_q.payload != null || _q.display != null)) {
        _payload = _q.payload != null ? String(_q.payload) : ''
        _display = _q.display != null ? String(_q.display) : _payload
    } else {
        _payload = _q == null ? '' : String(_q)
        _display = _payload
    }
    let _qPrefix = ''
    if (_currentQuestionMeta) {
        var _m = _currentQuestionMeta
        _qPrefix = '第' + ((_m.index != null ? _m.index : -1) + 1)
        if (_m.total) _qPrefix += '/' + _m.total
        _qPrefix += '题 [' + (_m.typeName || '未知') + '] '
    }
    logger(_qPrefix + '题目:' + _display, 'pink')

    let _thinkingHtml = '<span class="ne21-log-spinner"></span>AI 思考中<span class="ne21-log-dots"><i></i><i></i><i></i></span>' + (retryCount > 0 ? '（第' + (retryCount + 1) + '次）' : '')
    let $thinkingLog = logger(_thinkingHtml, 'gray')
    return new Promise((resolve, reject) => {
        let _u = getCk('_uid') || getCk('UID')
        let requestCompleted = false;
        let longWaitTimer = null;

        let _intervalMs = Math.min(60000, setting.time !== undefined ? setting.time : 2500)
        let _nowTs = Date.now()
        let _waitMs = Math.max(0, _ne21NextAiAllowedAt - _nowTs)

        _ne21NextAiAllowedAt = Math.max(_nowTs, _ne21NextAiAllowedAt) + _intervalMs
        if (_waitMs > 0) {
            updateLogEntry($thinkingLog, '搜题间隔限制，等待 ' + Math.round(_waitMs / 1000) + 's 后发起请求...', 'gray')
        }

        var _maxRetries = 3;
        longWaitTimer = setTimeout(() => {
            if (!requestCompleted) {
                requestCompleted = true;
                if (retryCount >= _maxRetries) {
                    updateLogEntry($thinkingLog, '已重试' + _maxRetries + '次仍未响应，请刷新页面重试', 'red')
                    reject({ 'c': 666 })
                    return;
                }

                updateLogEntry($thinkingLog, '请求超过2.5分钟未响应，正在重新发起请求...（第' + (retryCount + 1) + '次重试）', 'orange')

                getAnswer(_t, _q, retryCount + 1).then(resolve).catch(reject)
            }
        }, 150000 + _waitMs);

        setTimeout(function () {
            if (requestCompleted) return;

            if (_waitMs > 0) {
                let _resumeHtml = '<span class="ne21-log-spinner"></span>AI 思考中<span class="ne21-log-dots"><i></i><i></i><i></i></span>' + (retryCount > 0 ? '（第' + (retryCount + 1) + '次）' : '')
                updateLogEntry($thinkingLog, _resumeHtml, 'gray')
            }

            GM_xmlhttpRequest({
                method: 'POST',
                url: _host + '/api/v1/cx?v=' + '3.2.9',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': ''
                },
                data: 'question=' + encodeURIComponent(_payload) + '&u=' + _u + '&model=' + (localStorage.getItem('GPTJsSetting.model') || $('#modelSelect').val() || 'GPT-3.5'),
                timeout: 135000,
                onload: function (xhr) {

                    if (requestCompleted) {
                        logger('收到已超时请求的响应，已忽略', 'gray')
                        return;
                    }

                    requestCompleted = true;
                    clearTimeout(longWaitTimer);

                    if (xhr.status == 200) {
                        let obj = $.parseJSON(xhr.responseText) || {};

                        if (!obj.data || typeof obj.data.answer !== 'string') {
                            updateLogEntry($thinkingLog, obj.msg || '服务器返回数据异常', 'red')
                            localStorage.setItem('GPTJsSetting.sub', false)
                            reject({ 'c': 0 })
                            return;
                        }

                        let _answer = preserveWhitespace ? obj.data.answer : obj.data.answer.replace(/。$/, '');

                        if (obj.code == 200 && _answer) {
                            updateLogEntry($thinkingLog, "答案:" + (preserveWhitespace ? $('<div>').text(_answer).html() : _answer), 'purple')
                            resolve(preserveWhitespace ? _answer : _answer.replace(/^[A-Z]\s*\n\s*/, '').trim())
                        } else if (obj.msg && _answer != '') {
                            updateLogEntry($thinkingLog, obj.msg, 'red')

                            localStorage.setItem('GPTJsSetting.sub', false)
                            reject({ 'c': 0 })
                        } else {
                            updateLogEntry($thinkingLog, '暂无答案', 'red')

                            localStorage.setItem('GPTJsSetting.sub', false)
                            reject({ 'c': 0 })
                        }
                    } else if (xhr.status == 403) {
                        updateLogEntry($thinkingLog, '请求过于频繁，请稍后再试', 'red')
                        reject({ 'c': 403 })
                    } else if (xhr.status == 500) {
                        updateLogEntry($thinkingLog, 'ChatGPT官方服务器压力过大,请先保存答案后刷新重试', 'red')
                        reject({ 'c': 500 })
                    } else if (xhr.status == 444) {
                        updateLogEntry($thinkingLog, 'IP异常，已被拉入服务器黑名单，请过几个小时再试', 'red')
                        reject({ 'c': 444 })
                    } else if (xhr.status == 400) {
                        let obj = $.parseJSON(xhr.responseText) || {};
                        updateLogEntry($thinkingLog, obj.msg, 'red')
                        reject({ 'c': 400 })
                    } else if (xhr.status == 222) {
                        let obj = $.parseJSON(xhr.responseText) || {};
                        updateLogEntry($thinkingLog, "账户余额不足!", 'red')
                        reject({ 'c': 222 })
                    } else {
                        updateLogEntry($thinkingLog, '请求异常...,请先保存答案后刷新重试,仍然失败请尝试更换模型或联系售后', 'red')
                        reject({ 'c': 555 })
                    }
                },
                ontimeout: function () {

                    if (requestCompleted) {
                        return;
                    }

                    requestCompleted = true;
                    clearTimeout(longWaitTimer);

                    if (retryCount >= _maxRetries) {
                        updateLogEntry($thinkingLog, '已重试' + _maxRetries + '次仍超时，请刷新页面重试', 'red')
                        reject({ 'c': 666 })
                        return;
                    }
                    updateLogEntry($thinkingLog, '请求超时，正在自动重试...（第' + (retryCount + 1) + '次重试）', 'orange')
                    getAnswer(_t, _q, retryCount + 1).then(resolve).catch(reject)
                }
            });
        }, _waitMs);
    })
}

/* ==================== 破解版入口 getAnswer ==================== */
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
            return preserveWhitespace ? answer : answer.replace(/^[A-Z]\s*\n\s*/, '').trim();
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

function doWork(index, doms, dom) {
    var doc = getAccessibleFrameDocument(dom);
    if (!doc) {
        logger('测验框架暂不可访问，请等待加载完成后重试', 'orange');
        return;
    }
    $frame_c = $(doc);
    var TiMuList = $frame_c.find('.TiMu, .questionLi').filter(function () {
        return !$(this).parents('.TiMu, .questionLi').length;
    });
    if (!TiMuList.length) {
        logger('未找到测验题目，请检查页面是否加载完成', 'red');
        return;
    }
    $subBtn = $frame_c.find('.ZY_sub .btnSubmit, .btnBlueSubmit, #btnBlueSubmit').first();
    $saveBtn = $frame_c.find('.ZY_sub .btnSave, .btnGraySave, #btnGraySave').first();
    startDoWork(index, doms, 0, TiMuList, dom);
}

function startDoWork(index, doms, c, TiMuList, workFrame) {
    if (localStorage.getItem('GPTJsSetting.isPaused') === 'true') {
        setTimeout(() => { startDoWork(index, doms, c, TiMuList, workFrame); }, 3000);
        return;
    }
    if (c >= TiMuList.length) {
        finishDesktopWork(index, doms, workFrame);
        return;
    }
    var $item = $(TiMuList[c]);
    var info = getWorkQuestionType($item);
    _currentQuestionMeta = { index: c, total: TiMuList.length, typeName: info.typeName };
    runWorkQuestion($item, info, getWorkQuestionText($item), function () {
        setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList, workFrame); }, setting.time);
    });
}

function saveDesktopWork(doc, save) {
    return new Promise(function (resolve, reject) {
        var win = doc.defaultView, jq = win.jQuery || win.$;
        var $events = jq && jq(doc);
        var timer;
        function finish(error) {
            clearTimeout(timer);
            if ($events) $events.off('.ne21WorkSave');
            if (error) reject(error); else resolve();
        }
        if (!$events || !$events.on) return reject(new Error('无法监听暂存结果，请手动检查'));
        $events.on('ajaxSuccess.ne21WorkSave ajaxError.ne21WorkSave', function (event, xhr, settings, data) {
            if (!settings || !/\/work\/(?:addStudentWork|save|tempSave)/i.test(settings.url || '')) return;
            if (event.type === 'ajaxError') return finish(new Error('测验暂存请求失败，请手动检查'));
            try {
                var result = data || xhr.responseJSON || JSON.parse(xhr.responseText);
                if (result.status === true || result.status === 1) finish();
                else finish(new Error(result.msg || '测验暂存失败，请手动检查'));
            } catch (error) { finish(error); }
        });
        timer = setTimeout(function () { finish(new Error('暂存结果确认超时，请手动检查')); }, 20000);
        try { Promise.resolve(save()).catch(finish); } catch (error) { finish(error); }
    });
}

function continueDesktopWork(index, doms) {
    _mlist.splice(0, 1);
    _domList.splice(0, 1);
    setTimeout(() => { startDoCyWork(index + 1, doms); }, 2000);
}

function getDesktopWorkConfirmPopups(doc) {
    var popups = [], current = doc && doc.defaultView
    while (current) {
        try {
            current.document.querySelectorAll('#workpop, #confirmSubWin').forEach(function (popup) {
                if (/确认提交/.test(popup.textContent || '')) popups.push(popup)
            })
            if (current === current.parent) break
            current = current.parent
        } catch (_) { break }
    }
    return popups
}

function closeDesktopWorkConfirmPopups(doc, popups) {
    popups.concat(getDesktopWorkConfirmPopups(doc)).forEach(function (popup) {

        try {
            if (/确认提交/.test(popup.textContent || '')) popup.style.display = 'none'
        } catch (_) {}
    })
}

async function finishDesktopWork(index, doms, workFrame) {
    var stage = '准备提交';
    try {
        var doc = $frame_c[0], win = doc && doc.defaultView;
        if (!win) throw new Error('测验页面已被替换，请重新进入测验后重试');

        var frame = workFrame || win.frameElement;
        var initialStatus = $frame_c.find('.testTit_status').text();
        var initialDone = $(frame).parent().hasClass('ans-job-finished');
        var submit = localStorage.getItem('GPTJsSetting.sub') === 'true' || localStorage.getItem('GPTJsSetting.force') === 'true';
        if (!submit) {
            stage = '暂存';
            await saveDesktopWork(doc, function () {
                if (typeof win.noSubmit === 'function') return win.noSubmit();
                if ($saveBtn.length) return $saveBtn[0].click();
                throw new Error('未找到保存入口，请手动保存');
            });
            logger('暂存成功，继续处理下一项任务；此测验仍待提交', 'orange');
            continueDesktopWork(index, doms);
            return;
        }
        stage = '打开提交确认窗口';
        if (typeof win.btnBlueSubmit === 'function') await win.btnBlueSubmit();
        else if ($subBtn.length) $subBtn[0].click();
        else throw new Error('未找到提交入口，请手动提交');
        await new Promise(resolve => { setTimeout(resolve, 1500); });
        var confirmPopups = getDesktopWorkConfirmPopups(doc);
        var $confirm = $frame_c.find('#confirmSubWin a.bluebtn, #submitCheckTimes, .submitCheckTimes').first();
        stage = '确认提交';
        var confirmAccessError = false, inaccessibleResult = false;
        try {
            if (typeof win.submitCheckTimes === 'function') await win.submitCheckTimes();
            else if ($confirm.length) $confirm[0].click();
            else throw new Error('未找到确认提交入口，请手动检查提交状态');
        } catch (error) {
            if (!isCrossOriginAccessError(error)) throw error;

            confirmAccessError = true;
            console.warn('[GPTJs] 确认提交入口发生跨域访问，继续检查提交结果', error);
        }
        stage = '检查提交结果';

        for (var attempts = 0; attempts < 20; attempts++) {
            var currentDoc = frame ? getAccessibleFrameDocument(frame) : doc;
            if (!currentDoc) inaccessibleResult = true;
            var status = currentDoc ? $(currentDoc).find('.testTit_status').text() : '';
            var frameDone = $(frame).parent().hasClass('ans-job-finished');
            var changed = (currentDoc && currentDoc !== doc) || (currentDoc && status !== initialStatus) || frameDone !== initialDone;
            if (changed && (/已完成|待批阅/.test(status) || frameDone)) {
                closeDesktopWorkConfirmPopups(currentDoc, confirmPopups);
                logger('测验已提交：' + (status || '任务点已完成'), 'green');
                continueDesktopWork(index, doms);
                return;
            }
            await new Promise(resolve => { setTimeout(resolve, 1000); });
        }
        var reason = confirmAccessError ? '确认提交入口受到跨域限制，尚未确认提交结果' :
            inaccessibleResult ? '提交后测验框架暂不可访问，尚未确认提交结果' : '尚未确认提交结果';
        logger(reason + '，请手动检查；脚本已暂停此测验，不会重复提交', 'orange');
    } catch (error) {
        console.warn('[GPTJs] 测验' + stage + '失败', error);
        logger(isCrossOriginAccessError(error) ? '测验' + stage + '受到跨域限制，已暂停自动操作，请手动检查提交状态' :
            error.message || '测验保存或提交失败，请手动检查', 'red');
    }
}

function switchMission() {
    _mlist.splice(0, 1)
    _domList.splice(0, 1)
    setTimeout(missonStart, 5000)
}

function tidyStr(s) {
    if (s) {
        let str = s.replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').trim().replace(/&nbsp;/g, '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}

function tidyQuestion(s) {
    if (s) {
        let str = s.replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').replace(/^\d+[.、]/, '').trim().replace(/&nbsp;/g, '').replace('javascript:void(0);', '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}

function decryptFont() {
    var $tip = $('style:contains(font-cxsecret)');
    if (!$tip.length) return;
    var font = $tip.text().match(/base64,([\w\W]+?)'/)[1];
    font = Typr.parse(base64ToUint8Array(font))[0];
    var table = JSON.parse(GM_getResourceText('Table'));
    var match = {};
    for (var i = 19968; i < 40870; i++) {
        $tip = Typr.U.codeToGlyph(font, i);
        if (!$tip) continue;
        $tip = Typr.U.glyphToPath(font, $tip);
        $tip = md5(JSON.stringify($tip)).slice(24);
        match[i] = table[$tip];
    }
    $('.font-cxsecret').html(function (index, html) {
        $.each(match, function (key, value) {
            key = String.fromCharCode(key);
            key = new RegExp(key, 'g');
            value = String.fromCharCode(value);
            html = html.replace(key, value);
        });
        return html;
    }).removeClass('font-cxsecret');
}

function base64ToUint8Array(base64) {
    var data = window.atob(base64);
    var buffer = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
        buffer[i] = data.charCodeAt(i);
    }
    return buffer;
}
