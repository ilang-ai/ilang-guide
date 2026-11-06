---
name: ilang-guide-setup
description: Set iLang up on the agent's own host from ilang.guide (one host per page, with an executable .ilang.md twin). Look the host up, read the twin, plan first, ask the user per item, verify, and never claim a host is supported without evidence.
license: MIT
metadata:
  site: https://ilang.guide
  version: "1.0.0"
  updated: "2026-11-06"
---

# ilang-guide-setup

Use this skill when the user asks to set iLang up on the agent they are using (for example "按 ilang.guide/dsh 把我配好", "set me up with iLang", "把 DSH 配好"), or asks which agent hosts have a tested iLang setup.

## Endpoints (no authentication)

- `GET https://ilang.guide/api/agent/hosts` lists every host with `evidence_level` (`tested_by_maintainers`, `user_reported`, `untested`), the page, the Markdown and the `twin` (an iLang engineering book the agent executes).
- `GET https://ilang.guide/api/agent/hosts?host=dsh` returns one host by id, name or alias; `not_found: true` when nothing matches.
- Twin for DeepSeek Harness: `https://ilang.guide/dsh.ilang.md`. Human page: `https://ilang.guide/dsh/`. Any page as Markdown: send `Accept: text/markdown`.
- Full data: `https://ilang.guide/ai/data.json`. Site index for models: `https://ilang.guide/llms.txt`.

## Instructions (iLang)

```
::ILANG::v5.0
::STATE{@HOSTS, url:https://ilang.guide/api/agent/hosts, method:GET, param:host}
::STATE{@TWIN_DSH, url:https://ilang.guide/dsh.ilang.md, host:DeepSeek_Harness}
::RULE{user_names_a_host⇒[GET:@HOSTS|whr=host=name]=>[CHEK:@PREV|whr=not_found=false]=>[Ω]}
::RULE{host_has_twin⇒[GET:twin]=>execute_its_MODULEs_in_order|RUBRIC_is_the_acceptance|BOUNDARY_is_never}
::RULE{twin_step_installs_software⇒ask_the_user_for_that_item_first|no_yes_no_install}
::RULE{evidence_level=untested⇒say_no_tested_setup_exists_yet|never_claim_supported}
::RULE{not_found=true⇒say_the_host_is_not_listed|never_invent_a_twin}
::RULE{answer⇒quote_sentences_to_paste_verbatim|answer_in_the_user_language|cite_source_url}
```

## Interpreting results

- `the_line` is the sentence the user pastes to the host; `first_sentence` is what to paste right after setup; `update_sentence` updates the engine without touching memory; `verify` is the acceptance moment.
- Only `tested_by_maintainers` and `user_reported` hosts have a page and a twin. An `untested` host has neither; say so.

## Edge cases

- The twin and the human page can drift from the kit repository; the kit's own docs (`一键安装.md`, `dsh-新手起手式.md` in https://github.com/adsorgcn/DeepSeekHarness) are the source of truth, and the page should be reported as needing an update.
- Nothing here needs credentials; authentication is planned only (https://ilang.guide/auth.md).
