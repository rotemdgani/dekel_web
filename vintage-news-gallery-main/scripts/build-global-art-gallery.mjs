/**
 * Builds global-art-gallery-XX.webp from available sources.
 * Skips missing files without failing.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");
const outPrefix = "global-art-gallery";
const maxWidth = 1920;
const webpQuality = 82;

const candidateSources = [
  path.join(assetsDir, "global-art-gallery-01.jpg"),
  path.join(assetsDir, "global-art-gallery-02.jpg"),
  path.join(assetsDir, "global-art-gallery-03.jpg"),
  path.join(assetsDir, "global-art-gallery-01.JPG"),
  path.join(assetsDir, "global-art-gallery-02.JPG"),
  path.join(assetsDir, "global-art-gallery-03.JPG"),
  path.join(assetsDir, "global_art_gallery_01.jpg"),
  path.join(assetsDir, "global_art_gallery_02.jpg"),
  path.join(assetsDir, "global_art_gallery_03.jpg"),
];

const videoPath = path.join(assetsDir, "global_art_exhibition_video.MOV");
const tempDir = path.join(assetsDir, ".global-art-gallery-temp");

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

async function toWebp(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 4 })
    .toFile(outputPath);
  console.log(`Created ${path.basename(outputPath)}`);
}

function extractVideoFrames() {
  if (!ffmpegPath || !exists(videoPath)) {
    console.log("Skipping video frames: MOV not found or ffmpeg unavailable.");
    return [];
  }

  fs.mkdirSync(tempDir, { recursive: true });
  const pattern = path.join(tempDir, "frame-%02d.jpg");

  try {
    execFileSync(
      ffmpegPath,
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        videoPath,
        "-vf",
        "fps=1/3",
        "-frames:v",
        "3",
        pattern,
      ],
      { stdio: "pipe" },
    );
  } catch (err) {
    console.log("Video frame extraction failed:", err.message ?? err);
    return [];
  }

  return fs
    .readdirSync(tempDir)
    .filter((f) => f.startsWith("frame-") && f.endsWith(".jpg"))
    .sort()
    .map((f) => path.join(tempDir, f));
}

async function main() {
  const rasterSources = [];

  for (const src of candidateSources) {
    if (exists(src)) rasterSources.push(src);
  }

  if (rasterSources.length === 0) {
  const globLike = fs
      .readdirSync(assetsDir)
      .filter((name) => {
        const lower = name.toLowerCase();
        return (
          /global.?art.?gallery/i.test(name) &&
          /\.(jpe?g|png|heic)$/i.test(name) &&
          !/invitation/i.test(name)
        );
      })
      .map((name) => path.join(assetsDir, name));
    rasterSources.push(...globLike);
  }

  let sources = [...new Set(rasterSources)];

  if (sources.length === 0) {
    sources = extractVideoFrames();
  }

  if (sources.length === 0) {
    console.log("No gallery source images found. Gallery wiring only.");
    return;
  }

  let index = 1;
  for (const src of sources.slice(0, 12)) {
    const out = path.join(
      assetsDir,
      `${outPrefix}-${String(index).padStart(2, "0")}.webp`,
    );
    try {
      await toWebp(src, out);
      index += 1;
    } catch (err) {
      console.log(`Skipped ${path.basename(src)}:`, err.message ?? err);
    }
  }

  if (exists(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  if (exists(path.join(assetsDir, "global-art-source-temp.jpg"))) {
    try {
      fs.unlinkSync(path.join(assetsDir, "global-art-source-temp.jpg"));
    } catch {
      /* ignore */
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
