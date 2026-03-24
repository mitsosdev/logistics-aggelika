import { getTranslations } from "next-intl/server";
import { HeroContent } from "@/components/hero-content";

export const HeroSection = async () => {
  await getTranslations("Hero");

  return <HeroContent />;
};
