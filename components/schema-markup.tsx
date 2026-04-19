import { BUSINESS } from "@/lib/general/constants";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Βιλιώτης Ηλίας - Λογιστικό Φοροτεχνικό Γραφείο",
  alternateName: "Viliotis Ilias Accounting Office",
  description:
    "Λογιστικό - Φοροτεχνικό γραφείο στα Μελίσσια Αττικής. Λογιστικές, φορολογικές και εργατικές υπηρεσίες.",
  url: "https://viliotis.gr",
  telephone: ["+302108044900", "+302106137385"],
  faxNumber: "+302106137385",
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ανδ. Παπανδρέου 2Α, Εμπορικό Κέντρο Βεργίνα, ισόγειο",
    addressLocality: "Μελίσσια",
    postalCode: "15127",
    addressRegion: "Αττική",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.05,
    longitude: 23.832,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Ηλίας Π. Βιλιώτης",
    jobTitle: "Οικονομικός Σύμβουλος",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Πανεπιστήμιο Πειραιώς",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Μελίσσια",
  },
  serviceType: [
    "Λογιστικές Υπηρεσίες",
    "Φορολογικές Υπηρεσίες",
    "Εργατικά - Μισθοδοσία",
  ],
  priceRange: "$$",
  image: "/images/og-image.png",
};

export const SchemaMarkup = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
  />
);
