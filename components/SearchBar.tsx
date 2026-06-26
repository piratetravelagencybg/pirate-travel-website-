"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const DESTINATIONS = [
  "Гърция", "Турция", "Испания", "Италия", "Египет",
  "Черна гора", "Хърватия", "България",
];

const MONTHS = [
  "Яну", "Фев", "Мар", "Апр", "Май", "Юни",
  "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек",
];

type Field = "dest" | "date" | "pax" | null;

export default function SearchBar() {
  const router  = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);

  const [active,    setActive]    = useState<Field>(null);
  const [dest,      setDest]      = useState("");
  const [date,      setDate]      = useState("");
  const [travelers, setTravelers] = useState(2);

  const dateLabel = date
    ? (() => { const [y, m] = date.split("-"); return `${MONTHS[+m - 1]} ${y}`; })()
    : null;

  const paxLabel = `${travelers} ${travelers === 1 ? "пътник" : "пътника"}`;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (dest) p.set("q", dest);
    router.push(`/destinacii${p.toString() ? "?" + p.toString() : ""}`);
  }

  function openDate() {
    try { dateRef.current?.showPicker(); } catch { dateRef.current?.click(); }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 -mt-7 relative z-20">
      <form onSubmit={handleSearch}>

        {/* ── DESKTOP pill bar ─────────────────────────────── */}
        <div
          className="hidden md:flex items-stretch rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            boxShadow: "0 8px 40px rgba(7,26,46,0.14), 0 1px 4px rgba(26,110,189,0.07)",
          }}
        >
          {/* Destination */}
          <label className="flex-1 flex items-center gap-3 px-6 py-4 cursor-text group">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>
                Дестинация
              </p>
              <input
                type="text"
                value={dest}
                onChange={e => setDest(e.target.value)}
                placeholder="Накъде пътуваш?"
                className="block bg-transparent outline-none text-sm font-semibold w-full placeholder:font-normal"
                style={{ color: "#111827" }}
              />
            </div>
          </label>

          <div className="w-px my-3" style={{ background: "#E5EFF8" }} />

          {/* Period */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={openDate}
              className="w-full h-full flex items-center gap-3 px-6 text-left"
            >
              <Calendar className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>
                  Период
                </p>
                <p className="text-sm font-semibold" style={{ color: dateLabel ? "#111827" : "#9CA3AF" }}>
                  {dateLabel ?? "Кога?"}
                </p>
              </div>
            </button>
            <input
              ref={dateRef}
              type="month"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              aria-label="Избери месец"
            />
          </div>

          <div className="w-px my-3" style={{ background: "#E5EFF8" }} />

          {/* Travelers */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setActive(active === "pax" ? null : "pax")}
              className="w-full h-full flex items-center gap-3 px-6 text-left"
            >
              <Users className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>
                  Пътници
                </p>
                <p className="text-sm font-semibold" style={{ color: "#111827" }}>{paxLabel}</p>
              </div>
            </button>

            {active === "pax" && (
              <div
                className="absolute top-full left-0 mt-2 z-30 rounded-2xl p-5 shadow-2xl"
                style={{ background: "#fff", border: "1px solid #E5EFF8", minWidth: 200 }}
              >
                <p className="text-xs font-bold mb-4" style={{ color: "#5A8AB0" }}>Брой пътуващи</p>
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-9 h-9 rounded-full font-bold text-lg flex items-center justify-center"
                    style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                  >−</button>
                  <span className="font-black text-2xl" style={{ color: "#0D2240" }}>{travelers}</span>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(50, travelers + 1))}
                    className="w-9 h-9 rounded-full font-bold text-lg flex items-center justify-center"
                    style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                  >+</button>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mt-4 w-full text-xs font-bold py-2 rounded-xl"
                  style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
                >
                  Готово
                </button>
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="flex items-center gap-2 font-black text-sm px-7 shrink-0 transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#C07810 0%,#F5C842 100%)", color: "#071A2E" }}
          >
            <Search className="w-4 h-4" />
            Търси
          </button>
        </div>

        {/* ── MOBILE compact card ──────────────────────────── */}
        <div
          className="md:hidden rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            boxShadow: "0 8px 40px rgba(7,26,46,0.14)",
          }}
        >
          {/* Quick destination chips */}
          <div className="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {DESTINATIONS.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDest(d)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={
                  dest === d
                    ? { background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }
                    : { background: "#F0F7FF", color: "#1E4A7A", border: "1px solid #BDD5EE" }
                }
              >
                {d}
              </button>
            ))}
          </div>

          {/* Destination text input */}
          <div className="flex items-center gap-3 px-5 py-3" style={{ borderTop: "1px solid #F0F7FF" }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
            <input
              type="text"
              value={dest}
              onChange={e => setDest(e.target.value)}
              placeholder="Или пиши дестинация..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#111827" }}
            />
          </div>

          {/* Period + Travelers row */}
          <div className="flex" style={{ borderTop: "1px solid #F0F7FF" }}>
            {/* Period */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={openDate}
                className="w-full flex items-center gap-2 px-5 py-3 text-left"
              >
                <Calendar className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
                <span className="text-sm" style={{ color: dateLabel ? "#111827" : "#9CA3AF" }}>
                  {dateLabel ?? "Кога?"}
                </span>
              </button>
              <input
                ref={dateRef}
                type="month"
                value={date}
                onChange={e => setDate(e.target.value)}
                onClick={openDate}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                aria-label="Избери месец"
              />
            </div>

            <div className="w-px my-2" style={{ background: "#F0F7FF" }} />

            {/* Travelers */}
            <div className="flex items-center gap-3 px-5 py-3">
              <Users className="w-4 h-4 shrink-0" style={{ color: "#D4A017" }} />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-7 h-7 rounded-full font-bold"
                  style={{ background: "#F0F7FF", color: "#0D2240", border: "1px solid #BDD5EE" }}
                >−</button>
                <span className="font-bold text-sm w-4 text-center" style={{ color: "#0D2240" }}>
                  {travelers}
                </span>
                <button
                  type="button"
                  onClick={() => setTravelers(Math.min(50, travelers + 1))}
                  className="w-7 h-7 rounded-full font-bold"
                  style={{ background: "#F0F7FF", color: "#0D2240", border: "1px solid #BDD5EE" }}
                >+</button>
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 font-black py-4 text-sm transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#C07810 0%,#F5C842 100%)", color: "#071A2E" }}
          >
            <Search className="w-4 h-4" />
            Търси оферти
          </button>
        </div>

      </form>

      {/* Backdrop to close dropdowns */}
      {active && (
        <div className="fixed inset-0 z-10" onClick={() => setActive(null)} />
      )}
    </section>
  );
}
