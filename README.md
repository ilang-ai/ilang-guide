# ilang.guide

**iLang 官方指导站：怎么在你的 Agent 上用 iLang。** 一个宿主一页。人看页面，Agent 取 `.ilang.md` 孪生照做。

The official iLang guide site: how to set iLang up on your agent, one host per page. Humans read the page; agents take the `.ilang.md` twin and execute it.

- 站点：https://ilang.guide
- 第一个宿主：DeepSeek Harness → https://ilang.guide/dsh/ （孪生 https://ilang.guide/dsh.ilang.md ）
- 模型索引：https://ilang.guide/llms.txt

## 一页的结构

每个宿主页都是同一套：那句话 → 会发生什么 → 验收时刻 → 第一件事 → 更新 → 卸载 → 证据与版本 → 给 Agent。页面有 Markdown 孪生（同路径 `index.md`，或请求时带 `Accept: text/markdown`），还有一份 Agent 直接执行的 iLang 工程书孪生（`/<host>.ilang.md`）。

## 证据级别

只有三档，不写「已适配」：

| 级别 | 含义 |
|---|---|
| 实测 | 维护者在真机上走通并记下日期 |
| 用户回报 | 真实用户走通 |
| 待实测 | 还没人走通，不上页面 |

## 目录

```
index.html          首页（滚动驱动的五幕）
index.md            首页 Markdown 孪生
dsh/index.html      DeepSeek Harness 宿主页
dsh/index.md        宿主页 Markdown 孪生
dsh.ilang.md        宿主页 Agent 孪生（iLang 工程书，--strict 0 错 0 警告）
llms.txt            给模型的站点索引
assets/             样式、脚本、品牌图
functions/          Cloudflare Pages Functions：Accept: text/markdown 协商
_headers _routes.json robots.txt sitemap.xml
```

本地预览：`npx wrangler pages dev .`（功能与头字段都生效）。部署：Cloudflare Pages。

## 相关

- iLang 官网 https://ilang.ai ，中文 https://ilang.cn ，正典 https://github.com/ilang-ai/ilang-spec
- 国内镜像 https://ilang.cn/guide/ ：备案域名，微信、QQ 里分享用它；由 ilang.cn 的构建脚本从本仓库生成，canonical 指回本站
- DeepSeek Harness 一键包 https://github.com/adsorgcn/DeepSeekHarness （国内镜像 https://gitee.com/monetize/DeepSeekHarness ）

MIT © 2026 iLang Inc.
