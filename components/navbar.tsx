"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";
import { cn } from "@/lib/general/utils";

const NAV_LINKS = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#process", key: "process" },
  { href: "#contact", key: "contact" },
] as const;

export const Navbar = () => {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-ivory/85 backdrop-blur-xl border-rule"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="mx-auto max-w-[1280px] flex h-[72px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3.5 cursor-pointer">
            <div className="relative size-11">
              <Image
                src="/images/logo.webp"
                alt="Βιλιώτης Ηλίας"
                fill
                priority
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-display text-[16px] text-ink tracking-tight">
                {BUSINESS.name}
              </p>
              <p className="text-[10px] text-muted-ink tracking-[0.14em] uppercase mt-0.5">
                {BUSINESS.title}
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="relative text-[13px] font-medium text-ink/80 hover:text-ink transition-colors duration-300 cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-emerald-brand after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={BUSINESS.phone.landline1Href}
              className="flex items-center gap-1.5 text-[13px] font-medium text-muted-ink hover:text-ink transition-colors duration-300 tabular-nums cursor-pointer"
            >
              <Phone className="size-3.5" strokeWidth={1.75} />
              {BUSINESS.phone.landline1}
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 bg-ink text-ivory text-[13px] font-medium px-4 py-2.5 rounded-sm hover:bg-emerald-brand transition-colors duration-300 cursor-pointer"
            >
              {t("book")}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 text-ink cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          onClick={closeMobile}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 bg-ivory shadow-2xl transition-transform duration-400 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-rule">
            <div className="flex items-center gap-2.5">
              <div className="relative size-9">
                <Image
                  src="/images/logo.webp"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-sm text-ink">
                {BUSINESS.name}
              </span>
            </div>
            <button
              onClick={closeMobile}
              className="p-1.5 text-ink cursor-pointer"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.key}
                href={link.href}
                onClick={closeMobile}
                className="flex items-baseline gap-3 py-3 border-b border-rule/60 text-ink hover:text-emerald-brand transition-colors duration-300 cursor-pointer"
              >
                <span className="font-display text-[11px] text-muted-ink tabular-nums">
                  0{i + 1}
                </span>
                <span className="text-base font-medium">{t(link.key)}</span>
              </a>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-rule space-y-3 bg-paper/40">
            <a
              href={BUSINESS.phone.landline1Href}
              className="flex items-center gap-2 text-sm text-ink tabular-nums"
            >
              <Phone className="size-4" strokeWidth={1.75} />
              {BUSINESS.phone.landline1}
            </a>
            <a
              href="#contact"
              onClick={closeMobile}
              className="flex items-center justify-center gap-1.5 w-full bg-ink text-ivory text-sm font-medium px-4 py-3 rounded-sm hover:bg-emerald-brand transition-colors duration-300"
            >
              {t("book")}
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
