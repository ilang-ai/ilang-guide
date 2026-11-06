// /ai/ is the agent entry: the Markdown service doc, served as text/markdown.
export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const res = await env.ASSETS.fetch(new Request(u.origin + '/ai/index.md'));
  const body = await res.text();
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300', 'Vary': 'Accept' } });
}
