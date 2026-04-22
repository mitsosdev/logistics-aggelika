import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    prefix: "s1",
    image: "/images/services/accounting.jpg",
    alt: "Λογιστικά και τήρηση βιβλίων",
  },
  {
    prefix: "s2",
    image: "/images/services/tax.jpg",
    alt: "Φοροτεχνικά και στρατηγική",
  },
  {
    prefix: "s3",
    image: "/images/services/payroll.jpg",
    alt: "Εργατικά και μισθοδοσία",
  },
  {
    prefix: "s4",
    image: "/images/services/other.jpg",
    alt: "Λοιπές υπηρεσίες — επιδόματα, gov.gr",
  },
] as const;

type Prefix = (typeof SERVICES)[number]["prefix"];

export const ServicesSection = async () => {
  const t = await getTranslations("Services");

  return (
    <section id="services" className="relative bg-paper/50 py-24 lg:py-40 border-y border-ink/8">
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
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink font-[500] text-balance">
              {t("title")}
              <span className="italic text-muted-ink font-[450]">
                {" "}
                {t("titleAccent")}
              </span>
            </h2>
          </div>
        </div>

        {/* Services list */}
        <div className="divide-y divide-ink/10">
          {SERVICES.map(({ prefix, image, alt }) => (
            <ServiceRow
              key={prefix}
              number={t(`${prefix}Number` as `${Prefix}Number`)}
              title={t(`${prefix}Title` as `${Prefix}Title`)}
              desc={t(`${prefix}Desc` as `${Prefix}Desc`)}
              bullets={[
                t(`${prefix}Bullet1` as `${Prefix}Bullet1`),
                t(`${prefix}Bullet2` as `${Prefix}Bullet2`),
                t(`${prefix}Bullet3` as `${Prefix}Bullet3`),
              ]}
              image={image}
              alt={alt}
              readMore={t("readMore")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type ServiceRowProps = {
  number: string;
  title: string;
  desc: string;
  bullets: readonly string[];
  image: string;
  alt: string;
  readMore: string;
};

const ServiceRow = ({
  number,
  title,
  desc,
  bullets,
  image,
  alt,
  readMore,
}: ServiceRowProps) => (
  <article className="group grid grid-cols-[auto_1fr] gap-x-4 gap-y-6 py-10 lg:grid-cols-12 lg:gap-6 lg:gap-x-10 lg:py-14 items-start">
    {/* Number */}
    <div className="lg:col-span-1">
      <span className="font-display text-[clamp(1.5rem,2.25vw,2rem)] text-muted-ink/60 tabular-nums font-[450]">
        {number}
      </span>
    </div>

    {/* Title + desc + bullets */}
    <div className="lg:col-span-6 space-y-6 min-w-0">
      <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-tight text-ink font-[500]">
        {title}
      </h3>
      <p className="text-[15.5px] leading-[1.6] text-muted-ink max-w-xl">
        {desc}
      </p>
      <ul className="space-y-2 pt-1">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 text-[13px] text-ink/80"
          >
            <span className="h-px w-6 bg-brand shrink-0" />
            {b}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink border-b border-ink/30 hover:border-brand hover:text-brand transition-colors duration-300 pb-0.5 cursor-pointer"
      >
        {readMore}
        <ArrowUpRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </a>
    </div>

    {/* Image */}
    <div className="col-span-2 lg:col-span-5 lg:col-start-auto lg:pl-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-image bg-ivory">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
      </div>
    </div>
  </article>
);
