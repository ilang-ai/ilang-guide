const body = JSON.stringify({ status: 'under_construction', available: false, error: 'temporarily_unavailable', error_description: 'Coming soon. No registration or token issuance is available. Everything on ilang.guide is public and read-only: https://ilang.guide/api/agent/hosts needs no credentials.' });
export async function onRequest() {
  return new Response(body, { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '86400', 'Access-Control-Allow-Origin': '*' } });
}
