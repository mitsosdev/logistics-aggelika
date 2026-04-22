import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;
type QKey = (typeof QS)[number];
type AKey = `a${QKey extends `q${infer N}` ? N : never}`;

export const FaqSection = async () => {
  const t = await getTranslations("Faq");

  return (
    <section className="relative bg-paper/50 py-24 lg:py-40 border-y border-ink/8">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-ink/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
                {t("label")}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em] text-ink font-[500] text-balance">
              {t("title")}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {QS.map((q, i) => {
                const a = `a${i + 1}` as AKey;
                return (
                  <AccordionItem
                    key={q}
                    value={q}
                    className="border-ink/15 py-2"
                  >
                    <AccordionTrigger className="group hover:no-underline py-5 text-left items-start gap-6">
                      <span className="flex items-start gap-5">
                        <span className="font-display text-[13px] tabular-nums text-muted-ink mt-1.5 font-[450]">
                          0{i + 1}
                        </span>
                        <span className="text-[17px] lg:text-[19px] font-[500] text-ink font-display leading-[1.3] group-hover:text-brand transition-colors duration-300">
                          {t(q)}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-12 pr-4 pb-6 text-[14.5px] leading-[1.65] text-muted-ink">
                      {t(a)}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
