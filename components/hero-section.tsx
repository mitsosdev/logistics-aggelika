import { getTranslations } from "next-intl/server";
import { HeroContent } from "@/components/hero-content";
import { TrustTicker } from "@/components/trust-ticker";

export const HeroSection = async () => {
  await getTranslations("Hero");

  return (
    <div className="relative flex flex-col lg:h-[calc(100svh-72px)] lg:min-h-152">
      <div className="flex-1 flex flex-col">
        <HeroContent />
      </div>
      <TrustTicker />
    </div>
  );
};
