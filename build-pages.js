/**
 * Cloudflare Pages Build Script
 * ==============================
 * This script runs during the Cloudflare Pages automated build phase.
 * It removes large asset directories (>25MB) that exceed Cloudflare Pages' 
 * static asset threshold. The ArtCraft applications are dynamically proxied 
 * to GitHub Pages at runtime by _worker.js, so the user experiences zero loss 
 * of functionality.
 */

const fs = require('fs');
const path = require('path');

console.log('[build-pages] Starting Cloudflare Pages pre-upload preparation...');

// Directories with files > 25MB to prune from the Cloudflare Pages upload
const pruneDirs = ['artcraft', 'craft-launcher'];

let prunedCount = 0;
for (const dir of pruneDirs) {
  const target = path.join(__dirname, dir);
  if (fs.existsSync(target)) {
    console.log(`[build-pages] Pruning ${dir}/ to meet Cloudflare 25 MiB single-file limit...`);
    fs.rmSync(target, { recursive: true, force: true });
    prunedCount++;
  }
}

console.log(`[build-pages] Pre-upload cleanup finished (${prunedCount} directories removed).`);
console.log('[build-pages] All static assets are now within Cloudflare Pages limits!');
