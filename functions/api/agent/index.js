import { json } from '../../_lib.js';
// /api/agent is the anchor of the API in /.well-known/api-catalog; answer it with an index instead of the 404 page.
export async function onRequestGet({ request }) {
  const origin = new URL(request.url).origin;
  return json({
    name: 'ilang.guide host guide API',
    description: '只读。按宿主查「怎么在这个 Agent 上用 iLang」：证据级别、要贴的句子、页面与 Agent 孪生。不需要认证。',
    openapi: origin + '/openapi.json',
    docs: origin + '/ai/',
    endpoints: {
      hosts: origin + '/api/agent/hosts',
      host: origin + '/api/agent/hosts?host=dsh',
      health: origin + '/api/agent/health'
    },
    twins: { dsh: origin + '/dsh.ilang.md' },
    mcp: 'https://mcp.ilang.ai/mcp'
  });
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' } }); }
