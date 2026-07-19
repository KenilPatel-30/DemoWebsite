import sharp from "sharp";
import { readdirSync } from "fs";
const dir = "images";
const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));
const rows = [];
for (const f of files) {
  const m = await sharp(`${dir}/${f}`).metadata();
  const orient = m.width > m.height ? "LAND" : "PORT";
  rows.push(`${orient} ${m.width}x${m.height}  ${f}`);
}
rows.sort();
console.log(rows.join("\n"));
