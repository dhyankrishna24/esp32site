/**
 * Cloudflare Pages & Workers Advanced Mode Handler
 * ==================================================
 * Handles:
 * 1. /artcraft/* -> Serves from Cloudflare R2 bucket (Zero egress fees, up to 5 TB files)
 *                   with automatic transparent fallback to GitHub Pages CDN.
 * 2. /api/submissions -> KV submissions API for student slide decks
 * 3. * -> Serves static website assets (HTML, CSS, JS, fonts, ESP32)
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function getMimeType(path) {
  const ext = path.split('.').pop().toLowerCase();
  switch (ext) {
    case 'wasm': return 'application/wasm';
    case 'js':   return 'application/javascript';
    case 'html': return 'text/html; charset=utf-8';
    case 'json': return 'application/json';
    case 'css':  return 'text/css';
    case 'png':  return 'image/png';
    case 'svg':  return 'image/svg+xml';
    case 'zip':  return 'application/zip';
    default:     return 'application/octet-stream';
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route API requests: /api/submissions
    if (url.pathname.startsWith('/api/submissions') || url.pathname === '/api') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }

      const kv = env.COMMUNITY_SLIDES || env.SUBMISSIONS_KV;

      if (request.method === 'GET') {
        try {
          if (kv) {
            const list = await kv.get('slides_list', { type: 'json' });
            return new Response(JSON.stringify(list || []), { headers: CORS_HEADERS });
          }
          return new Response(JSON.stringify([]), { headers: CORS_HEADERS });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
        }
      }

      if (request.method === 'POST') {
        try {
          const payload = await request.json();
          if (!payload || !payload.title || !payload.id) {
            return new Response(JSON.stringify({ error: 'Missing required presentation fields' }), {
              status: 400,
              headers: CORS_HEADERS,
            });
          }

          if (kv) {
            let list = await kv.get('slides_list', { type: 'json' }) || [];
            list = [payload, ...list.filter(item => item.id !== payload.id)];
            if (list.length > 200) list = list.slice(0, 200);
            await kv.put('slides_list', JSON.stringify(list));
          }

          return new Response(JSON.stringify({ success: true, item: payload }), {
            status: 201,
            headers: CORS_HEADERS,
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
        }
      }

      if (request.method === 'DELETE') {
        try {
          const id = url.searchParams.get('id');
          if (!id) {
            return new Response(JSON.stringify({ error: 'Missing id query parameter' }), {
              status: 400,
              headers: CORS_HEADERS,
            });
          }

          if (kv) {
            let list = await kv.get('slides_list', { type: 'json' }) || [];
            list = list.filter(item => item.id !== id);
            await kv.put('slides_list', JSON.stringify(list));
          }

          return new Response(JSON.stringify({ success: true, deletedId: id }), {
            headers: CORS_HEADERS,
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
        }
      }

      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: CORS_HEADERS,
      });
    }

    // ArtCraft WebAssembly Suite: Route /artcraft/*
    if (url.pathname.startsWith('/artcraft/')) {
      const key = url.pathname.replace(/^\/+/, ''); // e.g. "artcraft/apps/deckcraft/index.html"

      // 1. Primary: If Cloudflare R2 bucket is bound, serve directly from R2 at the edge!
      const r2 = env.ARTCRAFT_BUCKET || env.R2_BUCKET;
      if (r2) {
        try {
          const object = await r2.get(key);
          if (object) {
            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set('etag', object.httpEtag);
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
            headers.set('Content-Type', getMimeType(key));

            // High-performance WebAssembly headers (COOP / COEP for SharedArrayBuffer)
            headers.set('Cross-Origin-Opener-Policy', 'same-origin');
            headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

            return new Response(object.body, { headers });
          }
        } catch (err) {
          console.warn('[R2 Edge] Object read error, falling back to upstream CDN:', err);
        }
      }

      // 2. Fallback: Stream directly from GitHub Pages CDN
      const upstreamUrl = 'https://dhyankrishna24.github.io/esp32site' + url.pathname;
      const upstreamRes = await fetch(upstreamUrl, {
        method: request.method,
        headers: request.headers,
      });

      // Pass through response with proper CORS & security headers
      const resHeaders = new Headers(upstreamRes.headers);
      resHeaders.set('Access-Control-Allow-Origin', '*');
      if (key.endsWith('.wasm')) {
        resHeaders.set('Content-Type', 'application/wasm');
      }
      return new Response(upstreamRes.body, {
        status: upstreamRes.status,
        headers: resHeaders,
      });
    }

    // Static Assets fallback for Cloudflare Pages and Workers
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
