/**
 * Standalone Cloudflare Worker for EduSphere Student Submissions
 * ==============================================================
 * Deploy via Wrangler CLI or Cloudflare Dashboard:
 *   npx wrangler deploy
 * 
 * Bindings needed in wrangler.toml or Cloudflare dashboard:
 *   [[kv_namespaces]]
 *   binding = "COMMUNITY_SLIDES"
 *   id = "<your-kv-namespace-id>"
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const kv = env.COMMUNITY_SLIDES || env.SUBMISSIONS_KV;

    // GET /api/submissions or GET /
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

    // POST /api/submissions or POST /
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

    // DELETE /api/submissions?id=...
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
  },
};
