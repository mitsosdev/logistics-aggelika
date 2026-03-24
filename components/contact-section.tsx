import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { BUSINESS } from "@/lib/general/constants";
import {
  MapPin,
  Phone,
  Mail,
  Printer,
  Clock,
} from "lucide-react";

const CONTACT_ITEMS = [
  {
    key: "address",
    icon: MapPin,
    lines: [
      BUSINESS.address.street,
      BUSINESS.address.building,
      `${BUSINESS.address.city} ${BUSINESS.address.zip}`,
    ],
  },
  {
    key: "phone",
    icon: Phone,
    lines: [BUSINESS.phone.landline1, BUSINESS.phone.landline2],
    href: BUSINESS.phone.landline1Href,
  },
  {
    key: "email",
    icon: Mail,
    lines: [BUSINESS.email],
    href: `mailto:${BUSINESS.email}`,
  },
  {
    key: "fax",
    icon: Printer,
    lines: [BUSINESS.phone.fax],
  },
] as const;

export const ContactSection = async () => {
  const t = await getTranslations("Contact");

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            {t("label")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-5">
            {t("title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: Contact info + map */}
          <div className="space-y-6">
            {/* Contact items */}
            <div className="space-y-5">
              {CONTACT_ITEMS.map((item) => {
                const { key, icon: Icon, lines } = item;
                const href = "href" in item ? item.href : undefined;
                return (
                <div key={key} className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">
                      {t(key as "address")}
                    </p>
                    {lines.map((line, i) =>
                      href && i === 0 ? (
                        <a
                          key={i}
                          href={href}
                          className="text-sm text-muted-foreground hover:text-gold transition-colors duration-300 cursor-pointer block"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
                );
              })}

              {/* Working hours */}
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">{t("hours")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("weekdays")}: {BUSINESS.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("saturday")}: {BUSINESS.hours.saturday}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("sunday")}: {BUSINESS.hours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border h-52 lg:h-64">
              <iframe
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            </div>
          </div>

          {/* Right: Contact form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
