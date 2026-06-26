import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Персонална Оферта | Pirate Travel Agency — Пътуване по твоите условия",
  description:
    "Създайте персонална оферта за пътуване изцяло по вашите условия. Изберете дестинация, дати, брой пътници и бюджет — ще изготвим оферта специално за вас.",
};

export default function PersonalOffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
