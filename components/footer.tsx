import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BUSINESS } from "@/lib/general/constants";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#process", key: "process" },
  { href: "#contact", key: "contact" },
] as const;

const SERVICE_LINKS = [
  "Λογιστικά & Τήρηση Βιβλίων",
  "Φοροτεχνικά & Σχεδιασμός",
  "Εργατικά & Μισθοδοσία",
  "Φορολογικός Σχεδιασμός",
] as const;

const Footer = async () => {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");

  return (
    <footer className="relative bg-ink text-ivory">
      {/* Top band: big wordmark */}
      <div className="border-b border-ivory/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative size-14 rounded-sm bg-white/95">
                  <Image
                    src="/images/logo.webp"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ivory/50">
                  {BUSINESS.titleEn} · Est. 1993
                </p>
              </div>
              <h3 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] font-[450]">
                {BUSINESS.name}
                <span className="italic text-emerald-brand">.</span>
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <p className="text-[15px] leading-[1.6] text-ivory/70 max-w-md">
                {t("description")}
              </p>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-ivory border-b border-ivory/40 hover:border-emerald-brand hover:text-emerald-brand transition-colors duration-300 pb-1"
              >
                {tNav("book")}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle band: columns */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5">
              {t("navHeading")}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-[14px] text-ivory/85 hover:text-emerald-brand transition-colors duration-300 cursor-pointer"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5">
              {t("servicesHeading")}
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[14px] text-ivory/85 hover:text-emerald-brand transition-colors duration-300 cursor-pointer"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5">
              {t("contactHeading")}
            </h4>
            <ul className="space-y-3 text-[14px] text-ivory/85">
              <li>{BUSINESS.address.street}</li>
              <li>
                {BUSINESS.address.city} {BUSINESS.address.zip}
              </li>
              <li>
                <a
                  href={BUSINESS.phone.landline1Href}
                  className="hover:text-emerald-brand transition-colors tabular-nums cursor-pointer"
                >
                  {BUSINESS.phone.landline1}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-emerald-brand transition-colors cursor-pointer break-all"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ivory/50 mb-5">
              {t("hoursHeading")}
            </h4>
            <ul className="space-y-3 text-[14px] text-ivory/85">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-brand animate-pulse" />
                Δευ — Παρ · {BUSINESS.hours.weekdays}
              </li>
              <li>Σάββατο · {BUSINESS.hours.saturday}</li>
              <li>Κυριακή · {BUSINESS.hours.sunday}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-ivory/50">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. {t("rights")}
          </p>
          <a
            href="https://hexaigon.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-ivory/50 hover:text-emerald-brand transition-colors cursor-pointer"
          >
            Crafted by Hexaigon
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
