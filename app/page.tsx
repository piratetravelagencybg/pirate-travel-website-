import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import OfferCard from "@/components/OfferCard";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NewsletterBanner from "@/components/NewsletterBanner";
import { getOffers, getMockOffers } from "@/lib/supabase";
import {
  Shield, Tag, Headphones, Plane,
  Globe, Map, Star, ArrowRight,
  MapPin, Heart, Zap,
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
    desc: "От екзотични острови до европейски градове – имаме нещо за всеки вкус.",
  },
  {
    Icon: Map,
    title: "Персонализирани предложения",
    desc: "Намираме най-подходящото пътуване спрямо твоите желания и бюджет.",
  },
  {
    Icon: Headphones,
    title: "Грижовно обслужване",
    desc: "Нашият екип е на линия от запитването до прибирането у дома.",
  },
  {
    Icon: Star,
    title: "Доволни клиенти",
    desc: "Хиляди пътешественици вече ни се довериха и пътуват отново с нас.",
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
    <div style={{ background: "#FAFAF8" }}>
      <Hero />
      <SearchBar />

      {/* ── ПОПУЛЯРНИ ОФЕРТИ ──────────────────────────────────── */}
      <section className="mt-14 max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: "#D4A017" }}>
            Подбрани за теб
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#111827" }}>
                  Популярни оферти
                </h2>
                {/* Sparkle decoration */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0 hidden sm:block">
                  <path d="M16 4 L17.5 14.5 L28 16 L17.5 17.5 L16 28 L14.5 17.5 L4 16 L14.5 14.5 Z" fill="#D4A017" opacity="0.9"/>
                  <circle cx="26" cy="8" r="2" fill="#D4A017" opacity="0.5"/>
                  <circle cx="28" cy="14" r="1" fill="#D4A017" opacity="0.3"/>
                </svg>
              </div>
              <Link
                href="/destinacii"
                className="inline-flex items-center gap-1 text-sm font-semibold mt-1 hover:opacity-70 transition-opacity"
                style={{ color: "#5A8AB0" }}
              >
                Виж всички оферти <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop 4-col grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-5">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Mobile horizontal scroll — big cards, peek next */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5 snap-x snap-mandatory">
          {offers.map(offer => (
            <div key={offer.id} className="w-[78vw] shrink-0 snap-start">
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ПРЕДИМСТВА ───────────────────────────────────────── */}
      <section className="mt-16 px-5 py-16" style={{ background: "#FEFCF8" }}>
        <div className="max-w-2xl mx-auto md:max-w-6xl">

          {/* Header */}
          <div className="text-center mb-12">
            {/* — Защо да изберете нас — */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#D4A017" }} />
              <span className="text-sm font-semibold" style={{ color: "#D4A017" }}>
                Защо да изберете нас
              </span>
              <div className="h-px w-8" style={{ background: "#D4A017" }} />
            </div>

            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4" style={{ color: "#0D2240" }}>
              Пътувайте уверено{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#C07810,#F5C842)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                с Pirate Travel
              </span>
            </h2>

            <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "#9CA3AF" }}>
              Комбинираме експертиза, технологии и лично отношение,
              за да ви осигурим най-доброто изживяване.
            </p>
          </div>

          {/* 2×2 cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #F0EDE8",
                  boxShadow: "0 2px 16px rgba(7,26,46,0.05)",
                }}
              >
                {/* Warm beige icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shrink-0"
                  style={{ background: "rgba(212,160,23,0.1)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "#C07810" }} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-black text-sm mb-2 leading-snug" style={{ color: "#0D2240" }}>
                  {title}
                </h3>

                {/* Gold underline under title */}
                <div
                  className="mb-3"
                  style={{ width: 28, height: 2, background: "linear-gradient(135deg,#C07810,#F5C842)", borderRadius: 99 }}
                />

                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЗА НАС TEASER ────────────────────────────────────── */}
      <section className="px-5 mt-20">
        <div
          className="max-w-md mx-auto md:max-w-lg rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 12px 48px rgba(7,26,46,0.12)", background: "#FFFFFF" }}
        >
          {/* Photo collage */}
          <div className="relative h-64 md:h-72" style={{ background: "#F2EBE0" }}>
            {/* Main photo — left */}
            <div className="absolute top-3 left-3 bottom-3" style={{ right: "37%" }}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/santorini.png"
                  alt="Гърция — групова екскурзия"
                  fill
                  className="object-cover"
                  sizes="220px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Secondary photo — top right */}
            <div className="absolute top-3 right-3" style={{ left: "65%", bottom: "30%" }}>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/clients-beach.jpg"
                  alt="Доволни клиенти"
                  fill
                  className="object-cover"
                  sizes="130px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Gold anchor badge */}
            <div
              className="absolute z-10 flex items-center justify-center rounded-full shadow-xl"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg,#C07810,#F5C842)",
                color: "#071A2E",
                fontSize: 22,
                bottom: "28%",
                left: "63%",
                transform: "translate(-50%, 50%)",
              }}
            >
              ⚓
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-6 pb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] mb-2" style={{ color: "#D4A017" }}>
              ЗА PIRATE TRAVEL
            </p>
            <h2 className="text-2xl font-black mb-3 leading-tight" style={{ color: "#111827" }}>
              Пътувания,<br />
              които се помнят
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
              Pirate Travel Agency е туристическа агенция от Благоевград, специализирана в организирането на групови екскурзии с душа — незабравими преживявания на достъпни цени.
            </p>

            {/* 3 mini features */}
            <div className="flex gap-3 mb-6">
              {[
                { Icon: MapPin, label: "Подбрани дестинации" },
                { Icon: Heart,  label: "Лично отношение" },
                { Icon: Zap,    label: "Бърза комуникация" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 flex-1 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#FEF9EC", border: "1.5px solid rgba(212,160,23,0.3)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#C07810" }} />
                  </div>
                  <span className="text-[11px] font-semibold leading-tight" style={{ color: "#374151" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/za-nas"
              className="flex items-center justify-center gap-2 font-black text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 mb-3"
              style={{ background: "#071A2E", color: "#FFFFFF" }}
            >
              Научи повече за нас <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/destinacii"
              className="block text-center text-sm font-semibold"
              style={{ color: "#9CA3AF" }}
            >
              Виж офертите
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER BANNER ─────────────────────────────────── */}
      <NewsletterBanner />

      {/* ── ЗАЩО ДА ИЗБЕРЕШ НАС ──────────────────────────────── */}
      <section className="px-5 pb-20 mt-6 max-w-lg mx-auto md:max-w-6xl">

        {/* Header */}
        <div className="text-center mb-10">
          {/* Compass SVG */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="mx-auto mb-4">
            <path d="M18 3 L19.2 16.8 L33 18 L19.2 19.2 L18 33 L16.8 19.2 L3 18 L16.8 16.8 Z" fill="#D4A017" opacity="0.85"/>
            <circle cx="28" cy="9" r="2" fill="#D4A017" opacity="0.4"/>
            <circle cx="30" cy="15" r="1" fill="#D4A017" opacity="0.25"/>
          </svg>

          <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3" style={{ color: "#0D2240" }}>
            Пътешествия,{" "}
            <span className="block">
              създадени{" "}
              <em
                className="not-italic"
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg,#C07810,#F5C842)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >за теб</em>
            </span>
          </h2>

          {/* Gold underline */}
          <div className="mx-auto mb-4" style={{ width: 48, height: 3, background: "linear-gradient(135deg,#C07810,#F5C842)", borderRadius: 99 }} />

          <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
            Персонално, лесно и вдъхновяващо –<br className="hidden sm:block" />
            всяко пътуване е изживяване.
          </p>
        </div>

        {/* 2×2 grid with center anchor badge */}
        <div className="relative grid grid-cols-2 gap-3">
          {WHY_US.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-5 flex flex-col items-center text-center overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid #F0EDE8",
                boxShadow: "0 2px 12px rgba(7,26,46,0.06)",
              }}
            >
              {/* Blue outline icon circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shrink-0"
                style={{ border: "1.5px solid #1A3A5C", background: "transparent" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#1A3A5C" }} strokeWidth={1.5} />
              </div>

              <h3 className="font-black text-sm mb-2 leading-snug" style={{ color: "#0D2240" }}>
                {title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                {desc}
              </p>
            </div>
          ))}

          {/* Center gold anchor badge */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10"
            style={{
              background: "linear-gradient(135deg,#C07810,#F5C842)",
              boxShadow: "0 4px 20px rgba(212,160,23,0.45)",
            }}
          >
            {/* Anchor SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#071A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3"/>
              <line x1="12" y1="22" x2="12" y2="8"/>
              <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <TestimonialsSlider />
    </div>
  );
}
