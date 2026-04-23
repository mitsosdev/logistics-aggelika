import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getLocalizedBusiness } from "@/lib/general/business";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowUpRight,
  Hexagon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/#about", key: "about" },
  { href: "/#services", key: "services" },
  { href: "/#process", key: "process" },
  { href: "/#contact", key: "contact" },
] as const;

const SERVICE_KEYS = ["s1Title", "s2Title", "s3Title", "s4Title"] as const;

const Footer = async () => {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tServices = await getTranslations("Services");
  const tContact = await getTranslations("Contact");
  const locale = await getLocale();
  const biz = getLocalizedBusiness(locale);

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full bg-brand/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 right-0 size-[480px] rounded-full bg-brand-deep/30 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF8F3 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* CTA ribbon */}
      <div className="relative border-b border-ivory/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-flex size-9 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                <Sparkles className="size-4" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.01em] font-[500]">
                  {t("ctaTitle")}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-ivory/65 max-w-lg">
                  {t("ctaSub")}
                </p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2.5 self-start lg:self-auto rounded-full bg-brand px-6 py-3.5 text-[13.5px] font-medium text-ivory shadow-[0_10px_30px_-12px_rgba(107,47,214,0.8)] hover:bg-brand-deep transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              {t("ctaButton")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Top band: wordmark + description */}
      <div className="relative border-b border-ivory/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative size-14 rounded-sm">
                  <Image
                    src="/images/logo-v2.webp"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ivory/50">
                  {t("tagline")}
                </p>
              </div>
              <h3 className="font-instrument italic text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.01em]">
                {biz.name}
                <span className="text-brand">.</span>
              </h3>
              <div className="mt-6 flex items-center gap-3 text-[12px] text-ivory/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                  {t("openToday")} · {biz.hours.weekdays}
                </span>
                <span className="h-3 w-px bg-ivory/15" />
                <span>{t("since")}</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] leading-[1.6] text-ivory/70 max-w-md">
                {t("description")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={biz.phone.landline1Href}
                  className="group inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.03] px-4 py-2 text-[12.5px] text-ivory/85 hover:border-brand hover:text-brand transition-colors duration-300 cursor-pointer"
                >
                  <Phone className="size-3.5" strokeWidth={1.75} />
                  <span className="tabular-nums">{biz.phone.landline1}</span>
                </a>
                <a
                  href={`mailto:${biz.email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.03] px-4 py-2 text-[12.5px] text-ivory/85 hover:border-brand hover:text-brand transition-colors duration-300 cursor-pointer"
                >
                  <Mail className="size-3.5" strokeWidth={1.75} />
                  {t("contactHeading")}
                </a>
                <a
                  href={biz.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[0.03] px-4 py-2 text-[12.5px] text-ivory/85 hover:border-brand hover:text-brand transition-colors duration-300 cursor-pointer"
                >
                  <MapPin className="size-3.5" strokeWidth={1.75} />
                  {biz.address.city}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle band: columns */}
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("navHeading")}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[14px] text-ivory/85 hover:text-brand transition-colors duration-300 cursor-pointer"
                  >
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("servicesHeading")}
            </h4>
            <ul className="space-y-3">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href="/#services"
                    className="group inline-flex items-center gap-1.5 text-[14px] text-ivory/85 hover:text-brand transition-colors duration-300 cursor-pointer"
                  >
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                    {tServices(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("contactHeading")}
            </h4>
            <ul className="space-y-3 text-[14px] text-ivory/85">
              <li>{biz.address.street}</li>
              <li>
                {biz.address.city} {biz.address.zip}
              </li>
              <li>
                <a
                  href={biz.phone.landline1Href}
                  className="hover:text-brand transition-colors tabular-nums cursor-pointer"
                >
                  {biz.phone.landline1}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${biz.email}`}
                  className="hover:text-brand transition-colors cursor-pointer wrap-anywhere"
                >
                  {biz.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("hoursHeading")}
            </h4>
            <ul className="space-y-3 text-[14px] text-ivory/85">
              <li className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand animate-pulse" />
                <span className="flex flex-wrap gap-x-1.5">
                  <span>{t("weekdaysShort")}</span>
                  <span className="text-ivory/55">·</span>
                  <span className="tabular-nums">{biz.hours.weekdays}</span>
                </span>
              </li>
              <li className="flex flex-wrap gap-x-1.5">
                <span>{t("saturdayShort")}</span>
                <span className="text-ivory/55">·</span>
                <span>{biz.hours.saturday}</span>
              </li>
              <li className="flex flex-wrap gap-x-1.5">
                <span>{t("sundayShort")}</span>
                <span className="text-ivory/55">·</span>
                <span>{biz.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-ivory/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[12px] text-ivory/50">
            &copy; {new Date().getFullYear()} {biz.name}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-ivory/55">
            <Link
              href="/#contact"
              className="hover:text-brand transition-colors cursor-pointer whitespace-nowrap"
            >
              {t("policy")}
            </Link>
            <span className="h-3 w-px bg-ivory/15" />
            <Link
              href="/#contact"
              className="hover:text-brand transition-colors cursor-pointer whitespace-nowrap"
            >
              {t("terms")}
            </Link>
            <span className="h-3 w-px bg-ivory/15" />
            <a
              href="https://hexaigon.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-brand transition-colors cursor-pointer whitespace-nowrap"
            >
              <Hexagon className="size-3.5 text-brand" strokeWidth={2} />
              Made by Hexaigon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
