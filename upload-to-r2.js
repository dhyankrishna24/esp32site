/**
 * Upload ArtCraft Apps Suite to Cloudflare R2
 * ============================================
 * Usage:
 *   node upload-to-r2.js [bucket-name]
 * 
 * Default bucket: esp32site-artcraft
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUCKET = process.argv[2] || 'esp32site-artcraft';
const APPS_DIR = path.join(__dirname, 'artcraft', 'apps');

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.wasm': return 'application/wasm';
    case '.js':   return 'application/javascript';
    case '.html': return 'text/html; charset=utf-8';
    case '.json': return 'application/json';
    case '.css':  return 'text/css';
    case '.png':  return 'image/png';
    case '.svg':  return 'image/svg+xml';
    case '.zip':  return 'application/zip';
    default:     return 'application/octet-stream';
  }
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

console.log('='.repeat(60));
console.log(`Cloudflare R2 ArtCraft Suite Sync Tool`);
console.log(`Target Bucket: ${BUCKET}`);
console.log('='.repeat(60));

// 1. Check Wrangler authentication
try {
  console.log('\n[1/3] Verifying Cloudflare Wrangler authentication...');
  execSync('npx wrangler whoami', { stdio: 'inherit' });
} catch (err) {
  console.error('\n⚠️ You are not logged in to Wrangler!');
  console.error('Please run: npx wrangler login');
  console.error('Once logged in, re-run: node upload-to-r2.js');
  process.exit(1);
}

// 2. Ensure R2 bucket exists
try {
  console.log(`\n[2/3] Ensuring R2 bucket "${BUCKET}" exists...`);
  execSync(`npx wrangler r2 bucket create ${BUCKET}`, { stdio: 'pipe' });
  console.log(`✅ Bucket "${BUCKET}" ready.`);
} catch (err) {
  // Usually means already exists, which is fine
  console.log(`ℹ️ Bucket "${BUCKET}" already exists or ready.`);
}

// 3. Scan and upload files
console.log(`\n[3/3] Scanning files in ${APPS_DIR}...`);
const files = getAllFiles(APPS_DIR);
console.log(`Found ${files.length} files to sync to Cloudflare R2.\n`);

let uploaded = 0;
let failed = 0;

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const mime = getMimeType(filePath);
  const sizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
  const destination = `${BUCKET}/${relPath}`;

  process.stdout.write(`[${i + 1}/${files.length}] Uploading ${relPath} (${sizeMB} MB)... `);

  try {
    const cmd = `npx wrangler r2 object put "${destination}" --file "${filePath}" --content-type "${mime}" --remote`;
    execSync(cmd, { stdio: 'pipe' });
    console.log('✓ OK');
    uploaded++;
  } catch (err) {
    console.log('✗ FAILED');
    failed++;
  }
}

console.log('\n' + '='.repeat(60));
console.log(`R2 Sync Summary:`);
console.log(`  Successfully uploaded: ${uploaded}`);
console.log(`  Failed:               ${failed}`);
console.log('='.repeat(60));
console.log(`\nYour ArtCraft apps are now live on Cloudflare R2!`);
