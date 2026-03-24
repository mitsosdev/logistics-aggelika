import { getTranslations } from "next-intl/server";
import Image from "next/image";

const SERVICES = [
  {
    key: "accounting",
    image: "/images/services/accounting.jpg",
    alt: "Accounting and bookkeeping services",
  },
  {
    key: "tax",
    image: "/images/services/tax.jpg",
    alt: "Tax consulting and declarations",
  },
  {
    key: "payroll",
    image: "/images/services/payroll.jpg",
    alt: "Payroll and labor services",
  },
] as const;

export const ServicesSection = async () => {
  const t = await getTranslations("Services");

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/50">
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

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SERVICES.map(({ key, image, alt }) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/30 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold text-white">
                  {t(key)}
                </h3>
              </div>

              {/* Description */}
              <div className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc` as "accountingDesc")}
                </p>
              </div>

              {/* Gold accent line */}
              <div className="h-0.5 bg-gold/0 group-hover:bg-gold transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
