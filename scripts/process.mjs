import sharp from "sharp";
import { readdirSync, mkdirSync, writeFileSync } from "fs";

const srcDir = "images";
const outDir = "public/venue";
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

// Contact-sheet layout
const COLS = 6;
const CELL_W = 250;
const CELL_H = 210;
const rows = Math.ceil(files.length / COLS);
const sheetW = COLS * CELL_W;
const sheetH = rows * CELL_H;

const composites = [];
const mapping = [];

let i = 0;
for (const f of files) {
  const idx = i + 1;
  const label = String(idx).padStart(2, "0");
  mapping.push(`${label}  ${f}`);

  const meta = await sharp(`${srcDir}/${f}`).metadata();
  const topCrop = Math.round(meta.height * 0.02);
  const bottomCrop = Math.round(meta.height * 0.08);
  const newH = meta.height - topCrop - bottomCrop;

  const cropped = sharp(`${srcDir}/${f}`).extract({
    left: 0,
    top: topCrop,
    width: meta.width,
    height: newH,
  });

  // Full optimized output
  await cropped
    .clone()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${outDir}/venue-${label}.jpg`);

  // Thumbnail for contact sheet
  const thumb = await cropped
    .clone()
    .resize({
      width: CELL_W - 12,
      height: CELL_H - 34,
      fit: "contain",
      background: { r: 247, g: 244, b: 238 },
    })
    .png()
    .toBuffer();

  const col = i % COLS;
  const row = Math.floor(i / COLS);
  composites.push({
    input: thumb,
    left: col * CELL_W + 6,
    top: row * CELL_H + 6,
  });

  const labelSvg = Buffer.from(
    `<svg width="${CELL_W}" height="26"><rect width="100%" height="100%" fill="#1C1C1C"/><text x="8" y="18" font-family="monospace" font-size="15" fill="#F7F4EE">${label}  ${f.replace("Screenshot 2026-07-11 ", "").replace(".png", "")}</text></svg>`
  );
  composites.push({
    input: labelSvg,
    left: col * CELL_W,
    top: row * CELL_H + (CELL_H - 26),
  });

  i++;
}

await sharp({
  create: {
    width: sheetW,
    height: sheetH,
    channels: 3,
    background: { r: 235, g: 231, b: 223 },
  },
})
  .composite(composites)
  .jpeg({ quality: 78 })
  .toFile("scripts/contact-sheet.jpg");

writeFileSync("scripts/mapping.txt", mapping.join("\n"));
console.log(`Processed ${files.length} images → ${outDir}`);
console.log(`Contact sheet → scripts/contact-sheet.jpg`);
