/**
 * Cloudflare Worker with GitHub API Backend for EduSphere Platform
 * =================================================================
 * - Serves website static assets (HTML, CSS, JS, presentations) via env.ASSETS
 * - Integrates directly with GitHub Contents API at /api/submissions:
 *     GET  /api/submissions -> fetches submissions from repo without database
 *     POST /api/submissions -> commits new student presentation directly to repo
 *     DELETE /api/submissions -> removes a submission from repo
 * - ZERO Cloudflare KV, ZERO external databases, 100% inside your website.
 */

const GITHUB_REPO = 'dhyankrishna24/esp32site';
const GITHUB_BRANCH = 'main';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function toBase64(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  return decodeURIComponent(escape(atob(str)));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route API requests: /api/submissions
    if (url.pathname.startsWith('/api/submissions') || url.pathname === '/api') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }

      const token = env.GITHUB_TOKEN;
      const ghHeaders = {
        'User-Agent': 'EduSphere-Platform',
        'Accept': 'application/vnd.github+json',
      };
      if (token) {
        ghHeaders['Authorization'] = `Bearer ${token}`;
      }

      // GET: Retrieve list of community slide submissions from GitHub repo
      if (request.method === 'GET') {
        try {
          const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/submissions?ref=${GITHUB_BRANCH}`, {
            headers: ghHeaders,
          });

          if (ghRes.ok) {
            const files = await ghRes.json();
            if (Array.isArray(files)) {
              const jsonFiles = files.filter(f => f.name.endsWith('.json'));
              const items = await Promise.all(jsonFiles.map(async (file) => {
                try {
                  const rawRes = await fetch(file.download_url);
                  if (rawRes.ok) return await rawRes.json();
                } catch (e) {}
                return null;
              }));
              const validItems = items.filter(Boolean);
              return new Response(JSON.stringify(validItems), {
                headers: {
                  ...CORS_HEADERS,
                  'Cache-Control': 'public, max-age=30, s-maxage=60',
                },
              });
            }
          }
          return new Response(JSON.stringify([]), { headers: CORS_HEADERS });
        } catch (err) {
          return new Response(JSON.stringify([]), { headers: CORS_HEADERS });
        }
      }

      // POST: Commit new student presentation to GitHub repository
      if (request.method === 'POST') {
        try {
          const payload = await request.json();
          if (!payload || !payload.title || !payload.id) {
            return new Response(JSON.stringify({ error: 'Missing required presentation fields' }), {
              status: 400,
              headers: CORS_HEADERS,
            });
          }

          if (token) {
            const filePath = `submissions/${payload.id}.json`;
            const contentB64 = toBase64(JSON.stringify(payload, null, 2));

            const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
              method: 'PUT',
              headers: {
                ...ghHeaders,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `feat(community): add presentation "${payload.title}" by ${payload.author}`,
                content: contentB64,
                branch: GITHUB_BRANCH,
              }),
            });

            if (!commitRes.ok) {
              const errBody = await commitRes.text();
              console.error('GitHub API error:', errBody);
              return new Response(JSON.stringify({ success: true, localOnly: true, item: payload, warning: 'GitHub commit notice' }), {
                headers: CORS_HEADERS,
              });
            }
          }

          return new Response(JSON.stringify({ success: true, item: payload, committed: !!token }), {
            status: 201,
            headers: CORS_HEADERS,
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
        }
      }

      // DELETE: Remove a submission from GitHub repository
      if (request.method === 'DELETE') {
        try {
          const id = url.searchParams.get('id');
          if (!id) {
            return new Response(JSON.stringify({ error: 'Missing id query parameter' }), {
              status: 400,
              headers: CORS_HEADERS,
            });
          }

          if (token) {
            const filePath = `submissions/${id}.json`;
            const fileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`, {
              headers: ghHeaders,
            });

            if (fileRes.ok) {
              const fileData = await fileRes.json();
              await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
                method: 'DELETE',
                headers: {
                  ...ghHeaders,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  message: `chore(community): remove presentation "${id}"`,
                  sha: fileData.sha,
                  branch: GITHUB_BRANCH,
                }),
              });
            }
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

    // Static assets fallback (HTML, CSS, JS, PPTX, images)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
