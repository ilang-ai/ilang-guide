import { loadData, findHosts, json } from '../../_lib.js';
// GET /api/agent/hosts            -> every host with its evidence level
// GET /api/agent/hosts?host=dsh   -> one host by id, name or alias (not_found=true when none)
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const data = await loadData(env, url.origin);
  const q = url.searchParams.get('host') || '';
  const hosts = findHosts(data, q);
  return json({ query: q || null, updated: data.updated, evidence_levels: data.evidence_levels, count: hosts.length, not_found: hosts.length === 0, hosts });
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' } }); }
