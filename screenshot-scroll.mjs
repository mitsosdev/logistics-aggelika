import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const url = process.argv[2];
const selector = process.argv[3];
const label = process.argv[4] || "scroll";

const dir = "screenshots";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const existing = fs.readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
let maxNum = 0;
for (const f of existing) {
  const match = f.match(/^screenshot-(\d+)/);
  if (match) maxNum = Math.max(maxNum, parseInt(match[1], 10));
}
const filepath = path.join(dir, `screenshot-${maxNum + 1}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
if (selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 80, behavior: "instant" });
    }
  }, selector);
  await new Promise(r => setTimeout(r, 1500));
}
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(filepath);
