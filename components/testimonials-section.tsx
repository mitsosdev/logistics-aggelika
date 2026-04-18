import { getTranslations } from "next-intl/server";

const SMALL = ["t1", "t2", "t3"] as const;
type SmallKey = (typeof SMALL)[number];

export const TestimonialsSection = async () => {
  const t = await getTranslations("Testimonials");

  return (
    <section className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-12 lg:mb-20">
          <span className="h-px w-12 bg-ink/30" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
            {t("label")}
          </span>
        </div>

        {/* Featured pull quote */}
        <figure className="max-w-4xl mb-20 lg:mb-28">
          <span
            className="block font-display text-[120px] lg:text-[180px] leading-[0.7] text-emerald-brand/25 select-none mb-2"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="font-display text-[clamp(1.75rem,3.75vw,3rem)] leading-[1.2] tracking-tight text-ink font-[450] italic text-balance">
            {t("featuredQuote")}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-emerald-brand" />
            <div>
              <p className="font-medium text-[14px] text-ink">
                {t("featuredAuthor")}
              </p>
              <p className="text-[12px] text-muted-ink uppercase tracking-wider mt-0.5">
                {t("featuredRole")}
              </p>
            </div>
          </figcaption>
        </figure>

        {/* Small testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-ink/10 pt-12 lg:pt-16">
          {SMALL.map((key) => (
            <figure key={key} className="group">
              <span
                className="block font-display text-[48px] leading-none text-emerald-brand/50 mb-4 select-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="text-[15px] leading-[1.6] text-ink/85 italic font-display font-[450] mb-6">
                {t(`${key}Quote` as `${SmallKey}Quote`)}
              </blockquote>
              <figcaption>
                <p className="text-[13px] font-medium text-ink">
                  {t(`${key}Author` as `${SmallKey}Author`)}
                </p>
                <p className="text-[11px] text-muted-ink uppercase tracking-wider mt-0.5">
                  {t(`${key}Role` as `${SmallKey}Role`)}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
