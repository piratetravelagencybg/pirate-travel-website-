import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Clock, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "За нас — Pirate Travel Agency",
  description:
    "Pirate Travel Agency е туристическа агенция от Благоевград с над 10 години опит в организирането на групови екскурзии до Гърция, Турция, Сърбия и повече.",
};

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#F8FBFD" }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16">
        <Image
          src="/images/hero-pirate.png"
          alt="Pirate Travel Agency — приключението те чака"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,26,46,0.15) 0%, rgba(7,26,46,0.55) 60%, rgba(7,26,46,0.88) 100%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "#F5C842" }}>
            ✦ Нашата история
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            За <span style={goldText}>Pirate Travel</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-xl leading-relaxed">
            Туристическа агенция от Благоевград, създадена с мисията да превърне
            всяко пътуване в незабравимо приключение.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 mb-14">
        <div
          className="grid grid-cols-3 rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #BDD5EE",
            boxShadow: "0 8px 40px rgba(26,110,189,0.12)",
          }}
        >
          {[
            { number: "500+", label: "Доволни клиенти" },
            { number: "15+", label: "Дестинации" },
            { number: "10+", label: "Години опит" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="py-6 text-center"
              style={{ borderRight: i < 2 ? "1px solid #BDD5EE" : "none" }}
            >
              <p className="font-black text-2xl md:text-3xl mb-1" style={goldText}>
                {stat.number}
              </p>
              <p className="text-xs font-medium" style={{ color: "#5A8AB0" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1A6EBD" }}>
              Кои сме ние
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-5" style={{ color: "#0D2240" }}>
              Нашата история 🏴‍☠️
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#1E4A7A" }}>
              <p>
                Pirate Travel Agency започна своя път преди повече от 10 години с
                проста идея — да предостави на жителите на Благоевград и региона
                достъпен и организиран начин да открият красотата на Европа.
              </p>
              <p>
                Наречени на духа на пиратите — смели, свободни и жадни за
                приключения — ние вярваме, че пътуването трябва да бъде
                незабравимо изживяване, а не стрес. Затова се грижим за всеки
                детайл — от транспорта и настаняването до програмата и личното
                обслужване.
              </p>
              <p>
                Стотици семейства, приятели и колеги са се доверили на нас за
                своите пътешествия. Гордеем се с всяка усмивка и всеки разказ,
                споделен с нас след завръщане.
              </p>
            </div>
          </div>
          <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden">
            <Image
              src="/images/clients-beach.jpg"
              alt="Клиенти на Pirate Travel Agency"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(7,26,46,0.4) 0%, transparent 60%)" }}
            />
          </div>
        </div>
      </section>

      {/* ── PHOTOS GRID ──────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#1A6EBD" }}>
          С нас пътуваш
        </p>
        <h2 className="text-2xl font-black text-center mb-8" style={{ color: "#0D2240" }}>
          Моменти от нашите пътувания
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden col-span-2 md:col-span-1 row-span-2">
            <Image src="/images/budva-hotel.jpg" alt="Хотел Будва 2026" fill className="object-cover" sizes="33vw" />
          </div>
          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
            <Image src="/images/budva-restaurant.jpg" alt="Ресторант Будва" fill className="object-cover" sizes="33vw" />
          </div>
          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
            <Image src="/images/budva-exterior.jpg" alt="Будва 2026" fill className="object-cover" sizes="33vw" />
          </div>
          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
            <Image src="/images/zakynthos.jpg" alt="Закинтос" fill className="object-cover" sizes="33vw" />
          </div>
          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
            <Image src="/images/client-beach2.jpg" alt="Клиенти на плажа" fill className="object-cover object-top" sizes="33vw" />
          </div>
        </div>
      </section>

      {/* ── BUS VIDEOS ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#1A6EBD" }}>
          Нашите автобуси
        </p>
        <h2 className="text-2xl font-black text-center mb-8" style={{ color: "#0D2240" }}>
          Пътуваме комфортно
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #BDD5EE", boxShadow: "0 4px 20px rgba(26,110,189,0.08)" }}>
            <video controls playsInline preload="metadata" className="w-full h-56 bg-black">
              <source src="/videos/bus-video-1.mp4" type="video/mp4" />
            </video>
            <div className="px-4 py-3 bg-white">
              <p className="font-black text-sm" style={{ color: "#0D2240" }}>Нашите луксозни автобуси</p>
              <p className="text-xs mt-0.5" style={{ color: "#5A8AB0" }}>Комфорт от врата до врата</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #BDD5EE", boxShadow: "0 4px 20px rgba(26,110,189,0.08)" }}>
            <video controls playsInline preload="metadata" className="w-full h-56 bg-black">
              <source src="/videos/bus-video-2.mp4" type="video/mp4" />
            </video>
            <div className="px-4 py-3 bg-white">
              <p className="font-black text-sm" style={{ color: "#0D2240" }}>Групови екскурзии от Благоевград</p>
              <p className="text-xs mt-0.5" style={{ color: "#5A8AB0" }}>Пътуваме заедно, пристигаме като приятели</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section
        className="py-16 px-6"
        style={{ background: "#FFFFFF", borderTop: "1px solid #BDD5EE", borderBottom: "1px solid #BDD5EE" }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#1A6EBD" }}>
            Защо ние
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10" style={{ color: "#0D2240" }}>
            Нашите ценности
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Качество", desc: "Внимателно подбираме всеки хотел, маршрут и доставчик, за да гарантираме качество на най-добрата цена." },
              { icon: Users, title: "Общност", desc: "Нашите групови екскурзии са повече от пътуване — те са нови приятелства и споделени спомени." },
              { icon: Clock, title: "Точност", desc: "Уважаваме твоето време. Всяка програма е внимателно планирана и изпълнена с точност." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                  style={{ background: "rgba(26,110,189,0.1)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#1A6EBD" }} />
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: "#0D2240" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A8AB0" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "#071A2E", boxShadow: "0 8px 40px rgba(7,26,46,0.2)" }}
        >
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-3">
              Готов за приключението?
            </h2>
            <ul className="space-y-2 text-sm" style={{ color: "#5A8AB0" }}>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: "#1A6EBD" }} />
                Благоевград, България
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#1A6EBD" }} />
                <a href="tel:+359877121209" className="hover:text-[#1A6EBD] transition-colors">0877 121 209</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#1A6EBD" }} />
                <a href="mailto:piratetravelagencybg@gmail.com" className="hover:text-[#1A6EBD] transition-colors text-xs">piratetravelagencybg@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/destinacii"
              className="flex items-center gap-2 font-black px-7 py-3.5 rounded-2xl text-sm"
              style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
            >
              Виж офертите <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kontakti"
              className="font-semibold text-center px-7 py-3.5 rounded-2xl text-sm border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "#F8FBFD" }}
            >
              Свържи се с нас
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
