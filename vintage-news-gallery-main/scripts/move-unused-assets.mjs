/**
 * Scan src/assets/ and move files not referenced in src/ to src/assets/unused/
 * Usage: node scripts/move-unused-assets.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src", "assets");
const UNUSED_DIR = path.join(ASSETS_DIR, "unused");
const SRC_DIR = path.join(ROOT, "src");
const DRY_RUN = process.argv.includes("--dry-run");

const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".json",
]);

/** @param {string} dir @returns {string[]} */
function listAssetFiles(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "unused") continue;
      out.push(...listAssetFiles(full));
      continue;
    }
    if (entry.isFile()) out.push(full);
  }
  return out;
}

/** @param {string} dir @returns {string[]} */
function listSourceFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets") continue;
      out.push(...listSourceFiles(full));
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

/** Strip // and block comments for import detection */
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

/** Convert glob like @/assets/[0-9]*.webp to RegExp against asset rel path */
function globToRegex(globPattern) {
  const normalized = globPattern
    .replace(/^@\/assets\//, "")
    .replace(/\*\./g, ".__EXT__.")
    .replace(/\{([^}]+)\}/g, (_, alts) => {
      const parts = alts.split(",").map((p) => p.trim().replace(/^\./, ""));
      return `(?:${parts.join("|")})`;
    })
    .replace(/\*\*/g, "___GLOBSTAR___")
    .replace(/\*/g, "[^/]*")
    .replace(/___GLOBSTAR___/g, ".*")
    .replace(/\?/g, ".")
    .replace(/\.__EXT__\./g, "\\.");

  return new RegExp(`^${normalized}$`, "i");
}

/** @param {string}      relPath e.g. backon1.JPG or events/foo.webp */
function assetMatchesGlob(relPath, globPattern) {
  const posix = relPath.replace(/\\/g, "/");
  const base = path.basename(posix);

  switch (globPattern) {
    case "@/assets/[0-9]*.webp":
      return !posix.includes("/") && /^\d\S*\.webp$/i.test(base);
    case "@/assets/*.{webp,WEBP}":
      return !posix.includes("/") && /\.webp$/i.test(base);
    case "@/assets/events/*.{webp,WEBP}":
      return /^events\/[^/]+\.webp$/i.test(posix);
    default:
      break;
  }

  const extMatch = globPattern.match(/\*\.(\{[^}]+\}|[^/]+)/);
  if (extMatch) {
    const extPart = extMatch[1];
    const exts = extPart.startsWith("{")
      ? extPart
          .slice(1, -1)
          .split(",")
          .map((e) => e.trim().replace(/^\./, "").toLowerCase())
      : [extPart.toLowerCase()];
    const fileExt = path.extname(relPath).slice(1).toLowerCase();
    if (!exts.includes(fileExt)) return false;
  }

  const regex = globToRegex(globPattern);
  return regex.test(posix);
}

/** @param {string} sourceText @param {string} relPath */
function isExplicitlyReferenced(sourceText, relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  const basename = path.basename(normalized);
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedBase = basename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const patterns = [
    new RegExp(`@/assets/${escaped}(?=['"\`\\s]|$)`, "i"),
    new RegExp(`@/assets/${escapedBase}(?=['"\`\\s]|$)`, "i"),
    new RegExp(`assets/${escaped}(?=['"\`\\s]|$)`, "i"),
    new RegExp(`assets/${escapedBase}(?=['"\`\\s]|$)`, "i"),
  ];

  return patterns.some((re) => re.test(sourceText));
}

function main() {
  const assetFiles = listAssetFiles(ASSETS_DIR);
  const sourceFiles = listSourceFiles(SRC_DIR);

  const sourceContents = sourceFiles.map((file) => ({
    file,
    active: stripComments(fs.readFileSync(file, "utf8")),
    raw: fs.readFileSync(file, "utf8"),
  }));

  /** @type {Set<string>} */
  const referenced = new Set();

  /** @type {string[]} */
  const globPatterns = [];

  for (const { active } of sourceContents) {
    const globRe =
      /import\.meta\.glob(?:<[^>]*>)?\(\s*['"`](@\/assets\/[^'"`]+)['"`]/g;
    let m;
    while ((m = globRe.exec(active)) !== null) {
      globPatterns.push(m[1]);
    }

    const dynamicImportRe = /import\s*\(\s*['"`](@\/assets\/[^'"`]+)['"`]\s*\)/g;
    while ((m = dynamicImportRe.exec(active)) !== null) {
      const importPath = m[1].replace(/^@\/assets\//, "");
      for (const asset of assetFiles) {
        const rel = path.relative(ASSETS_DIR, asset).replace(/\\/g, "/");
        if (rel === importPath || path.basename(rel) === importPath) {
          referenced.add(asset);
        }
      }
    }
  }

  for (const asset of assetFiles) {
    const rel = path.relative(ASSETS_DIR, asset).replace(/\\/g, "/");

    for (const { active } of sourceContents) {
      if (isExplicitlyReferenced(active, rel)) {
        referenced.add(asset);
        break;
      }
    }

    if (referenced.has(asset)) continue;

    for (const pattern of globPatterns) {
      if (assetMatchesGlob(rel, pattern)) {
        referenced.add(asset);
        break;
      }
    }
  }

  /** @type {string[]} */
  const toMove = [];

  for (const asset of assetFiles) {
    if (!referenced.has(asset)) {
      toMove.push(asset);
    }
  }

  toMove.sort((a, b) => a.localeCompare(b));

  if (!DRY_RUN && toMove.length > 0) {
    fs.mkdirSync(UNUSED_DIR, { recursive: true });
  }

  /** @type {string[]} */
  const moved = [];

  for (const asset of toMove) {
    const basename = path.basename(asset);
    const dest = path.join(UNUSED_DIR, basename);

    if (fs.existsSync(dest)) {
      console.error(
        `Skip (name collision in unused/): ${path.relative(ASSETS_DIR, asset).replace(/\\/g, "/")}`,
      );
      continue;
    }

    if (DRY_RUN) {
      moved.push(path.relative(ASSETS_DIR, asset).replace(/\\/g, "/"));
      continue;
    }

    fs.renameSync(asset, dest);
    moved.push(path.relative(ASSETS_DIR, asset).replace(/\\/g, "/"));
  }

  console.log(
    DRY_RUN
      ? `Dry run — would move ${moved.length} file(s) to src/assets/unused/\n`
      : `Moved ${moved.length} file(s) to src/assets/unused/\n`,
  );

  if (moved.length === 0) {
    console.log("(none)");
  } else {
    for (const name of moved) {
      console.log(`  - ${name}`);
    }
  }

  console.log(
    `\nSummary: ${assetFiles.length} assets scanned, ${referenced.size} referenced, ${moved.length} moved.`,
  );
}

main();
