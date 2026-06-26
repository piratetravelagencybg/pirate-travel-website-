import Link from "next/link";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import OfferCard from "@/components/OfferCard";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NewsletterBanner from "@/components/NewsletterBanner";
import { getOffers, getMockOffers } from "@/lib/supabase";
import {
  Shield, Tag, Headphones, Plane,
  Globe, Map, ThumbsUp, ArrowRight,
} from "lucide-react";

export const revalidate = 3600;

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const FEATURES = [
  {
    Icon: Shield,
    title: "Сигурност и доверие",
    desc: "Лицензирана туристическа агенция с доказан опит.",
  },
  {
    Icon: Tag,
    title: "Най-добри цени",
    desc: "Гарантираме ти най-доброто съотношение цена-качество.",
  },
  {
    Icon: Headphones,
    title: "Експертна подкрепа",
    desc: "Нашият екип е на линия за да ти помогне по всяко време.",
  },
  {
    Icon: Plane,
    title: "Лесно и бързо",
    desc: "Бързо търсене, лесна резервация и мигновено потвърждение.",
  },
];

const WHY_US = [
  {
    Icon: Globe,
    title: "Богат избор от дестинации",
    desc: "От екзотични острови до европейски градове — имаме нещо за всеки вкус.",
  },
  {
    Icon: Map,
    title: "Персонализирани предложения",
    desc: "Намираме най-подходящото пътуване според твоите желания и бюджет.",
  },
  {
    Icon: Headphones,
    title: "Грижовно обслужване",
    desc: "Нашият екип е на линия от запитването до прибирането у дома — ние сме с теб по всяко стъпка.",
  },
  {
    Icon: ThumbsUp,
    title: "Доволни клиенти",
    desc: "Хиляди пътешественици вече ни се довериха. Виж техните отзиви и стани един от тях.",
  },
];

export default async function HomePage() {
  let offers;
  try {
    offers = await getOffers({ featured: true, limit: 4 });
    if (!offers.length) offers = getMockOffers({ featured: true, limit: 4 });
  } catch {
    offers = getMockOffers({ featured: true, limit: 4 });
  }

  return (
    <div style={{ background: "#F8FBFD" }}>
      <Hero />
      <SearchBar />

      {/* ── ПОПУЛЯРНИ ОФЕРТИ ──────────────────────────────────── */}
      <section className="mt-14 max-w-6xl mx-auto px-5">
        {/* Header row */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <p
              className="text-xs font-black uppercase tracking-[0.15em] mb-2"
              style={{ color: "#D4A017" }}
            >
              Подбрани за теб
            </p>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#111827" }}>
              Популярни оферти
            </h2>
          </div>
          <Link
            href="/destinacii"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: "#5A8AB0" }}
          >
            Виж всички оферти <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop 4-col grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-5">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-3 -mx-5 px-5">
          {offers.map(offer => (
            <div key={offer.id} className="w-[68vw] shrink-0">
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>

        {/* Mobile "see all" link */}
        <div className="mt-5 text-center md:hidden">
          <Link
            href="/destinacii"
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "#5A8AB0" }}
          >
            Виж всички оферти <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── ЗАЩО НАС — 4 ИКОНКИ ─────────────────────────────── */}
      <section className="mt-16 max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(212,160,23,0.1)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#D4A017" }} />
              </div>
              <h3 className="font-black text-sm mb-2" style={{ color: "#111827" }}>
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER BANNER ─────────────────────────────────── */}
      <NewsletterBanner />

      {/* ── ЗАЩО ДА ИЗБЕРЕШ НАС ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="text-center mb-10">
          <p
            className="text-xs font-black uppercase tracking-[0.2em] mb-3"
            style={{ color: "#D4A017" }}
          >
            Защо да избереш нас?
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: "#111827" }}>
            Пътешествия, създадени за теб
          </h2>
          {/* Gold underline */}
          <div
            className="mx-auto"
            style={{
              width: 48,
              height: 3,
              background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
              borderRadius: 99,
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {WHY_US.map(({ Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(26,110,189,0.08)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#1A6EBD" }} />
              </div>
              <h3 className="font-black text-sm mb-2" style={{ color: "#111827" }}>
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <TestimonialsSlider />
    </div>
  );
}
