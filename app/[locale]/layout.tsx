import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { Providers } from "@/components/providers";
import { BaseLayoutProps } from "@/types/page-props";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext", "greek"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Βιλιώτης Ηλίας | Λογιστικό Γραφείο Μελίσσια",
    template: "%s | Βιλιώτης Ηλίας",
  },
  description:
    "Λογιστικό - Φοροτεχνικό γραφείο στα Μελίσσια Αττικής. Λογιστικές, φορολογικές και εργατικές υπηρεσίες για ιδιώτες και επιχειρήσεις. Ηλίας Π. Βιλιώτης, Οικονομικός Σύμβουλος.",
  keywords: [
    "λογιστικό γραφείο",
    "φοροτεχνικό γραφείο",
    "Μελίσσια",
    "λογιστής",
    "φορολογικές δηλώσεις",
    "μισθοδοσία",
    "Βιλιώτης",
    "οικονομικός σύμβουλος",
    "accounting office",
    "tax consultant",
    "Melissia",
  ],
  authors: [{ name: "Βιλιώτης Ηλίας" }],
  openGraph: {
    title: "Βιλιώτης Ηλίας | Λογιστικό Γραφείο Μελίσσια",
    description:
      "Αξιόπιστες λογιστικές, φορολογικές και εργατικές υπηρεσίες στα Μελίσσια Αττικής.",
    type: "website",
    locale: "el_GR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1920,
        height: 1080,
        alt: "Βιλιώτης Ηλίας - Λογιστικό Γραφείο",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Βιλιώτης Ηλίας | Λογιστικό Γραφείο Μελίσσια",
    description:
      "Αξιόπιστες λογιστικές, φορολογικές και εργατικές υπηρεσίες στα Μελίσσια Αττικής.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: BaseLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
