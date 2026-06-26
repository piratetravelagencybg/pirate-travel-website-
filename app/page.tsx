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
      <section className="mt-16 px-5" style={{ background: "#071A2E" }}>
        <div className="max-w-6xl mx-auto py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#D4A017" }}>
              Защо Pirate Travel?
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Пътуването е лесно с нас
            </h2>
          </div>

          {/* 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {/* Big faint number */}
                <span
                  className="absolute top-3 right-4 font-black select-none pointer-events-none"
                  style={{ fontSize: 56, lineHeight: 1, color: "rgba(255,255,255,0.04)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#C07810,#F5C842)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#071A2E" }} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-black text-base text-white mb-1.5">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {desc}
                  </p>
                </div>

                {/* Gold bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.5), transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЗА НАС TEASER ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 mt-20">
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(7,26,46,0.12)" }}>

          {/* Image */}
          <div className="relative min-h-[300px] md:min-h-[420px]">
            <Image
              src="/images/agency-office.png"
              alt="Pirate Travel Agency офис"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,26,46,0.3), rgba(7,26,46,0.1))" }} />
            {/* Badge */}
            <div
              className="absolute bottom-5 left-5 px-4 py-2 rounded-full text-xs font-black text-white"
              style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
            >
              🏴‍☠️ От 2018 година
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-8 py-10 md:px-10" style={{ background: "#FFFFFF" }}>
            <p className="text-xs font-black uppercase tracking-[0.18em] mb-3" style={{ color: "#D4A017" }}>
              Кои сме ние
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight" style={{ color: "#111827" }}>
              Твоят надежден партньор за незабравими пътешествия
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
              Pirate Travel Agency е туристическа агенция от Благоевград с опит в организирането на групови екскурзии до Гърция, Турция, Сърбия и много други дестинации. Нашият екип се грижи за всеки детайл — от резервацията до прибирането у дома.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {[
                { num: "2300+", label: "доволни клиенти" },
                { num: "6+",    label: "години опит" },
                { num: "30+",   label: "дестинации" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-black text-xl" style={{ color: "#111827" }}>{num}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/za-nas"
              className="inline-flex items-center gap-2 font-black text-sm px-6 py-3.5 rounded-2xl self-start transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
            >
              Научи повече за нас <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER BANNER ─────────────────────────────────── */}
      <NewsletterBanner />

      {/* ── ЗАЩО ДА ИЗБЕРЕШ НАС ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-20 mt-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#D4A017" }}>
            Защо да избереш нас?
          </p>
          <h2 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: "#111827" }}>
            Пътешествия, създадени за теб
          </h2>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-0">
          {WHY_US.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="group flex items-start gap-6 py-7 transition-colors duration-200"
              style={{
                borderTop: "1px solid #EBEBEB",
                borderBottom: i === WHY_US.length - 1 ? "1px solid #EBEBEB" : "none",
              }}
            >
              {/* Number */}
              <span
                className="font-black shrink-0 w-10 text-right leading-none mt-1"
                style={{ fontSize: 13, color: "#D4A017", letterSpacing: "0.05em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg,#C07810,#F5C842)" }}
              >
                <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" style={{ color: "#071A2E" }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-base mb-1" style={{ color: "#111827" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {desc}
                </p>
              </div>

              {/* Arrow on hover */}
              <ArrowRight
                className="w-4 h-4 shrink-0 mt-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                style={{ color: "#D4A017" }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Над <strong style={{ color: "#111827" }}>2300 доволни пътешественици</strong> вече ни се довериха.
          </p>
          <Link
            href="/destinacii"
            className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-2xl transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
          >
            Разгледай оферти <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <TestimonialsSlider />
    </div>
  );
}
