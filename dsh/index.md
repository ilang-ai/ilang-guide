# DeepSeek Harness：一句话，把 DSH 配好

证据级别：实测 2026-11-06（维护者真机走通）。宿主版本 DeepSeek Harness 0.2.2-rc.1（Developer Preview）。一键包 DeepSeekHarness v1.0.29。Windows、macOS、Linux。

你只做两件事：粘贴、点头。其余全自动——装环境先问你，放好全套，问几个问题认识你。软件只从官方源装；默认本机模式，什么都不上传。

Agent 孪生（iLang 工程书）：https://ilang.guide/dsh.ilang.md

## 01 那句话

在任意 DSH 会话里，把下面这句原样贴给它：

> 帮我把 https://github.com/adsorgcn/DeepSeekHarness 装成本地 DSH 全套：先按我的系统下载并运行仓库里的 bootstrap.ps1（Windows）或 bootstrap.sh（macOS、Linux），打不开 GitHub 就从 https://gitee.com/monetize/DeepSeekHarness 取同名文件；它默认只检测，缺什么软件列给我，逐个征得我同意后再从官方源安装；装完告诉我以后每个新窗口怎么一句话回到这里。

Windows 走 bootstrap.ps1，macOS 与 Linux 走 bootstrap.sh，由 DSH 按系统选。它默认只检测并打印计划，一个字节都不改；你点头之后才动手。

## 02 会发生什么

| 步骤 | 模式 |
|---|---|
| 检测环境（git / python / winget 有没有） | 自动，零改动 |
| 克隆仓库到本机、切进目录、AGENTS.md 注入、技能发现 | 自动 |
| brain.py check 验收、建立你的档案、写交接单 | 自动 |
| 安装 Git（git-scm.org 官方版） | 需审批：它问你「装吗？」，你点头才装 |
| 安装 Python 3.12（python.org 官方版） | 需审批：同上 |
| 其他一切动到系统的操作 | 一律先问 |

所有软件只从官方源安装：winget 官方包 id（Git.Git / Python.Python.3.12）；winget 不可用时给官方下载链接，你点一下。

## 03 验收时刻

关掉这个窗口，重开一个，把这个文件夹选成工作区，什么都不说；它第一句应该是汇报上次做到哪。看到了，就是装好了。没看到，就把屏幕上的内容贴给你的 DSH。再贴一张截图问它「这是什么」，它答得出，就是模型配好了。

## 04 第一件事

装好之后的第一句，永远是让它先去学 iLang：

> 先去读 https://runtime.ilang.app/ilang-latest.md（国内打不开就读 https://ilang.cn/runtime/ilang-latest.md），读完用三句话告诉我你学到了什么，再回来找我。

模型：新手就用 deepseek-flash——能看图、上下文 1M、便宜。Pro 更贵且不能看图，先不用。

> 去读 DeepSeek Harness 官方模型配置文档（docs/user/guide/providers.zh.md），然后帮我把模型配成 deepseek-flash，并用一句话告诉我为什么：它能看图、上下文 1M、便宜，新手够用；Pro 更贵且不能看图，先不用。需要我提供密钥就告诉我贴在哪；如果我是 DeepSeek 账号登录，就告诉我在模型选择里选 deepseek-flash 这一次就行。

之后只要记住：看图直接贴，想深一点说「认真想」。

## 05 更新与每个新窗口

- 把那个文件夹选为 DSH 工作区，开场自动汇报进度，零句话；
- 或一句话：`进我的记忆体目录，看看上次到哪了。`
- 更新引擎只认这句，它永远不碰你的记忆文件：`把 DeepSeekHarness 的引擎更新到最新，不要动我的记忆`

## 06 卸载

删掉那个文件夹，DSH 里把工作区换掉，就全没了。它装过的只有你点头同意过的 Git 和 Python，留着不碍事，要删也按官方方式删。

## 07 记忆存在哪 · 国内网络

默认本机模式：记忆只在你电脑的这个文件夹里，不需要 GitHub 账号，也什么都不上传。想换电脑接着用，再贴一句「把我的记忆体备份到我自己的私有仓库」，那时才需要 GitHub 账号和一个空的私有仓库。

连不上 GitHub 时：产品仓库自动切国内镜像 https://gitee.com/monetize/DeepSeekHarness （与 GitHub 同源）；iLang 官方资料自动切 https://ilang.cn 。克隆后自动装「记忆推送保护钩子」：私人记忆默认拦在本地不能推送，确认目标是你自己的私有仓库后才显式放行。

## 08 进阶：免费全家桶（可选）

不装也不影响记忆体。要装就贴这句，每件安装前先问你，全部官方源：

> 帮我装免费全家桶：先跑 tools/free_station.py plan 看缺什么，再逐个征得我同意后从官方源安装；装完告诉我每件怎么用。

- yt-dlp + FFmpeg：视频下载与转文字
- 视频转文字：贴链接或文件，出文字和字幕，本地跑，不上传（首次约 160MB 模型，装前问你）
- Obsidian：装好后直接打开记忆文件夹就是你的笔记金库
- 语音：零安装——DSH 自带语音输入（本地 SenseVoice），朗读用系统自带语音
- NotebookLM（海外）：零安装，需谷歌账号，国内网络打不开就跳过

## 09 遇到问题

发图片它说看不了？设置 → 模型 → 切到 deepseek-flash。flash 原生能读图，不用装任何插件。

装不上？这页在 DeepSeek Harness 0.2.2-rc.1 上验证，DSH 还是 Developer Preview，官方说可能有破坏性变更。把屏幕上的内容原样贴给你的 DSH，让它去读官方文档再告诉你下一步。

## 10 证据与版本

- 证据级别：实测 · 2026-11-06 · 维护者真机走通
- 宿主版本：DeepSeek Harness 0.2.2-rc.1
- 一键包版本：DeepSeekHarness v1.0.29 · DOI 10.5281/zenodo.23998664
- 仓库：https://github.com/adsorgcn/DeepSeekHarness
- 国内镜像：https://gitee.com/monetize/DeepSeekHarness
- 本页源：https://github.com/ilang-ai/ilang-guide

## 11 给 Agent

对你的 DSH 说：`按 ilang.guide/dsh 把我配好`。它会去读孪生 https://ilang.guide/dsh.ilang.md ，按里面的步骤先出计划、逐项问你、装完验收。
