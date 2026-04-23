import { getTranslations } from "next-intl/server";

const STEPS = ["step1", "step2", "step3", "step4"] as const;
type StepKey = (typeof STEPS)[number];

export const ProcessSection = async () => {
  const t = await getTranslations("Process");

  return (
    <section id="process" className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 mb-16 lg:mb-28">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-ink/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
                {t("label")}
              </span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink font-[500] text-balance">
              {t("title")}{" "}
              <span className="italic text-brand font-[450]">
                {t("titleAccent")}
              </span>
            </h2>
          </div>
        </div>

        {/* Steps — horizontal timeline on desktop */}
        <div className="relative">
          {/* Progress line (full-width, subtle) */}
          <div
            className="absolute top-6 left-0 right-0 h-px bg-linear-to-r from-brand/40 via-ink/10 to-transparent hidden lg:block"
            aria-hidden
          />

          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6">
            {STEPS.map((key) => (
              <li key={key} className="relative">
                {/* Dot */}
                <div className="hidden lg:block absolute top-[18px] left-0 size-3 rounded-full bg-ivory border-2 border-brand" />

                {/* Number */}
                <div className="flex items-center gap-3 mb-5 lg:mt-14">
                  <span className="font-display text-[clamp(2rem,3vw,2.75rem)] text-ink font-[450] tabular-nums leading-none">
                    {t(`${key}Number` as `${StepKey}Number`)}
                  </span>
                  <span className="h-px flex-1 bg-ink/15 lg:hidden" />
                </div>

                <h3
                  className="font-display text-[22px] leading-tight text-ink font-medium mb-3"
                  style={{ fontVariationSettings: "normal" }}
                >
                  {t(`${key}Title` as `${StepKey}Title`)}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-muted-ink max-w-[320px]">
                  {t(`${key}Desc` as `${StepKey}Desc`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
