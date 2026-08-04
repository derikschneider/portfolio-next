// One-off asset conversion, run 2026-08-04. Kept for reference in case more
// imagery is added later — see next.config.ts's `images.unoptimized` comment
// for why files must be pre-compressed rather than optimized at request time.
//
// Usage: node scripts/to-webp.mjs
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import path from "path";

const MAX = 1920; // lightbox is full-screen; nothing needs more than this
const PORTRAIT_MAX = 900; // rendered at 300x400 CSS, so 900 covers 2x DPR

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "not used") continue; // gitignored, never deployed
      walk(p, out);
    } else if (/\.(jpe?g|png)$/i.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}

const files = walk("public/case-studies");
files.push("public/profile-pic.png");

let before = 0;
let after = 0;
let converted = 0;

for (const f of files) {
  const isPortrait = f.endsWith("profile-pic.png");
  const cap = isPortrait ? PORTRAIT_MAX : MAX;
  const out = f.replace(/\.(jpe?g|png)$/i, ".webp");
  const sizeBefore = statSync(f).size;

  const img = sharp(f);
  const meta = await img.metadata();
  const pipeline =
    meta.width > cap || meta.height > cap
      ? img.resize({ width: cap, height: cap, fit: "inside", withoutEnlargement: true })
      : img;

  await pipeline.webp({ quality: 85 }).toFile(out);

  after += statSync(out).size;
  before += sizeBefore;
  converted++;
  unlinkSync(f);
}

console.log(`converted ${converted} files`);
console.log(`before: ${(before / 1024 / 1024).toFixed(2)} MB`);
console.log(`after:  ${(after / 1024 / 1024).toFixed(2)} MB`);
console.log(`saved:  ${(100 - (after / before) * 100).toFixed(1)}%`);
