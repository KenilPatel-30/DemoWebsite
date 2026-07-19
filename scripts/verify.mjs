import sharp from "sharp";

const picks = [
  "03", "04", "08", "09", "18", "23", "28", "38", "41", "44", "39", "40",
];
const COLS = 3;
const CW = 460;
const CH = 340;
const rows = Math.ceil(picks.length / COLS);
const comps = [];
let i = 0;
for (const p of picks) {
  const thumb = await sharp(`public/venue/venue-${p}.jpg`)
    .resize({ width: CW - 10, height: CH - 28, fit: "contain", background: { r: 240, g: 236, b: 228 } })
    .toBuffer();
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  comps.push({ input: thumb, left: col * CW + 5, top: row * CH + 5 });
  comps.push({
    input: Buffer.from(`<svg width="${CW}" height="24"><rect width="100%" height="100%" fill="#1C1C1C"/><text x="8" y="17" font-family="monospace" font-size="14" fill="#fff">venue-${p}</text></svg>`),
    left: col * CW,
    top: row * CH + (CH - 24),
  });
  i++;
}
await sharp({ create: { width: COLS * CW, height: rows * CH, channels: 3, background: { r: 230, g: 226, b: 218 } } })
  .composite(comps)
  .jpeg({ quality: 82 })
  .toFile("scripts/verify-sheet.jpg");
console.log("done");
