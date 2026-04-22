export const BUSINESS = {
  name: "Βιλιώτης Ηλίας",
  nameEn: "Viliotis Ilias",
  title: "Οικονομικός Σύμβουλος",
  titleEn: "Financial Consultant",
  brandInitials: "HB",
  degree: "Πτυχιούχος Α.Β.Σ.Π. (Πανεπιστήμιο Πειραιώς)",
  degreeEn: "Graduate of A.B.S.P. (University of Piraeus)",

  address: {
    street: "Ανδ. Παπανδρέου 2Α",
    streetEn: "And. Papandreou 2A",
    building: "Εμπορικό Κέντρο Βεργίνα, ισόγειο",
    buildingEn: "Vergina Commercial Center, ground floor",
    city: "Μελίσσια",
    cityEn: "Melissia",
    zip: "151 27",
    full: "Ανδ. Παπανδρέου 2Α, Μελίσσια ΤΚ 151 27",
    fullEn: "And. Papandreou 2A, Melissia 151 27",
  },

  phone: {
    landline1: "210 80 44 900",
    landline1Href: "tel:+302108044900",
    landline2: "210 61 37 385",
    landline2Href: "tel:+302106137385",
    fax: "210 61 37 385",
  },

  email: "viliotisilias@hotmail.com",
  emailSecondary: "viliotis@otenet.gr",

  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.5!2d23.832!3d38.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAzJzAwLjAiTiAyM8KwNDknNTUuMiJF!5e0!3m2!1sel!2sgr!4v1",
  googleMapsLink:
    "https://www.google.com/maps/search/Ανδ.+Παπανδρέου+2Α+Μελίσσια+151+27",
  googlePlaceId: "15838908543954449373",
  googleReviewsUrl:
    "https://www.google.com/maps?cid=15838908543954449373",

  hours: {
    weekdays: "09:00 - 16:00",
    saturday: "Κατόπιν ραντεβού",
    saturdayEn: "By appointment",
    sunday: "Κλειστά",
    sundayEn: "Closed",
  },

  categories: [
    "Λογιστικά",
    "Φορολογικά",
    "Εργατικά",
  ] as const,
} as const;
