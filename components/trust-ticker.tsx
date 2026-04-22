import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

type GroupProps = {
  items: string[];
  ariaHidden?: boolean;
};

const Group = ({ items, ariaHidden = false }: GroupProps) => (
  <div
    className="flex gap-14 pr-14 shrink-0"
    aria-hidden={ariaHidden || undefined}
  >
    {items.map((item, i) => (
      <span
        key={i}
        className="flex items-center gap-2.5 shrink-0 whitespace-nowrap text-[13px] text-ink/70 tracking-tight"
      >
        <Check className="size-3.5 text-brand" strokeWidth={2.25} />
        {item}
      </span>
    ))}
  </div>
);

export const TrustTicker = async () => {
  const t = await getTranslations("Trust");
  const base = [t("item1"), t("item2"), t("item3"), t("item4"), t("item5")];
  const items = [...base, ...base, ...base];

  return (
    <section
      className="relative border-y border-ink/10 bg-ivory overflow-hidden"
      aria-label="Πιστοποιήσεις"
    >
      <div className="relative py-5">
        <div
          className="flex marquee-track w-max"
          style={{ animationDuration: "90s" }}
        >
          <Group items={items} />
          <Group items={items} ariaHidden />
        </div>

        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-ivory to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-ivory to-transparent" />
      </div>
    </section>
  );
};
