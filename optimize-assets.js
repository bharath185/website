const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, 'public');

// Track savings
let totalOriginal = 0;
let totalOptimized = 0;
let filesProcessed = 0;
let filesSkipped = 0;

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  // Skip tiny files (< 10KB) — already optimized
  if (originalSize < 10 * 1024) {
    filesSkipped++;
    return;
  }

  try {
    const inputBuffer = fs.readFileSync(filePath);
    let sharpInstance = sharp(inputBuffer).rotate();

    const metadata = await sharp(inputBuffer).metadata();
    if (metadata.width && (metadata.width > 1920 || metadata.height > 1920)) {
      sharpInstance = sharpInstance.resize(1920, 1920, { fit: 'inside', withoutEnlargement: true });
    }

    let buffer;

    if (ext === '.png') {
      buffer = await sharpInstance
        .png({ quality: 80, compressionLevel: 9, palette: true, effort: 8 })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await sharpInstance
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
    } else if (ext === '.webp') {
      buffer = await sharpInstance
        .webp({ quality: 80, effort: 5 })
        .toBuffer();
    } else {
      filesSkipped++;
      return;
    }

    // Only write if we actually saved space
    if (buffer.length < originalSize * 0.95) {
      fs.writeFileSync(filePath, buffer);
      totalOriginal += originalSize;
      totalOptimized += buffer.length;
      filesProcessed++;
      const saved = ((1 - buffer.length / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${path.relative(PUBLIC_DIR, filePath)} — ${formatMB(originalSize)}MB → ${formatMB(buffer.length)}MB (−${saved}%)`);
    } else {
      filesSkipped++;
    }
  } catch (err) {
    console.log(`  ✗ ${path.relative(PUBLIC_DIR, filePath)} — skipped (${err.message})`);
    filesSkipped++;
  }
}

async function optimizeVideo(filePath) {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  const tmpPath = filePath + '.tmp.mp4';

  console.log(`\n  Compressing video: ${path.basename(filePath)} (${formatMB(originalSize)}MB)...`);

  try {
    // Use ffmpeg with CRF 28 (good quality, smaller size), fast preset
    execSync(
      `ffmpeg -i "${filePath}" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart -y "${tmpPath}"`,
      { stdio: 'pipe', timeout: 120000 }
    );

    const newStat = fs.statSync(tmpPath);
    if (newStat.size < originalSize * 0.90) {
      fs.unlinkSync(filePath);
      fs.renameSync(tmpPath, filePath);
      totalOriginal += originalSize;
      totalOptimized += newStat.size;
      filesProcessed++;
      const saved = ((1 - newStat.size / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${path.basename(filePath)} — ${formatMB(originalSize)}MB → ${formatMB(newStat.size)}MB (−${saved}%)`);
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`  → ${path.basename(filePath)} — already optimal, skipped`);
    }
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.log(`  ✗ ${path.basename(filePath)} — ffmpeg error, skipped`);
  }
}

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   BMT Asset Optimizer — Lossless-Quality    ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  const allFiles = getAllFiles(PUBLIC_DIR);

  // Separate file types
  const images = allFiles.filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  const videos = allFiles.filter(f => /\.(mp4|webm)$/i.test(f));

  console.log(`Found ${images.length} images and ${videos.length} videos\n`);

  // 1. Optimize images
  console.log('─── IMAGES ───');
  for (const img of images) {
    await optimizeImage(img);
  }

  // 2. Optimize videos
  console.log('\n─── VIDEOS ───');
  for (const vid of videos) {
    await optimizeVideo(vid);
  }

  // Summary
  const savedBytes = totalOriginal - totalOptimized;
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log(`║  Files optimized: ${filesProcessed}`);
  console.log(`║  Files skipped:   ${filesSkipped}`);
  console.log(`║  Original:        ${formatMB(totalOriginal)} MB`);
  console.log(`║  Optimized:       ${formatMB(totalOptimized)} MB`);
  console.log(`║  Saved:           ${formatMB(savedBytes)} MB (${totalOriginal > 0 ? ((savedBytes / totalOriginal) * 100).toFixed(1) : 0}%)`);
  console.log('╚══════════════════════════════════════════════╝');
}

main().catch(console.error);
