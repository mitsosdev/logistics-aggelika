import { BUSINESS } from "@/lib/general/constants";

export const getLocalizedBusiness = (locale: string) => {
  const isEn = locale === "en";
  return {
    ...BUSINESS,
    name: isEn ? BUSINESS.nameEn : BUSINESS.name,
    title: isEn ? BUSINESS.titleEn : BUSINESS.title,
    degree: isEn ? BUSINESS.degreeEn : BUSINESS.degree,
    address: {
      ...BUSINESS.address,
      street: isEn ? BUSINESS.address.streetEn : BUSINESS.address.street,
      building: isEn ? BUSINESS.address.buildingEn : BUSINESS.address.building,
      city: isEn ? BUSINESS.address.cityEn : BUSINESS.address.city,
      full: isEn ? BUSINESS.address.fullEn : BUSINESS.address.full,
    },
    hours: {
      ...BUSINESS.hours,
      saturday: isEn ? BUSINESS.hours.saturdayEn : BUSINESS.hours.saturday,
      sunday: isEn ? BUSINESS.hours.sundayEn : BUSINESS.hours.sunday,
    },
  };
};
