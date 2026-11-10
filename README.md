# 学习通 AI 答题助手（免积分版）

> 学习通 / 超星 / 学银在线等页面的 AI 自动答题助手。
> 本题库无需充值：**免费通道 + 后台自动铸号建池**，答题不消耗任何积分。
>
> 原脚本：Ne-21 《ChatGPT学习通作业考试助手》 v3.2.9，本仓库在其基础上做免积分改造与打包。

<p align="left">
  <img alt="version" src="https://img.shields.io/badge/version-3.2.10-059669">
  <img alt="platform" src="https://img.shields.io/badge/platform-Chrome%20%7C%20Edge%20%7C%20Firefox-2563eb">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-black">
</p>

---

## 这个项目是什么

在超星学习通（chaoxing.com / xuexitong.com 及一批高校镜像站）的作业、考试页面上，
悬浮一个面板，自动读题 → 调 AI 生成答案 → 自动填选 → 自动提交。

**关键点：不花钱。**

服务端的收费逻辑被绕过了：

| 漏洞 | 说明 |
|---|---|
| `u=0` 免费通道 | 答题接口 `POST /api/v1/cx` 只在 `uid > 0` 时扣费，传 `0` 直接出答案 |
| 新号送 20 积分 | 新 UID 首次查询 `/api/v1/auth` 自动注册并赠 20 分，1 题 1 分 |
| UID 不绑 IP | 注册出来的号可以在任何网络下答题 |
| 注册额度按 IP 算 | 换出口 IP 就能再开新号 → 脚本用公共 CORS 中转换 IP 自动铸号 |

一句话：**一个干净出口 IP = 一个 20 分新号 = 20 道题**，脚本在后台持续自己造号。

---

## 两种用法，选一个

| 方式 | 适合谁 | 优点 | 缺点 |
|---|---|---|---|
| **A. 油猴脚本**（Tampermonkey / ScriptCat） | 已经装过脚本管理器 | 单文件、更新方便 | 需要先装脚本管理器 |
| **B. 浏览器扩展** | 什么都不想装、怕粘贴出错 | 双击加载即可，依赖全打包 | 需要开"开发者模式" |

> ⚠️ **两者只能装一个**，同时装会重复注入，页面上会出现两套面板抢着答题。

两种方式的详细图解教程：

- 👉 [脚本版安装教程](docs/02-脚本版安装教程.md)
- 👉 [扩展版安装教程](docs/03-扩展版安装教程.md)
- 👉 [第一次用？从快速开始看起](docs/01-快速开始.md)

---

## 30 秒上手（脚本版）

1. 浏览器装 **Tampermonkey**（或 **ScriptCat**）。
2. 下载 [`dist/chaoxing-ai-helper.user.js`](dist/chaoxing-ai-helper.user.js)。
3. Tampermonkey 面板 → **实用工具 → 从文件导入** → 选这个文件 → 安装。
4. 打开学习通任意作业页，F12 控制台看到：

```
[CRACK] 账号池就绪: 0 个号（本次灌入 0 个种子），可用题目约 0 道
[CRACK] 后台补池已启动：目标 200 分，每 45s 检查一次
[CRACK] 铸号成功 [cors.eu.org/] 38372065 +20 分
```

就说明已经自己在造号了，等十几秒就能开刷。

## 30 秒上手（扩展版）

1. 下载 [`dist/chaoxing-ai-helper-extension.zip`](dist/chaoxing-ai-helper-extension.zip) 并**解压**到固定文件夹。
2. 地址栏输入 `chrome://extensions`（Edge 是 `edge://extensions`）。
3. 打开右上角 **开发者模式** → 点 **加载已解压的扩展程序** → 选中解压出来的文件夹。
4. 刷新学习通页面即可。

---

## 工作流程

