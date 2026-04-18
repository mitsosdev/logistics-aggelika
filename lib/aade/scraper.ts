import * as cheerio from "cheerio";

export type AadeArticle = {
  title: string;
  date: string; // ISO YYYY-MM-DD
  displayDate: string; // DD/MM/YYYY
  url: string;
  slug: string;
};

const AADE_BASE = "https://www.aade.gr";
const AADE_NEWS_PATH = "/deltia-typoy-anakoinoseis";

const parseDDMMYYYY = (s: string): string | null => {
  const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return `${y}-${mo}-${d}`;
};

export const fetchAadeArticles = async (
  limit = 4
): Promise<AadeArticle[]> => {
  try {
    const res = await fetch(`${AADE_BASE}${AADE_NEWS_PATH}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ViliotisAccounting/1.0; +https://viliotis.gr)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 3600, tags: ["aade-news"] },
    });

    if (!res.ok) {
      throw new Error(`AADE fetch failed: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const articles: AadeArticle[] = [];
    const seen = new Set<string>();

    $('a[href^="/deltia-typoy-anakoinoseis/deltio-typoy-"]').each((_, el) => {
      if (articles.length >= limit) return false;

      const $a = $(el);
      const href = $a.attr("href");
      if (!href) return;

      const slug = href.replace("/deltia-typoy-anakoinoseis/", "");
      if (seen.has(slug)) return;

      const titleEl = $a.find("div.subtitle p, div.subtitle").first();
      const title = titleEl.text().trim();
      if (!title) return;

      // The anchor's direct text before the subtitle contains "Δελτίο Τύπου DD/MM/YYYY"
      const anchorText = $a
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      const isoDate = parseDDMMYYYY(anchorText);
      if (!isoDate) return;

      const [y, mo, d] = isoDate.split("-");
      seen.add(slug);
      articles.push({
        title,
        date: isoDate,
        displayDate: `${d}/${mo}/${y}`,
        url: `${AADE_BASE}${href}`,
        slug,
      });
    });

    return articles;
  } catch (err) {
    console.error("[aade scraper]", err);
    return [];
  }
};
