import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const url = process.argv[2];
const label = process.argv[3] || "footer";

const dir = "screenshots";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const existing = fs.readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
let maxNum = 0;
for (const f of existing) {
  const m = f.match(/^screenshot-(\d+)/);
  if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
}
const filepath = path.join(dir, `screenshot-${maxNum + 1}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));

const box = await page.evaluate(() => {
  const el = document.querySelector("footer");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
});
if (!box) throw new Error("footer not found");

await page.evaluate((y) => window.scrollTo({ top: y - 20, behavior: "instant" }), box.y);
await new Promise((r) => setTimeout(r, 800));

await page.setViewport({ width: 1280, height: Math.min(Math.ceil(box.h) + 40, 2200) });
await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), box.y);
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(filepath);
