import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Всички Дестинации — Екскурзии до Гърция, Турция, Сърбия | Pirate Travel",
  description:
    "Разгледай всички налични екскурзии. Гърция от 199€, Турция от 129€, Сърбия от 89€. Групови автобусни пътувания с Pirate Travel Agency от Благоевград.",
  openGraph: {
    title: "Всички Дестинации | Pirate Travel Agency",
    description:
      "Групови екскурзии до Гърция, Турция, Сърбия, Румъния, Италия и още.",
    images: [{ url: "/images/santorini.png" }],
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
