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

const parseArticlesFromHtml = (
  html: string,
  limit: number
): AadeArticle[] => {
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

    const anchorText = $a.clone().children().remove().end().text().trim();
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
};

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "el-GR,el;q=0.9,en;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Sec-Ch-Ua":
    '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

const tryFetch = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      next: { revalidate: 3600, tags: ["aade-news"] },
      signal: AbortSignal.timeout(10_000),
    });

    console.log(
      `[aade] GET ${url} → ${res.status} ${res.statusText} (ct: ${res.headers.get(
        "content-type"
      )})`
    );

    if (!res.ok) return null;
    const html = await res.text();
    console.log(`[aade] body length: ${html.length} bytes`);
    return html;
  } catch (err) {
    console.error(`[aade] fetch error for ${url}:`, err);
    return null;
  }
};

export const fetchAadeArticles = async (
  limit = 4
): Promise<AadeArticle[]> => {
  const attempts = [
    `${AADE_BASE}${AADE_NEWS_PATH}`,
    `${AADE_BASE}${AADE_NEWS_PATH}?page=0`,
    `${AADE_BASE}/`,
  ];

  for (const url of attempts) {
    const html = await tryFetch(url);
    if (!html) continue;

    const articles = parseArticlesFromHtml(html, limit);
    console.log(`[aade] parsed ${articles.length} articles from ${url}`);

    if (articles.length > 0) return articles;
  }

  console.error("[aade] all fetch attempts failed or returned no articles");
  return [];
};
