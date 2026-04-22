import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { CircleIcon } from "@/components/CircleIcon";
import { ExpandMap } from "@/components/expand-map";
import { BUSINESS } from "@/lib/general/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const BRAND_COLOR = "#6B2FD6";

export const ContactSection = async () => {
  const t = await getTranslations("Contact");

  return (
    <section id="contact" className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-ink/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
                {t("label")}
              </span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink font-[500] mb-6 text-balance">
              {t("title")}
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted-ink max-w-xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7 pt-6">
            <ContactForm />
          </div>

          {/* Right: Info + Map */}
          <aside className="lg:col-span-5 space-y-8">
            <ContactItem
              icon={MapPin}
              label={t("address")}
              lines={[
                BUSINESS.address.street,
                BUSINESS.address.building,
                `${BUSINESS.address.city} ${BUSINESS.address.zip}`,
              ]}
            />
            <ContactItem
              icon={Phone}
              label={t("phone")}
              lines={[
                { text: BUSINESS.phone.landline1, href: BUSINESS.phone.landline1Href },
                { text: BUSINESS.phone.landline2, href: BUSINESS.phone.landline2Href },
              ]}
              tabular
            />
            <ContactItem
              icon={Mail}
              label={t("email")}
              lines={[BUSINESS.email]}
              href={`mailto:${BUSINESS.email}`}
            />
            <ContactItem
              icon={Clock}
              label={t("hours")}
              lines={[
                `${t("weekdays")} — ${BUSINESS.hours.weekdays}`,
                `${t("saturday")} — ${BUSINESS.hours.saturday}`,
                `${t("sunday")} — ${BUSINESS.hours.sunday}`,
              ]}
            />

            {/* Map */}
            <div className="mt-4">
              <ExpandMap
                address={BUSINESS.address.full}
                mapsUrl={BUSINESS.googleMapsLink}
                coordinates="38.0500° N · 23.8320° E"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

type ContactLine = string | { text: string; href: string };

type ContactItemProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  lines: ContactLine[];
  href?: string;
  tabular?: boolean;
};

const ContactItem = ({
  icon: Icon,
  label,
  lines,
  href,
  tabular,
}: ContactItemProps) => (
  <div className="flex gap-4 border-b border-ink/10 pb-6 last:border-0">
    <div className="shrink-0 mt-1">
      <CircleIcon
        color={BRAND_COLOR}
        size={44}
        icon={<Icon className="size-4" strokeWidth={1.75} />}
      />
    </div>
    <div className="space-y-0.5">
      <p className="text-[11px] uppercase tracking-wider text-muted-ink mb-1.5">
        {label}
      </p>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        let lineHref: string | undefined;
        if (typeof line === "string") {
          lineHref = i === 0 ? href : undefined;
        } else {
          lineHref = line.href;
        }
        const numClass = tabular ? "tabular-nums" : "";
        return lineHref ? (
          <a
            key={i}
            href={lineHref}
            className={`block text-[14.5px] text-ink hover:text-brand transition-colors duration-300 cursor-pointer ${numClass}`}
          >
            {text}
          </a>
        ) : (
          <p key={i} className={`text-[14.5px] text-ink/80 ${numClass}`}>
            {text}
          </p>
        );
      })}
    </div>
  </div>
);
