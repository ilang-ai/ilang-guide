let cache = null;
export async function loadData(env, origin) {
  if (cache) return cache;
  const res = await env.ASSETS.fetch(new Request(origin + '/ai/data.json'));
  cache = await res.json();
  return cache;
}
export function norm(s) { return String(s || '').toLowerCase().replace(/[\s_-]+/g, '').trim(); }
export function findHosts(data, q) {
  const n = norm(q);
  const all = data.hosts.map(h => Object.assign({}, h, { source_url: h.page || 'https://ilang.guide/#hosts' }));
  if (!n) return all;
  return all.filter(h => norm(h.id) === n || norm(h.name) === n || (h.aliases || []).some(a => norm(a) === n) || norm(h.name).includes(n));
}
export function json(obj, status = 200, extra = {}) {
  const h = Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' }, extra);
  return new Response(JSON.stringify(obj), { status, headers: h });
}
