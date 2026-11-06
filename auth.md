# auth.md

Status: under_construction. available=false. capabilities_status=planned_contract_only. launch_date=null.

Coming soon. Agent registration, authorization and token issuance for ilang.guide are planned and not available. Every endpoint referenced below returns HTTP 503 temporarily_unavailable, stores nothing, creates no account, issues no token and sends no email. Agents must not attempt registration or token exchange while available=false.

What works today without authentication:

- Host guide API: https://ilang.guide/api/agent/hosts and https://ilang.guide/api/agent/hosts?host=dsh (OpenAPI: https://ilang.guide/openapi.json)
- Executable twin for DeepSeek Harness: https://ilang.guide/dsh.ilang.md
- Agent entry page: https://ilang.guide/ai/
- iLang MCP server (read-only, no auth): https://mcp.ilang.ai/mcp (server card: https://ilang.guide/.well-known/mcp/server-card.json)

Planned contract (not live):

- Authorization Server metadata: https://ilang.guide/.well-known/oauth-authorization-server
- Protected Resource metadata: https://ilang.guide/.well-known/oauth-protected-resource (resource = https://ilang.guide)
- Registration: https://ilang.guide/agent-auth/register (identity type anonymous, credential type access_token, planned)
- Claim: https://ilang.guide/agent-auth/claim (planned)

Agent instructions (iLang):

```
::ILANG::v5.0
::STATE{@AUTH, status:under_construction, available:false}
::RULE{available=false⇒do_not_register_do_not_request_tokens}
::RULE{need_public_data⇒use_api_agent_hosts_without_credentials}
[READ:@AUTH_MD]=>[CHEK:@AUTH|whr=available=true]=>[Ω]
```
