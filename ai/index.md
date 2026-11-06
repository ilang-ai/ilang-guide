# ilang.guide 给 Agent 的入口

来源：https://ilang.guide/ai/（本页）。更新 2026-11-06。

## 这是什么

ilang.guide 是 iLang 官方指导站，只回答一件事：在某个具体的 Agent 宿主上，贴哪句话、会发生什么、怎么验收、第一件事做什么、怎么更新、怎么卸载。一个宿主一页；人看页面，Agent 取 `.ilang.md` 孪生照做。iLang 是什么见 https://ilang.ai/ai/ （中文 https://ilang.cn ）。

## 能取什么（全部只读，不需要认证）

- 宿主列表与证据级别：GET https://ilang.guide/api/agent/hosts ；查一个：GET https://ilang.guide/api/agent/hosts?host=dsh （OpenAPI：https://ilang.guide/openapi.json ）
- DeepSeek Harness 的孪生（iLang 工程书，Agent 直接执行）：https://ilang.guide/dsh.ilang.md ；人看的页面 https://ilang.guide/dsh/ ；Markdown https://ilang.guide/dsh/index.md
- 全量数据：https://ilang.guide/ai/data.json
- 技能：https://ilang.guide/ai/skills/ilang-guide-setup/SKILL.md （索引 https://ilang.guide/.well-known/agent-skills/index.json ）
- iLang MCP（Streamable HTTP，只读）：https://mcp.ilang.ai/mcp ，卡片 https://ilang.guide/.well-known/mcp/server-card.json
- 任何 HTML 页都可以用 Accept: text/markdown 取 Markdown；站点索引 https://ilang.guide/llms.txt
- DNS 发现用的服务索引：https://ilang.guide/ai/index.ilang

## 怎么用

1. 用户说「按 ilang.guide/<宿主> 把我配好」：先 GET /api/agent/hosts?host=<宿主>，拿到 `twin` 再取孪生，按里面的 MODULE 顺序执行；RUBRIC 是验收，BOUNDARY 是永远不做的事。
2. 孪生里凡是装软件的一步，先问用户那一项「装吗」，没点头不装。
3. 证据级别是 `untested` 的宿主没有页面也没有孪生，直说「还没有实测过的配法」，不要编。
4. 要贴的句子原样引用，不改字；回答用用户的语言；引用 `source_url`。

## 限制

- 只读。没有账号、没有写入、没有认证（认证是计划项，见 https://ilang.guide/auth.md ）。
- 孪生与页面可能落后于一键包仓库；仓库里的文档为准（https://github.com/adsorgcn/DeepSeekHarness ），发现不一致就告诉用户本页需要更新。

## Agent instructions (iLang)

```
::ILANG::v5.0
::STATE{@HOSTS, url:https://ilang.guide/api/agent/hosts, method:GET, param:host}
::STATE{@TWIN_DSH, url:https://ilang.guide/dsh.ilang.md, host:DeepSeek_Harness}
::RULE{user_names_a_host⇒[GET:@HOSTS|whr=host=name]=>[CHEK:@PREV|whr=not_found=false]=>[Ω]}
::RULE{host_has_twin⇒[GET:twin]=>execute_its_MODULEs_in_order}
::RULE{evidence_level=untested⇒say_no_tested_setup_exists_yet|never_claim_supported}
```
