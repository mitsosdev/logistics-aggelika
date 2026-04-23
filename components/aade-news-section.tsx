import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { fetchAadeArticles, type AadeArticle } from "@/lib/aade/scraper";

const MONTH_KEYS = [
  "monthJan",
  "monthFeb",
  "monthMar",
  "monthApr",
  "monthMay",
  "monthJun",
  "monthJul",
  "monthAug",
  "monthSep",
  "monthOct",
  "monthNov",
  "monthDec",
] as const;
type MonthKey = (typeof MONTH_KEYS)[number];

export const AadeNewsSection = async () => {
  const t = await getTranslations("AadeNews");
  const articles = await fetchAadeArticles(4);
  const months = MONTH_KEYS.map((k) => t(k));

  return (
    <section className="relative bg-ink text-ivory py-24 lg:py-32 overflow-hidden">
      {/* Ambient emerald glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-40 size-[480px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--brand), transparent 70%)",
        }}
      />
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-ivory/60">
                {t("label")}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] font-[500] text-balance">
              {t("title")}{" "}
              <span className="italic text-brand font-[450]">
                {t("titleAccent")}
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex lg:justify-end">
            <div className="max-w-sm">
              <p className="text-[15px] leading-[1.6] text-ivory/70">
                {t("subtitle")}
              </p>
              <p className="mt-4 text-[11px] tracking-[0.14em] uppercase text-ivory/40">
                {t("source")} · {t("updated")}
              </p>
            </div>
          </div>
        </div>

        {/* Articles grid */}
        {articles.length === 0 ? (
          <div className="border border-ivory/10 rounded-sm p-8 text-center text-ivory/60 text-[14px]">
            {t("empty")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10 border border-ivory/10 rounded-sm overflow-hidden">
            {articles.map((a) => (
              <ArticleCard
                key={a.slug}
                article={a}
                readMore={t("readMore")}
                pressRelease={t("pressRelease")}
                months={months}
              />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ivory/60">
          <span>{t("cta")}</span>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-1.5 border-b border-ivory/30 hover:border-brand hover:text-brand transition-colors duration-300 pb-0.5 cursor-pointer"
          >
            {t("contactLink")}
            <ArrowUpRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </Link>
          <span className="ml-auto flex items-center gap-1.5 text-ivory/40">
            <ExternalLink className="size-3" strokeWidth={1.75} />
            <a
              href="https://www.aade.gr/deltia-typoy-anakoinoseis"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory/70 transition-colors cursor-pointer"
            >
              aade.gr
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

type ArticleCardProps = {
  article: AadeArticle;
  readMore: string;
  pressRelease: string;
  months: string[];
};

const ArticleCard = ({ article, readMore, pressRelease, months }: ArticleCardProps) => {
  const [y, mo, d] = article.date.split("-");
  const day = parseInt(d, 10);
  const monthIndex = parseInt(mo, 10) - 1;
  const monthShort = months[monthIndex] ?? "";

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-ink p-7 lg:p-8 flex flex-col justify-between min-h-[280px] transition-colors duration-500 hover:bg-ink-soft/40 cursor-pointer"
    >
      {/* Top — date */}
      <div className="flex items-baseline gap-2">
        <span className="font-display text-[11px] tracking-[0.18em] text-ivory/50 uppercase tabular-nums">
          {monthShort}
        </span>
        <span className="font-display text-[clamp(2.75rem,4vw,3.75rem)] leading-none tabular-nums font-[450] text-ivory">
          {day}
        </span>
        <span className="text-[11px] text-ivory/40 tabular-nums ml-auto">
          · {y}
        </span>
      </div>

      {/* Middle — title */}
      <div className="mt-6 space-y-3 flex-1">
        <p className="text-[10px] tracking-[0.15em] uppercase text-brand font-medium">
          {pressRelease}
        </p>
        <h3 className="font-display text-[17px] leading-[1.3] font-[500] text-balance line-clamp-5">
          {article.title}
        </h3>
      </div>

      {/* Bottom — read more */}
      <div className="mt-6 pt-5 border-t border-ivory/10 flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wider text-ivory/50 group-hover:text-brand transition-colors duration-300">
          {readMore}
        </span>
        <ArrowUpRight
          className="size-4 text-ivory/40 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          strokeWidth={1.75}
        />
      </div>
    </a>
  );
};