```
答题请求 getAnswer()
   │
   ├─ ① 免费通道 u=0       有额度就白拿（额度耗尽后冷却 30 分钟，不再白等）
   ├─ ② 账号池             用已有号直连答题，1~4 秒出答案
   ├─ ③ 现铸一个号         每题先试一次注册（失败自动回落 ②）
   └─ ④ 全挂              回退脚本原版逻辑（用你自己的积分）
        │
        └─ 后台 Keeper：15s 一次心跳，池内积分低于 200 就并发铸号
              （直连 + cors.eu.org + allorigins + cors.lol，
                429 冷却 3 分钟 / 超时 1.5 分钟 / 5xx 冷却 2 分钟 / 0 分冷却 10 分钟）
              单轮失败自动退避 27s → 49s → 87s（上限 2 分钟），成功即复位
              单轮超过 75s 未结束会被看门狗强制复位，不会卡死
```

细节见 [工作原理](docs/05-工作原理.md)。

---

## 常见问题速查

| 现象 | 处理 |
|---|---|
| 控制台 `账号池: 0 个号`，等很久还是没有 | 公共中转被限流了，见 [FAQ](docs/04-常见问题.md) |
| 提示"账户余额不足" | 池子空了，等后台补号或换网络重开页面 |
| 答案出得慢（10s+） | 正在现铸账号，等一会儿会变快 |
| 面板不出现 | 没刷新页面 / 域名不在匹配列表 / 浏览器版本 < 111（扩展版） |
| 想要 GPT-6.1、Claude 等档位 | 那些档位服务端强制月卡，本破解版只能走 GPT-3.5（服务端映射 GPT-4.1 普通档） |

更多：[常见问题](docs/04-常见问题.md)

---

## 目录结构

```
.
├─ dist/                              构建产物（发布用）
│  ├─ chaoxing-ai-helper.user.js      油猴脚本
│  ├─ chaoxing-ai-helper-extension/   扩展目录（未压缩）
│  └─ chaoxing-ai-helper-extension.zip
├─ src/
│  ├─ base/chaoxing-helper-3.2.9-original.js   原版脚本（未改动）
│  ├─ crack_module.js                          破解模块（核心）
│  ├─ libs/                                   内嵌依赖（jQuery / Swal / Typr / guard / 字体表）
│  ├─ build.py                                构建油猴脚本
│  └─ build_extension.py                      构建扩展
├─ docs/                              文档
└─ .github/workflows/build.yml        CI：语法检查 + 构建产物
```

## 自己构建

```bash
python src/build.py             # → dist/chaoxing-ai-helper.user.js
python src/build_extension.py   # → dist/chaoxing-ai-helper-extension/{zip}
```

依赖：Python 3.9+（扩展图标需要 Pillow，缺失会自动跳过）。

## 配置项

在 `src/crack_module.js` 顶部（构建后会写进脚本）：

```js
var CRACK = {
    enabled: true,            // 破解总开关，false = 原版扣费逻辑
    uid: '0',                 // 免费通道 UID
    freeModel: 'GPT-3.5',     // 免费档位
    mint: true,               // 允许铸号
    mintFirst: true,          // 每题先试铸号，失败回落账号池
    mintCooldown: 10 * 60 * 1000,

    autoRefill: true,         // 后台自动补池
    poolTarget: 200,          // 池内积分低于此值就补
    keeperHeartbeat: 15000,   // 心跳间隔(ms)
    mintParallel: 2,          // 每轮并发中转数
    relayTimeout: 15000
};
```

浏览器控制台里可以随时查看：

```js
JSON.parse(localStorage.getItem('gptjs_gm_chaoxing.com:GPTJsCrack.pool.v2') || '[]')  // 池子
crackKeeperTick()                                                                     // 立刻补一轮
```

## 免责声明

本项目仅用于**技术研究与学习**（Web 前端逆向、接口鉴权缺陷分析、浏览器扩展注入机制）。
请勿用于任何违反学校规定或服务条款的用途，使用造成的一切后果由使用者自行承担。
若你是服务提供方并希望下架相关内容，请提 Issue 说明。
