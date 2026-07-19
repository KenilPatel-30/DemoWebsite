import sharp from "sharp";

// Landscape shots with Maps cards top-left/right + minimap bottom-left.
// Crop a clean central horizontal band that removes all corner chrome.
const jobs = [
  { src: "Screenshot 2026-07-11 154359.png", out: "venue-03.jpg", top: 0.15, bottom: 0.18 },
  { src: "Screenshot 2026-07-11 154412.png", out: "venue-04.jpg", top: 0.14, bottom: 0.17 },
  { src: "Screenshot 2026-07-11 154525.png", out: "venue-10.jpg", top: 0.14, bottom: 0.17 },
  { src: "Screenshot 2026-07-11 154647.png", out: "venue-17.jpg", top: 0.14, bottom: 0.2 },
];

for (const j of jobs) {
  const m = await sharp(`images/${j.src}`).metadata();
  const top = Math.round(m.height * j.top);
  const bottom = Math.round(m.height * j.bottom);
  const left = Math.round(m.width * 0.045);
  const right = Math.round(m.width * 0.015);
  await sharp(`images/${j.src}`)
    .extract({ left, top, width: m.width - left - right, height: m.height - top - bottom })
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/venue/${j.out}`);
  console.log(`salvaged ${j.out}`);
}
