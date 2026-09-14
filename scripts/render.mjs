// Renderiza pages/01.html … 08.html em output/01.png … 08.png (1080x1350)
import { chromium } from "playwright";
import { mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = join(ROOT, "pages");
const OUT = join(ROOT, "output");
mkdirSync(OUT, { recursive: true });

const only = process.argv.slice(2); // ex.: node scripts/render.mjs 01 03
const files = readdirSync(PAGES).filter(f => f.endsWith(".html") && !f.startsWith("index")).filter(f => !only.length || only.some(o => f.startsWith(o))).sort();

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
const pg = await ctx.newPage();
for (const f of files) {
  await pg.goto(pathToFileURL(join(PAGES, f)).href);
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(150);
  const out = join(OUT, f.replace(".html", ".png"));
  await pg.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 }, type: "png" });
  console.log("ok", out);
}
await browser.close();
