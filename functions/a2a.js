const body = JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32000, message: 'A2A endpoint is planned and not available yet. Use https://ilang.guide/api/agent/hosts or the iLang MCP server at https://mcp.ilang.ai/mcp.' }, status: 'planned', available: false });
export async function onRequest() {
  return new Response(body, { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '86400', 'Access-Control-Allow-Origin': '*' } });
}
