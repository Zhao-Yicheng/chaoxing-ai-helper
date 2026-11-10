/* Shared by the recharge page and userscript. No verification UI is created before a CAPTCHA response. */
var GptRequestGuard = (function () {
    'use strict';
    var memoryClientId;
    var dialogId = 'gpt-request-verification';

    function clientId() {
        if (memoryClientId) return memoryClientId;
        try { memoryClientId = localStorage.getItem('gptjs.guardClientId'); } catch (_) {}
        if (!/^[a-f0-9]{32}$/.test(memoryClientId || '')) {
            var bytes = new Uint8Array(16);
            crypto.getRandomValues(bytes);
            memoryClientId = Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
            try { localStorage.setItem('gptjs.guardClientId', memoryClientId); } catch (_) {}
        }
        return memoryClientId;
    }

    function cancelled() {
        var error = new Error('验证已取消，可重新点击验证后继续。');
        error.code = 'CAPTCHA_CANCELLED';
        return error;
    }

    function bodyOf(error) {
        return error && error.response && error.response.data || {};
    }

    function isChallenge(body) {
        return (body.code === 'CAPTCHA_REQUIRED' || body.code === 'CAPTCHA_INVALID')
            && body.captcha && /^[a-f0-9]{32}$/.test(body.captcha.id)
            && /^data:image\/png;base64,/.test(body.captcha.image)
            && body.captcha.image.length < 256000;
    }

    function ownerDocument() {
        try { return window.top.document; } catch (_) { return document; }
    }

    function waitForExisting(dialog, signal) {
        return new Promise(function (resolve, reject) {
            function cleanup() {
                dialog.removeEventListener('gptguardclose', done);
                if (signal) signal.removeEventListener('abort', abort);
            }
            function done() {
                cleanup();
                if (dialog.dataset.outcome === 'cancelled') reject(cancelled());
                else resolve();
            }
            function abort() { cleanup(); reject(cancelled()); }
            dialog.addEventListener('gptguardclose', done);
            if (signal) {
                if (signal.aborted) abort();
                else signal.addEventListener('abort', abort, { once: true });
            }
        });
    }

    function createPrompt(doc, options, headers) {
        if (!doc.getElementById('gpt-request-verification-style')) {
            var style = doc.createElement('style');
            style.id = 'gpt-request-verification-style';
            style.textContent = [
                '#gpt-request-verification{box-sizing:border-box;width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 32px);margin:auto;padding:28px;border:0;border-radius:24px;color:#1d1d1f;background:#fff;box-shadow:0 24px 80px #0003;font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;overflow:auto;}',
                '#gpt-request-verification::backdrop{background:#0006;}',
                '#gpt-request-verification *{box-sizing:border-box;}',
                '#gpt-request-verification h2{margin:0 28px 8px 0;font-size:22px;font-weight:600;line-height:1.4;color:#1d1d1f;}',
                '#gpt-request-verification p{margin:8px 0 16px;color:#6e6e73;font-size:13px;}',
                '#gpt-request-verification .guard-close{position:absolute;right:18px;top:18px;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:#f5f5f7;color:#6e6e73;font:22px/1 sans-serif;cursor:pointer;}',
                '#gpt-request-verification .guard-image-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:20px 0 16px;}',
                '#gpt-request-verification img{display:block;width:210px;max-width:calc(100% - 64px);height:auto;border-radius:12px;}',
                '#gpt-request-verification .guard-refresh{flex-shrink:0;padding:6px 0;border:0;color:#0071e3;background:transparent;font:inherit;font-size:12px;line-height:1.5;cursor:pointer;}',
                '#gpt-request-verification label{display:block;margin:0 0 6px;font-size:12px;color:#515154;}',
                '#gpt-request-verification input{display:block;width:100%;height:48px;padding:0 14px;border:1px solid #c8c8cd;border-radius:12px;background:#fff;color:#1d1d1f;font:inherit;font-size:18px;line-height:1.5;letter-spacing:4px;text-transform:uppercase;}',
                '#gpt-request-verification input:focus{border-color:#0071e3;outline:3px solid #0071e326;}',
                '#gpt-request-verification .guard-error{min-height:22px;margin:8px 0 12px;color:#b42318;font-size:12px;line-height:1.6;}',
                '#gpt-request-verification .guard-submit{display:block;width:100%;height:46px;padding:0 16px;border:0;border-radius:99px;background:#0071e3;color:#fff;font:inherit;font-size:14px;line-height:1.5;cursor:pointer;}',
                '#gpt-request-verification button:disabled{opacity:.55;cursor:wait;}',
                '#gpt-request-verification button:focus-visible{outline:3px solid #0071e366;outline-offset:3px;}',
                '#gpt-request-verification .guard-note{margin:12px 0 0;text-align:center;font-size:11px;}'
            ].join('\n');
            doc.head.appendChild(style);
        }
        var dialog = doc.createElement('dialog');
        dialog.id = dialogId;
        dialog.setAttribute('aria-labelledby', 'gpt-guard-title');
        dialog.setAttribute('aria-describedby', 'gpt-guard-description');
        dialog.innerHTML = '<button type="button" class="guard-close" aria-label="取消验证">×</button>'
            + '<h2 id="gpt-guard-title">请完成验证</h2>'
            + '<p id="gpt-guard-description">操作较频繁，输入图片中的字符后即可继续。</p>'
            + '<form novalidate><div class="guard-image-row"><img alt="验证码图片"><button type="button" class="guard-refresh">换一张</button></div>'
            + '<label for="gpt-guard-answer">图片验证码（不区分大小写）</label>'
            + '<input id="gpt-guard-answer" maxlength="5" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="gpt-guard-error">'
            + '<div id="gpt-guard-error" class="guard-error" role="alert"></div>'
            + '<button type="submit" class="guard-submit">验证并继续</button>'
            + '<p class="guard-note">验证码短时有效，请及时完成。</p></form>';
        // 放在当前收银台内部，使其焦点约束与原生验证码弹窗兼容。
        var container = Array.from(doc.querySelectorAll('.ep-dialog.payment-dialog')).find(function (element) {
            return element.getClientRects().length > 0;
        }) || doc.body;
        container.appendChild(dialog);
        var form = dialog.querySelector('form');
        var input = dialog.querySelector('input');
        var image = dialog.querySelector('img');
        var message = dialog.querySelector('.guard-error');
        var submit = dialog.querySelector('.guard-submit');
        var refresh = dialog.querySelector('.guard-refresh');
        var rejectWaiting;
        var closed = false;
        var wasCancelled = false;
        var currentCaptcha;
        var previousFocus = doc.activeElement;

        function busy(value) {
            input.disabled = submit.disabled = refresh.disabled = value;
            submit.textContent = value ? '验证中…' : '验证并继续';
            form.setAttribute('aria-busy', String(value));
        }
        function close(outcome) {
            if (closed) return;
            closed = true;
            wasCancelled = outcome === 'cancelled';
            if (options.signal) options.signal.removeEventListener('abort', cancel);
            if (wasCancelled && rejectWaiting) rejectWaiting(cancelled());
            dialog.dataset.outcome = outcome;
            dialog.close();
            dialog.dispatchEvent(new Event('gptguardclose'));
            dialog.remove();
            if (previousFocus && previousFocus.isConnected && previousFocus.focus) previousFocus.focus();
        }
        function cancel() { close('cancelled'); }
        dialog.querySelector('.guard-close').onclick = cancel;
        dialog.addEventListener('cancel', function (event) { event.preventDefault(); cancel(); });
        if (options.signal) options.signal.addEventListener('abort', cancel, { once: true });
        dialog.showModal();

        function update(body) {
            currentCaptcha = body.captcha;
            image.src = currentCaptcha.image;
            input.value = '';
            input.setAttribute('aria-invalid', String(body.code === 'CAPTCHA_INVALID'));
            message.textContent = body.code === 'CAPTCHA_INVALID' ? body.message : '';
            busy(false);
            input.focus();
        }

        return {
            isCancelled: function () { return wasCancelled; },
            close: close,
            ask: function (body) {
                if (closed || options.signal && options.signal.aborted) return Promise.reject(cancelled());
                update(body);
                return new Promise(function (resolve, reject) {
                    rejectWaiting = reject;
                    form.onsubmit = function (event) {
                        event.preventDefault();
                        if (submit.disabled) return;
                        var answer = input.value.trim().toUpperCase();
                        if (!/^[A-Z0-9]{5}$/.test(answer)) {
                            message.textContent = '请输入图片中的 5 位字符。';
                            input.setAttribute('aria-invalid', 'true');
                            input.focus();
                            return;
                        }
                        busy(true);
                        rejectWaiting = null;
                        resolve({ id: currentCaptcha.id, answer: answer });
                    };
                    refresh.onclick = async function () {
                        busy(true);
                        try {
                            var response;
                            try {
                                var result = await options.refresh(currentCaptcha.id, headers);
                                response = result.data || result;
                            } catch (error) {
                                response = bodyOf(error);
                                if (response.code === 'CAPTCHA_EXPIRED') {
                                    rejectWaiting = null;
                                    resolve({ retry: true });
                                    return;
                                }
                                if (!isChallenge(response)) throw error;
                            }
                            if (!closed && isChallenge(response)) update(response);
                            else if (!closed) throw new Error('暂时无法刷新验证码，请稍后重试。');
                        } catch (error) {
                            if (!closed) {
                                busy(false);
                                message.textContent = bodyOf(error).message || error.message || '暂时无法刷新验证码，请稍后重试。';
                            }
                        }
                    };
                });
            }
        };
    }

    async function withCaptcha(request, options) {
        options = options || {};
        var headers = { 'X-Client-Id': options.clientId || clientId() };
        var proof = {};
        var prompt;
        try {
            while (true) {
                if (options.signal && options.signal.aborted || prompt && prompt.isCancelled()) throw cancelled();
                try {
                    var result = await request(Object.assign({}, headers, proof));
                    if (prompt && prompt.isCancelled()) throw cancelled();
                    return result;
                } catch (error) {
                    if (prompt && prompt.isCancelled()) throw cancelled();
                    var body = bodyOf(error);
                    if (!error.response || error.response.status !== 429 || !isChallenge(body)) throw error;
                    var doc = ownerDocument();
                    var existing = doc.getElementById(dialogId);
                    if (!prompt && existing) {
                        await waitForExisting(existing, options.signal);
                        proof = {};
                        continue;
                    }
                    if (!prompt) prompt = createPrompt(doc, options, headers);
                    var answer = await prompt.ask(body);
                    proof = answer.retry ? {} : { 'X-Captcha-Id': answer.id, 'X-Captcha-Answer': answer.answer };
                }
            }
        } finally {
            if (prompt) prompt.close(prompt.isCancelled() ? 'cancelled' : 'completed');
        }
    }

    return { clientId: clientId, withCaptcha: withCaptcha, errorBody: bodyOf };
})();
