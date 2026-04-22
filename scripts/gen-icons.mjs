import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO = path.resolve(__dirname, "..");
const LOGO = path.join(REPO, "public/images/logo-v2.webp");

const buildIco = async (logoPath, outPath) => {
  const png = await sharp(logoPath)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  const ico = Buffer.concat([header, entry, png]);
  fs.writeFileSync(outPath, ico);
  console.log("wrote", path.relative(REPO, outPath), ico.length, "bytes");
};

await sharp(LOGO)
  .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(path.join(REPO, "app/icon.png"));
console.log("wrote app/icon.png");

await sharp(LOGO)
  .resize(180, 180, { fit: "contain", background: { r: 250, g: 248, b: 243, alpha: 1 } })
  .flatten({ background: { r: 250, g: 248, b: 243 } })
  .png()
  .toFile(path.join(REPO, "app/apple-icon.png"));
console.log("wrote app/apple-icon.png");

await buildIco(LOGO, path.join(REPO, "app/favicon.ico"));
