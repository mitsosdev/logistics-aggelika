import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const url = process.argv[2];
const label = process.argv[3] || "big";

const dir = "screenshots";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const existing = fs.readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
let maxNum = 0;
for (const f of existing) {
  const match = f.match(/^screenshot-(\d+)/);
  if (match) maxNum = Math.max(maxNum, parseInt(match[1], 10));
}
const num = maxNum + 1;
const filepath = path.join(dir, `screenshot-${num}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(filepath);
