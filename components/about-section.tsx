import { getTranslations } from "next-intl/server";
import { Award, ShieldCheck, GraduationCap } from "lucide-react";

const CARDS = [
  { key: "card1", icon: Award },
  { key: "card2", icon: ShieldCheck },
  { key: "card3", icon: GraduationCap },
] as const;

export const AboutSection = async () => {
  const t = await getTranslations("About");

  return (
    <section id="about" className="py-20 lg:py-28">
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
            {t("description")}
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CARDS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group relative rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {t(`${key}Title` as "card1Title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`${key}Desc` as "card1Desc")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
