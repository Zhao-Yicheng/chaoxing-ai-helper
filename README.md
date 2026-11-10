# 学习通AI答题助手 · 免积分破解版 🚀

> 学习通 / 超星 / 学银在线等平台的 **刷课 + 刷题** 自动化助手。
> 原版按积分计费（1 题 1 分，充值才能用），本版本把计费逻辑打穿：**答题 0 消耗，不用充一分钱**。
>
> 基于 Ne-21《ChatGPT学习通作业考试助手》v3.2.9 改造。

<p align="left">
  <img alt="version" src="https://img.shields.io/badge/version-3.2.10-059669">
  <img alt="platform" src="https://img.shields.io/badge/platform-Chrome%20%7C%20Edge%20%7C%20Firefox-2563eb">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-black">
  <img alt="cost" src="https://img.shields.io/badge/%E7%A7%AF%E5%88%86%E6%B6%88%E8%80%97-0-ef4444">
</p>

---

# 🌟 核心特性

| 能力 | 说明 |
|---|---|
| 🎬 **刷课** | 视频自动播放/倍速/静音、音频智能挂机（支持补挂时长）、文档任务自动完成 |
| 📝 **刷题** | 作业、测验、考试自动读题 → AI 生成答案 → 自动填选 → 自动提交 |
| 🧠 **全题型** | 单选 / 多选 / 判断 / 填空 / 简答 / 复合题（大题带小题）全支持 |
| 💸 **免积分破解** | `u=0` 免费通道 + 后台自动铸号，答题不扣积分，无需充值 |
| 📱 **多端适配** | PC 端与手机端学习通页面（含各校 `*.edu.cn` 镜像站） |
| 🛡️ **防挂机** | 劫持 `onblur` / `visibilitychange` / `document.hasFocus`，切屏不中断刷课 |

---

# 🛠️ 主要功能

## 🎬 刷课（视频 / 音频 / 文档）

- **视频**：自动开始、自动倍速、自动静音、弹题自动作答、播完自动跳下一个
- **音频**：智能挂机，**支持补挂时长**（原来没挂够的任务点会自动补齐）
- **文档**：自动浏览、自动翻页、到时长自动完成
- **防检测**：拦截失焦 / 页面隐藏事件，后台挂课不被判定

## 📝 刷题（作业 / 测验 / 考试）

- 自动读取题干与选项，按题型构造提示词
- AI 返回答案后自动勾选 / 填空
- 支持「暂存」与「提交」两种模式，考试可设置自动交卷
- 答题间隔可调（默认 2.5 秒），避免触发平台频率限制
- 每题都带日志：题目、AI 思考、答案、结果一目了然

## 💸 破解（本仓库的重点）

原版逻辑：`POST /api/v1/cx` 每次答题扣 1 积分，没分就提示「账户余额不足，请充值」。
本版本从三个层面绕过了计费：

| 漏洞 | 实测结论 |
|---|---|
| **`u=0` 不计费** | 计费分支只对 `uid > 0` 生效，传 `0` 直接返回答案（每 IP 约 20 次免费额度） |
| **新号送 20 分** | 新 UID 首次查 `/api/v1/auth` 自动注册并赠 20 积分（1 题 1 分） |
| **UID 不绑 IP** | 注册出来的号在任何网络下都能答题 → 只需在**注册**环节换 IP |

于是脚本这样拿答案：

```
答题请求
   ├─ ① 免费通道 u=0        有额度就白拿（用完冷却 30 分钟）
   ├─ ② 账号池              已有号直连答题，1~4 秒出答案
   ├─ ③ 现铸一个号          每题先试一次注册，失败自动回落 ②
   └─ ④ 全挂               回退原版逻辑（用你自己的积分）
        └─ 后台 Keeper：15s 心跳，池内积分低于 200 就并发铸号
              （直连 + cors.eu.org + allorigins + cors.lol）
```

- 注册额度按出口 IP 计，脚本用**公共 CORS 中转**换 IP 铸号
- 中转 429 → 冷却 3 分钟；超时/408 → 1.5 分钟；5xx → 2 分钟；该 IP 已领过 → 10 分钟
- 单轮失败退避 27s → 49s → 87s（上限 2 分钟），成功即复位
- 75s 看门狗 + 跨 iframe 互斥，保证补池不会卡死
- **仓库内不写死任何账号**，全靠运行时自己建池

细节见 [工作原理](docs/05-工作原理.md)。

---

# 📦 两种安装方式，选一个

| 方式 | 适合谁 | 优点 | 缺点 |
|---|---|---|---|
| **A. 油猴脚本**（Tampermonkey / ScriptCat） | 已经装过脚本管理器 | 单文件、支持自动更新 | 需要先装管理器 |
| **B. 浏览器扩展** | 不想多装东西、怕粘贴出错 | 解压加载即可，依赖全内置 | 需开"开发者模式" |

> ⚠️ **两者只能装一个**，同时装会重复注入，出现两套面板互相抢答题。

