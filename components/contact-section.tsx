import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { BUSINESS } from "@/lib/general/constants";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

export const ContactSection = async () => {
  const t = await getTranslations("Contact");

  return (
    <section id="contact" className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-ink/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
                {t("label")}
              </span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink font-[500] mb-6 text-balance">
              {t("title")}
            </h2>
            <p className="text-[16px] leading-[1.6] text-muted-ink max-w-xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Form */}
          <div className="col-span-12 lg:col-span-7 pt-6">
            <ContactForm />
          </div>

          {/* Right: Info + Map */}
          <aside className="col-span-12 lg:col-span-5 space-y-8">
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
            <a
              href={BUSINESS.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 block relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-ink/15 hover:border-emerald-brand transition-colors duration-300"
            >
              <iframe
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
                className="pointer-events-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ivory/90 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <p className="text-[12px] font-medium text-ink bg-ivory/90 backdrop-blur-sm px-2.5 py-1.5 rounded-sm">
                  {BUSINESS.address.full}
                </p>
                <span className="flex items-center gap-1 text-[11px] font-medium text-ink bg-ivory/90 backdrop-blur-sm px-2.5 py-1.5 rounded-sm group-hover:bg-emerald-brand group-hover:text-ivory transition-colors duration-300">
                  Open
                  <ArrowUpRight className="size-3" strokeWidth={2} />
                </span>
              </div>
            </a>
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
    <div className="shrink-0 mt-1 flex size-9 items-center justify-center rounded-sm bg-paper text-ink">
      <Icon className="size-4" strokeWidth={1.75} />
    </div>
    <div className="space-y-0.5">
      <p className="text-[11px] uppercase tracking-wider text-muted-ink mb-1.5">
        {label}
      </p>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const lineHref =
          typeof line === "string" ? (i === 0 ? href : undefined) : line.href;
        const numClass = tabular ? "tabular-nums" : "";
        return lineHref ? (
          <a
            key={i}
            href={lineHref}
            className={`block text-[14.5px] text-ink hover:text-emerald-brand transition-colors duration-300 cursor-pointer ${numClass}`}
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
