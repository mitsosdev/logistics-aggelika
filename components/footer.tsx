import { getTranslations } from "next-intl/server";
import { BUSINESS } from "@/lib/general/constants";
import { Phone, Mail, MapPin, Hexagon } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

const Footer = async () => {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");

  return (
    <footer className="border-t bg-navy text-white/80">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gold text-navy font-display font-bold text-sm">
                HB
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {BUSINESS.name}
                </p>
                <p className="text-xs text-white/50">{BUSINESS.title}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-300 cursor-pointer"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4">
              {t("contactInfo")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="size-4 mt-0.5 shrink-0 text-gold" />
                <span>
                  {BUSINESS.address.street}, {BUSINESS.address.city}{" "}
                  {BUSINESS.address.zip}
                </span>
              </li>
              <li>
                <a
                  href={BUSINESS.phone.landline1Href}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors duration-300 cursor-pointer"
                >
                  <Phone className="size-4 shrink-0 text-gold" />
                  {BUSINESS.phone.landline1}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors duration-300 cursor-pointer"
                >
                  <Mail className="size-4 shrink-0 text-gold" />
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. {t("rights")}
          </p>
          <a
            href="https://hexaigon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            <Hexagon className="size-3.5 text-primary" />
            Made by Hexaigon
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