| 教程 | 链接 |
|---|---|
| 第一次用 | [01 · 快速开始](docs/01-快速开始.md) |
| 脚本版安装 | [02 · 脚本版安装教程](docs/02-脚本版安装教程.md) |
| 扩展版安装 | [03 · 扩展版安装教程](docs/03-扩展版安装教程.md) |
| 遇到问题 | [04 · 常见问题](docs/04-常见问题.md) |

---

# ⚡ 30 秒上手

## 脚本版

1. 浏览器装 **Tampermonkey** 或 **ScriptCat**
2. 下载 [`dist/chaoxing-ai-helper.user.js`](dist/chaoxing-ai-helper.user.js)
3. 脚本管理器 → **实用工具 → 从文件导入** → 选文件 → 安装
   （别用粘贴：280KB 会被编辑器截断，报 `Unexpected token ')'`）
4. 打开学习通任意页面，`F12` 控制台看到：

```
[CRACK] 账号池就绪: 0 个号（本次灌入 0 个种子），可用题目约 0 道
[CRACK] 后台补池已启动：目标 200 分，每 15s 心跳，不足时自动补充
[CRACK] keeper 心跳：池 0 个号 / 0 分，开始补
[CRACK] 铸号成功 [cors.eu.org/] 38372065 +20 分
```

## 扩展版

1. 下载 [`dist/chaoxing-ai-helper-extension.zip`](dist/chaoxing-ai-helper-extension.zip) 并**解压**
2. `chrome://extensions`（Edge 为 `edge://extensions`）
3. 开 **开发者模式** → **加载已解压的扩展程序** → 选解压出的文件夹
4. 刷新学习通页面

---

# 🚦 使用须知

- 推荐：Chrome / Edge（≥ 111）+ 保持脚本为最新版
- 第一次用建议把「答题间隔」调到 5 秒，观察 2~3 题正常后再加速
- 面板显示 `账号池：N 个号 / 约 M 道题（后台自动补充）· 补池中…`，数字会每 5 秒刷新
- **池内积分 ≥ 200 时 Keeper 不会铸号**（够用就不补），只每分钟打一条 `keeper 心跳：… 无需补充` 证明存活
- 免费通道和账号池都空时会回退原版逻辑，此时才可能看到「余额不足」提示 —— 等补池或换网络

---

# ❓ 常见问题速查

| 现象 | 处理 |
|---|---|
| 控制台 `账号池: 0 个号` 一直不涨 | 中转被限流；换网络（手机热点）最有效 |
| 「后台补池只跑了一次」 | 3.2.9 的 bug，升级到 3.2.10（15s 心跳 + 看门狗） |
| 提示「账户余额不足」 | 池子空了，等补号或换网络 |
| 答案出得慢（10s+） | 正在现铸账号，池子攒起来后是 1~4 秒 |
| 面板不出现 | 没刷新页面 / 域名不在匹配列表 / 浏览器 < 111（扩展版） |
| 想要 GPT-6.1 / Claude | 那些档位服务端强制月卡，免费路径进不去 |

完整版：[常见问题](docs/04-常见问题.md)

---

# 📁 目录结构

```
.
├─ dist/                              构建产物（发布用）
│  ├─ chaoxing-ai-helper.user.js      油猴脚本
│  ├─ chaoxing-ai-helper-extension/   扩展目录（未压缩）
│  └─ chaoxing-ai-helper-extension.zip
├─ src/
│  ├─ base/chaoxing-helper-3.2.9-original.js   原版脚本（未改动）
│  ├─ crack_module.js                          破解模块（核心：免费通道 + 铸号 + 补池）
│  ├─ libs/                                   内嵌依赖（jQuery / Swal / Typr / guard / 字体表）
│  ├─ build.py                                构建油猴脚本
│  └─ build_extension.py                      构建扩展
├─ docs/                              文档
└─ .github/workflows/build.yml        CI：语法检查 + 构建 + Release 资产
```

# 🔧 自己构建

```bash
python src/build.py             # → dist/chaoxing-ai-helper.user.js
python src/build_extension.py   # → dist/chaoxing-ai-helper-extension/{zip}
```

依赖 Python 3.9+（扩展图标需要 Pillow，缺失自动跳过）。

# ⚙️ 配置项

`src/crack_module.js` 顶部（构建后写入产物）：

```js
var CRACK = {
    enabled: true,            // 破解总开关，false = 原版扣费逻辑
    uid: '0',                 // 免费通道 UID
    freeModel: 'GPT-3.5',     // 免费档位（服务端映射 GPT-4.1 普通档）
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

浏览器控制台调试：

```js
JSON.parse(localStorage.getItem('gptjs_gm_chaoxing.com:GPTJsCrack.pool.v2') || '[]')  // 看池子
crackKeeperTick()                                                                     // 立刻补一轮
```

---

# 📜 免责声明

本项目仅用于**技术研究与学习**（Web 前端逆向、接口鉴权缺陷分析、浏览器扩展注入机制）。
自动化刷课/刷题可能违反学校规定与平台服务条款，**请自行评估风险**，使用造成的一切后果由使用者承担。
若你是服务提供方并希望下架相关内容，请提 Issue 说明。

原脚本版权归 Ne-21 所有，见 [LICENSE](LICENSE)。
