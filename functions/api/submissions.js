/**
 * Cloudflare Pages Function: /api/submissions
 * ===========================================
 * Handles student presentation submissions directly at the Cloudflare Edge.
 * Persists submissions to Cloudflare KV (env.COMMUNITY_SLIDES or env.SUBMISSIONS_KV).
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET: Retrieve list of community slide submissions
export async function onRequestGet(context) {
  const { env } = context;
  try {
    const kv = env.COMMUNITY_SLIDES || env.SUBMISSIONS_KV;
    if (kv) {
      const data = await kv.get('slides_list', { type: 'json' });
      return new Response(JSON.stringify(data || []), {
        headers: CORS_HEADERS,
      });
    }

    // Default response if KV is not yet bound
    return new Response(JSON.stringify([]), {
      headers: CORS_HEADERS,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

// POST: Add new student presentation submission
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const payload = await request.json();
    if (!payload || !payload.title || !payload.id) {
      return new Response(JSON.stringify({ error: 'Missing required presentation fields' }), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }

    const kv = env.COMMUNITY_SLIDES || env.SUBMISSIONS_KV;
    if (kv) {
      let list = await kv.get('slides_list', { type: 'json' }) || [];
      // Prepend and filter out existing duplicates
      list = [payload, ...list.filter(item => item.id !== payload.id)];
      // Keep up to 200 submissions
      if (list.length > 200) list = list.slice(0, 200);
      await kv.put('slides_list', JSON.stringify(list));
    }

    return new Response(JSON.stringify({ success: true, item: payload }), {
      status: 201,
      headers: CORS_HEADERS,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

// DELETE: Remove a submission by ?id=...
export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id query parameter' }), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }

    const kv = env.COMMUNITY_SLIDES || env.SUBMISSIONS_KV;
    if (kv) {
      let list = await kv.get('slides_list', { type: 'json' }) || [];
      list = list.filter(item => item.id !== id);
      await kv.put('slides_list', JSON.stringify(list));
    }

    return new Response(JSON.stringify({ success: true, deletedId: id }), {
      headers: CORS_HEADERS,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

// OPTIONS: Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
