"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";

export const HeroContent = () => {
  const t = useTranslations("Hero");

  return (
    <section
      id="home"
      className="relative bg-ivory pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden"
    >
      {/* Faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 lg:mb-14 fade-in-up">
          <span className="h-px w-12 bg-ink/30" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
            {t("eyebrow")}
          </span>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          {/* Left: headline + copy */}
          <div
            className="col-span-12 lg:col-span-7 space-y-10 fade-in-up"
            style={{ animationDelay: "120ms" }}
          >
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] tracking-[-0.022em] text-ink font-[500] text-balance">
              <span className="block">{t("title1")}</span>
              <span className="block">{t("title2")}</span>
              <span className="block italic text-emerald-brand font-[450]">
                {t("title3")}
              </span>
            </h1>

            <p className="max-w-xl text-[17px] leading-[1.55] text-muted-ink text-pretty">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-ink text-ivory px-6 py-3.5 rounded-sm text-[14px] font-medium hover:bg-emerald-brand transition-colors duration-300 cursor-pointer"
              >
                {t("cta1")}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 text-ink px-2 py-3.5 text-[14px] font-medium border-b border-ink/40 hover:border-emerald-brand hover:text-emerald-brand transition-colors duration-300 cursor-pointer"
              >
                {t("cta2")}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </a>
              <a
                href={BUSINESS.phone.landline1Href}
                className="hidden sm:inline-flex items-center gap-2 ml-2 text-[13px] text-muted-ink hover:text-ink transition-colors tabular-nums cursor-pointer"
              >
                <Phone className="size-3.5" strokeWidth={1.75} />
                {BUSINESS.phone.landline1}
              </a>
            </div>
          </div>

          {/* Right: portrait card */}
          <div
            className="col-span-12 lg:col-span-5 lg:pl-6 fade-in-up"
            style={{ animationDelay: "280ms" }}
          >
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper">
                <Image
                  src="/images/hero.jpg"
                  alt={t("captionName")}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                {/* subtle monochrome overlay */}
                <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
              </div>

              {/* Emerald rule */}
              <div className="absolute -left-3 top-6 bottom-6 w-[3px] bg-emerald-brand hidden lg:block" />

              <figcaption className="mt-4 pl-4 lg:pl-0 border-l-2 border-emerald-brand lg:border-l-0 lg:border-t lg:border-ink/15 lg:pt-4 max-w-xs">
                <p className="text-[13px] font-semibold text-ink">
                  {t("captionName")}
                </p>
                <p className="text-[12px] text-muted-ink leading-snug mt-0.5">
                  {t("captionRole")}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
};
