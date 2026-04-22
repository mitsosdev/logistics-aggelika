import { getTranslations } from "next-intl/server";

export const AboutSection = async () => {
  const t = await getTranslations("About");

  return (
    <section id="about" className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Label */}
        <div className="flex items-center gap-3 mb-12 lg:mb-20">
          <span className="h-px w-12 bg-ink/30" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
            {t("label")}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — pull quote */}
          <div className="lg:col-span-7">
            <blockquote className="relative">
              <span
                className="absolute -left-2 -top-12 font-display text-[140px] leading-none text-brand/25 select-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] tracking-tight text-ink italic font-[450] text-balance">
                {t("pullQuote")}
              </p>
            </blockquote>

            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-ink/15" />
              <div className="text-right">
                <p className="font-display italic text-[17px] text-ink">
                  {t("signatureName")}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-muted-ink mt-0.5">
                  {t("signatureRole")}
                </p>
              </div>
            </div>
          </div>

          {/* Right — prose */}
          <div className="lg:col-span-5 space-y-5 text-[15.5px] leading-[1.65] text-ink/85 lg:pt-4">
            <p className="first-letter:font-display first-letter:text-[56px] first-letter:float-left first-letter:leading-[0.85] first-letter:mr-2 first-letter:mt-1 first-letter:text-brand">
              {t("paragraph1")}
            </p>
            <p>{t("paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
