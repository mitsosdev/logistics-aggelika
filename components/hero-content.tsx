"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/general/constants";

export const HeroContent = () => {
  const t = useTranslations("Hero");

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Professional accounting consultation"
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/75 to-navy/50" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:32px_32px]" />

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-16">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-sm">
            <div className="size-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-gold-light">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-white/75 leading-relaxed max-w-xl">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-navy font-semibold gap-2 cursor-pointer"
            >
              <a href="#contact">
                {t("cta1")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white gap-2 cursor-pointer"
            >
              <a href="#services">{t("cta2")}</a>
            </Button>
          </div>

          {/* Quick contact */}
          <div className="flex items-center gap-4 pt-4">
            <a
              href={BUSINESS.phone.landline1Href}
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              <Phone className="size-4" />
              <span className="text-sm font-medium">
                {BUSINESS.phone.landline1}
              </span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={BUSINESS.phone.landline2Href}
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              <Phone className="size-4" />
              <span className="text-sm font-medium">
                {BUSINESS.phone.landline2}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
