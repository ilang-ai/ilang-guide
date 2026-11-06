// Markdown for agents: a GET with Accept: text/markdown (ranked at least as high as text/html) returns the page's
// Markdown twin (path/index.md or page.md) with a short I-Lang page_representation header. HTML responses get Vary: Accept.

function prefersMarkdown(accept) {
  let md = null, html = 0, htmlPos = Infinity;
  accept.split(',').forEach((part, pos) => {
    const [range, ...params] = part.trim().toLowerCase().split(';').map(s => s.trim());
    let q = 1;
    for (const p of params) if (p.startsWith('q=')) { const v = parseFloat(p.slice(2)); q = Number.isFinite(v) ? Math.min(Math.max(v, 0), 1) : 0; }
    if (range === 'text/markdown') { if (md === null || q > md.q) md = { q, pos }; }
    else if (range === 'text/html') { html = q; htmlPos = pos; }
    else if ((range === 'text/*' || range === '*/*') && htmlPos === Infinity) html = Math.max(html, q);
  });
  if (md === null || md.q <= 0) return false;
  return md.q > html || (md.q === html && md.pos < htmlPos);
}

const CANONICAL = 'https://ilang.guide';

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  // One site, one host: www and the Pages preview host send visitors to the canonical one, path and query kept.
  if (url.hostname === 'www.ilang.guide' || url.hostname.endsWith('.pages.dev')) return Response.redirect(CANONICAL + url.pathname + url.search, 301);
  const accept = request.headers.get('accept') || '';
  if (request.method === 'GET' && prefersMarkdown(accept)) {
    const p = url.pathname;
    const cands = p.endsWith('/') ? [p + 'index.md'] : p.endsWith('.html') ? [p.replace(/\.html$/, '.md')] : (/\.[a-z0-9]+$/i.test(p) ? [] : [p + '/index.md', p + '.md']);
    for (const md of cands) {
      const res = await env.ASSETS.fetch(new Request(new URL(md, url.origin).toString(), { method: 'GET' }));
      if (!res.ok) continue;
      const twin = await res.text();
      // A missing asset can come back as HTML; a twin always starts with a Markdown heading.
      if (/^\s*<(!doctype|html)/i.test(twin) || !/^\s*#/.test(twin)) continue;
      const canonical = url.origin + (p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : p + '/');
      const body = '::ILANG::v5.0\n[TYPE:page_representation][LANG:zh]\n\n::STATE{@SOURCE, url:' + canonical + '}\n::STATE{@ENTRY, url:' + url.origin + '/llms.txt}\n\n' + twin;
      const h = new Headers();
      h.set('Content-Type', 'text/markdown; charset=utf-8');
      h.set('Vary', 'Accept');
      h.set('x-markdown-tokens', String(Math.ceil(body.length / 4)));
      h.set('Cache-Control', 'public, max-age=0, must-revalidate');
      h.set('Content-Location', md);
      return new Response(body, { status: 200, headers: h });
    }
  }
  const res = await next();
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/html')) {
    const h = new Headers(res.headers);
    h.append('Vary', 'Accept');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  }
  return res;
}
