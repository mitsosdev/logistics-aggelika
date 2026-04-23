"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Phone, Menu, ArrowRight } from "lucide-react";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { BUSINESS } from "@/lib/general/constants";
import { getLocalizedBusiness } from "@/lib/general/business";
import { cn } from "@/lib/general/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/#about", key: "about" },
  { href: "/#services", key: "services" },
  { href: "/#process", key: "process" },
  { href: "/#contact", key: "contact" },
] as const;

const LOCALES = [
  { code: "el", label: "EL" },
  { code: "en", label: "EN" },
] as const;

const LocaleToggle = ({
  size = "sm",
  onSwitch,
}: {
  size?: "sm" | "md";
  onSwitch?: () => void;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (next: string) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
    onSwitch?.();
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border border-rule bg-ivory/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(24,19,46,0.04)] backdrop-blur-sm",
        size === "sm" ? "p-0.5 gap-0.5" : "p-1 gap-1"
      )}
      role="group"
      aria-label="Language switcher"
    >
      {LOCALES.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => handleSwitch(l.code)}
            aria-pressed={active}
            aria-label={l.code === "el" ? "Ελληνικά" : "English"}
            className={cn(
              "relative rounded-full font-display italic transition-all duration-300 cursor-pointer",
              size === "sm"
                ? "px-2.5 py-1 text-[12px]"
                : "px-3.5 py-1.5 text-[13px]",
              active
                ? "bg-linear-to-b from-brand to-brand-deep text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_10px_-2px_rgba(74,30,158,0.45)]"
                : "text-muted-ink hover:text-ink"
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};

export const Navbar = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const biz = getLocalizedBusiness(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-rule/60 bg-ivory/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-10 lg:py-4.5">
          {/* Brand */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 cursor-pointer lg:justify-self-start"
          >
            <div className="relative size-9">
              <Image
                src="/images/logo-v2.webp"
                alt={biz.name}
                fill
                priority
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block leading-[1.05]">
              <p className="font-display text-[19px] text-ink tracking-[0.01em]">
                {biz.name}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-ink">
                {biz.title}
              </p>
            </div>
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden lg:flex items-center gap-9 justify-self-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="group relative px-0.5 py-2 text-[14px] font-medium text-ink/85 transition-colors duration-300 hover:text-brand-deep cursor-pointer"
              >
                {t(link.key)}
                <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-deep transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-4 lg:justify-self-end lg:gap-5">
            <a
              href={BUSINESS.phone.landline1Href}
              className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-[13px] text-muted-ink transition-colors duration-300 hover:text-ink cursor-pointer xl:inline-flex"
            >
              <Phone className="size-3.5 shrink-0 text-brand" strokeWidth={2} />
              <span className="font-mono tabular-nums tracking-[0.02em] text-ink">
                {BUSINESS.phone.landline1}
              </span>
            </a>
            <div className="hidden lg:block">
              <LocaleToggle />
            </div>
            <Button
              asChild
              size="cta-sm"
              className="hidden shrink-0 whitespace-nowrap lg:inline-flex font-medium"
            >
              <Link href="/#contact" className="group">
                {t("book")}
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </Button>

            {/* Mobile hamburger */}
            <SheetTrigger asChild>
              <button
                className="lg:hidden -mr-1.5 p-1.5 text-ink cursor-pointer"
                aria-label="Toggle menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
          </div>
        </div>
      </nav>

      <SheetContent
        side="right"
        className="w-[88%] sm:max-w-sm p-0 bg-ivory text-ink border-l border-rule flex flex-col gap-0"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <div className="flex items-center gap-2.5 p-6 border-b border-rule">
          <div className="relative size-9">
            <Image
              src="/images/logo-v2.webp"
              alt=""
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
          <span className="font-display text-[16px] text-ink">
            {biz.name}
          </span>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 flex-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={closeMobile}
              className="flex items-baseline gap-3 py-3 border-b border-rule/60 text-ink hover:text-brand transition-colors duration-300 cursor-pointer"
            >
              <span className="font-display text-[11px] text-muted-ink tabular-nums">
                0{i + 1}
              </span>
              <span className="text-base font-medium">{t(link.key)}</span>
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-rule space-y-4 bg-paper/40">
          <div className="flex items-center justify-between gap-3">
            <a
              href={BUSINESS.phone.landline1Href}
              className="flex items-center gap-2 text-sm text-ink tabular-nums"
            >
              <Phone className="size-4 text-brand" strokeWidth={1.75} />
              {BUSINESS.phone.landline1}
            </a>
            <LocaleToggle size="md" onSwitch={closeMobile} />
          </div>
          <Button asChild size="cta" className="w-full">
            <Link href="/#contact" onClick={closeMobile}>
              {t("book")}
              <ArrowRight strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
