"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/examples/language-switcher";
import { ThemeSwitcher } from "@/components/examples/ThemeSwitcher";
import { BUSINESS } from "@/lib/general/constants";

const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

export const Navbar = () => {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-navy text-gold font-display font-bold text-sm">
              HB
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {BUSINESS.name}
              </p>
              <p
                className={`text-xs leading-tight transition-colors duration-300 ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                {BUSINESS.title}
              </p>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 cursor-pointer ${
                  scrolled
                    ? "text-foreground hover:text-gold hover:bg-accent"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={BUSINESS.phone.landline1Href}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                scrolled
                  ? "text-gold hover:text-gold/80"
                  : "text-gold-light hover:text-white"
              }`}
            >
              <Phone className="size-3.5" />
              {BUSINESS.phone.landline1}
            </a>
            <div className="flex items-center gap-1 ml-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-md cursor-pointer transition-colors duration-300 ${
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobile}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-background shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-navy text-gold font-display font-bold text-xs">
                HB
              </div>
              <span className="font-semibold text-sm">{BUSINESS.name}</span>
            </div>
            <button
              onClick={closeMobile}
              className="p-1.5 rounded-md hover:bg-accent cursor-pointer transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={closeMobile}
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors duration-300 cursor-pointer"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="p-4 border-t space-y-3">
            <Button asChild className="w-full gap-2" size="sm">
              <a href={BUSINESS.phone.landline1Href}>
                <Phone className="size-3.5" />
                {t("callUs")}
              </a>
            </Button>
            <div className="flex items-center gap-2 justify-center">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
