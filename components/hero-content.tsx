"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export const HeroContent = () => {
  const t = useTranslations("Hero");

  return (
    <section
      id="home"
      className="relative bg-ivory overflow-hidden flex-1 min-h-0 flex flex-col"
    >
      {/* Ambient background — subtle purple + saffron washes on ivory */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-32 -top-40 h-130 w-130 rounded-full bg-brand/12 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-105 w-105 rounded-full bg-saffron/18 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-115 w-115 rounded-full bg-brand-deep/10 blur-3xl" />
        {/* Fine grid overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #18132E 1px, transparent 1px), linear-gradient(to bottom, #18132E 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 min-h-0 grid-cols-1 items-center gap-8 px-6 pb-8 pt-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:pb-8 lg:pt-8">
        {/* LEFT — copy */}
        <div
          className="fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          {/* Eyebrow with pulsing saffron dot */}
          <div className="mb-6 inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brand-deep">
            <span className="relative flex size-1.5 items-center justify-center">
              <span className="absolute inline-flex size-3.5 rounded-full bg-saffron/25" />
              <span className="relative size-1.5 rounded-full bg-saffron" />
            </span>
            <span>{t("eyebrow")}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.5rem,4.8vw,4.25rem)] font-normal leading-[1.04] tracking-[-0.015em] text-ink">
            <span className="block">{t("title1")}</span>
            <span className="block">
              {t("title2Before")}{" "}
              <span className="relative inline-block font-[420] italic text-brand-deep">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[1%] bottom-[0.12em] z-0 h-[0.26em] -skew-x-[4deg] rounded-[2px] bg-saffron/90"
                />
                <span className="relative z-10">{t("title2Em")}</span>
              </span>{" "}
              {t("title2After")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-120 text-[16px] leading-[1.6] text-muted-ink text-pretty">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="cta">
              <Link href="/#contact">
                {t("cta1")}
                <ArrowRight strokeWidth={2.2} />
              </Link>
            </Button>
            <Button asChild size="cta" variant="outline">
              <Link href="/#services">
                {t("cta2")}
                <ArrowRight strokeWidth={2} />
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT — photo with sticker + caption chip */}
        <div
          className="fade-in-up"
          style={{ animationDelay: "220ms" }}
        >
          <div className="relative mx-auto aspect-4/5 w-full max-w-100">
            {/* Photo */}
            <div
              className="absolute inset-0 overflow-hidden rounded-image bg-paper"
              style={{
                boxShadow:
                  "0 40px 80px -24px rgba(24,19,46,0.22), 0 4px 16px rgba(24,19,46,0.06)",
              }}
            >
              <Image
                src="/images/hero-image.png"
                alt={t("photoAlt")}
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-top"
              />
            </div>

            {/* Logo sticker — top-left, overhangs */}
            <div
              aria-hidden
              className="absolute -left-5 -top-5 z-10 grid size-20 place-items-center rounded-full bg-ivory lg:-left-6 lg:-top-6 lg:size-22"
              style={{
                boxShadow: "0 12px 32px rgba(24,19,46,0.14)",
              }}
            >
              <div className="relative size-[62%]">
                <Image
                  src="/images/logo-v2.webp"
                  alt=""
                  fill
                  sizes="52px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Caption chip — bottom-left, overhangs */}
            <div
              className="absolute -left-3 bottom-7 z-10 flex items-center gap-3 rounded-2xl bg-ivory px-3.5 py-3 lg:-left-4"
              style={{
                boxShadow: "0 16px 40px rgba(24,19,46,0.14)",
              }}
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-deep/8 text-brand-deep">
                <CheckCircle2 className="size-4.5" strokeWidth={2} />
              </div>
              <div className="leading-[1.3]">
                <p className="text-[13px] font-semibold text-ink">
                  {t("captionTitle")}
                </p>
                <p className="mt-0.5 text-[11.5px] text-muted-ink">
                  {t("captionMeta")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
