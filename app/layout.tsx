import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: {
    default: "Pirate Travel Agency — Групови Екскурзии от Благоевград | Гърция, Турция, Сърбия",
    template: "%s | Pirate Travel Agency",
  },
  description:
    "Организирани групови екскурзии от Благоевград до Гърция, Турция, Сърбия, Румъния и още. Автобусни пътувания с Pirate Travel Agency. Резервирай онлайн!",
  keywords: [
    "екскурзии благоевград",
    "групови пътувания",
    "автобусни екскурзии",
    "туристическа агенция благоевград",
    "pirate travel agency",
    "екскурзии гърция",
    "екскурзии турция",
    "екскурзии сърбия",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://piratetravelagency.com"
  ),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://piratetravelagency.com",
    siteName: "Pirate Travel Agency",
    title: "Pirate Travel Agency — Групови Екскурзии от Благоевград",
    description:
      "Организирани групови екскурзии от Благоевград до Гърция, Турция, Сърбия, Румъния и още.",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Pirate Travel Agency — Групови екскурзии от Благоевград",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pirate Travel Agency — Групови Екскурзии от Благоевград",
    description:
      "Организирани групови екскурзии от Благоевград до Гърция, Турция, Сърбия и още.",
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Pirate Travel Agency",
  url: "https://piratetravelagency.com",
  description:
    "Туристическа агенция за групови екскурзии от Благоевград",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Благоевград",
    addressCountry: "BG",
  },
  telephone: "+359-888-123-456",
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "€€",
  sameAs: [
    "https://www.facebook.com/piratetravelagency",
    "https://www.instagram.com/piratetravelagency",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main className="pt-20 pb-28 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <ChatBot />
      </body>
    </html>
  );
}
