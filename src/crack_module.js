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
var CRACK_SEED = __SEED__;

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


