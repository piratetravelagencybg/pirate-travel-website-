"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, ChevronDown } from "lucide-react";

const DIVIDER = (
  <div className="hidden md:block h-10 w-px shrink-0" style={{ background: "rgba(189,213,238,0.8)" }} />
);

function formatMonth(d: string) {
  if (!d) return null;
  const [year, month] = d.split("-");
  const months = ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function SearchBar() {
  const router       = useRouter();
  const dateRef      = useRef<HTMLInputElement>(null);
  const [dest,       setDest]       = useState("");
  const [date,       setDate]       = useState("");
  const [travelers,  setTravelers]  = useState(2);
  const [showPax,    setShowPax]    = useState(false);

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
    <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
      <form
        onSubmit={handleSearch}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 8px 48px rgba(7,26,46,0.16), 0 2px 8px rgba(26,110,189,0.08)",
        }}
      >
        {/* ── DESKTOP: one horizontal row ─────────── */}
        <div className="hidden md:flex items-center">

          {/* Destination */}
          <div className="flex-1 flex items-center gap-3 px-6 py-5">
            <MapPin className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-0.5" style={{ color: "#0D2240" }}>
                Дестинация
              </p>
              <input
                type="text"
                value={dest}
                onChange={e => setDest(e.target.value)}
                placeholder="Където ще пътуваш?"
                className="block bg-transparent outline-none text-sm w-full"
                style={{ color: dest ? "#0D2240" : "#9CA3AF" }}
              />
            </div>
          </div>

          {DIVIDER}

          {/* Period */}
          <div className="flex-1 relative">
            <button
              type="button"
              onClick={openDate}
              className="w-full flex items-center gap-3 px-6 py-5 text-left"
            >
              <Calendar className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-0.5" style={{ color: "#0D2240" }}>
                  Период
                </p>
                <p className="text-sm" style={{ color: date ? "#0D2240" : "#9CA3AF" }}>
                  {formatMonth(date) ?? "Избери дати"}
                </p>
              </div>
            </button>
            <input
              ref={dateRef}
              type="month"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Избери дата"
            />
          </div>

          {DIVIDER}

          {/* Travelers */}
          <div className="flex-1 relative">
            <button
              type="button"
              onClick={() => setShowPax(!showPax)}
              className="w-full flex items-center gap-3 px-6 py-5 text-left"
            >
              <Users className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-0.5" style={{ color: "#0D2240" }}>
                  Пътници
                </p>
                <p className="text-sm" style={{ color: "#0D2240" }}>
                  {travelers} {travelers === 1 ? "Възрастен" : "Възрастни"}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
            </button>

            {showPax && (
              <div
                className="absolute bottom-full left-0 mb-2 z-30 rounded-2xl p-4 shadow-xl"
                style={{ background: "#FFFFFF", border: "1px solid #BDD5EE", minWidth: 180 }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: "#5A8AB0" }}>Брой пътуващи</p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-9 h-9 rounded-full font-bold text-lg"
                    style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                  >−</button>
                  <span className="font-black text-xl w-6 text-center" style={{ color: "#0D2240" }}>
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(50, travelers + 1))}
                    className="w-9 h-9 rounded-full font-bold text-lg"
                    style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                  >+</button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPax(false)}
                  className="mt-3 text-xs w-full text-center font-bold"
                  style={{ color: "#1A6EBD" }}
                >
                  Готово
                </button>
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="flex items-center gap-2 font-black text-sm px-8 py-5 shrink-0 transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
              color: "#071A2E",
            }}
          >
            <Search className="w-4 h-4" />
            Търси оферти
          </button>
        </div>

        {/* ── MOBILE: vertical stack ───────────────── */}
        <div className="md:hidden">
          {/* Destination row */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(189,213,238,0.6)" }}
          >
            <MapPin className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.08em] mb-0.5" style={{ color: "#0D2240" }}>
                Дестинация
              </p>
              <input
                type="text"
                value={dest}
                onChange={e => setDest(e.target.value)}
                placeholder="Където ще пътуваш?"
                className="block bg-transparent outline-none text-sm w-full"
                style={{ color: dest ? "#0D2240" : "#9CA3AF" }}
              />
            </div>
          </div>

          {/* Period row */}
          <div
            className="relative flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(189,213,238,0.6)" }}
          >
            <Calendar className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
            <div className="flex-1">
              <p className="text-[11px] font-black uppercase tracking-[0.08em] mb-0.5" style={{ color: "#0D2240" }}>
                Период
              </p>
              <p className="text-sm" style={{ color: date ? "#0D2240" : "#9CA3AF" }}>
                {formatMonth(date) ?? "Избери дати"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={dateRef}
              type="month"
              value={date}
              onChange={e => setDate(e.target.value)}
              onClick={openDate}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              aria-label="Избери дата"
            />
          </div>

          {/* Travelers row */}
          <button
            type="button"
            onClick={() => setShowPax(!showPax)}
            className="w-full flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(189,213,238,0.6)" }}
          >
            <Users className="w-5 h-5 shrink-0" style={{ color: "#1A6EBD" }} />
            <div className="flex-1 text-left">
              <p className="text-[11px] font-black uppercase tracking-[0.08em] mb-0.5" style={{ color: "#0D2240" }}>
                Пътници
              </p>
              <p className="text-sm" style={{ color: "#0D2240" }}>
                {travelers} {travelers === 1 ? "Възрастен" : "Възрастни"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          </button>

          {showPax && (
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(189,213,238,0.6)" }}>
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-10 h-10 rounded-full font-bold text-xl"
                  style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                >−</button>
                <span className="font-black text-2xl" style={{ color: "#0D2240" }}>{travelers}</span>
                <button
                  type="button"
                  onClick={() => setTravelers(Math.min(50, travelers + 1))}
                  className="w-10 h-10 rounded-full font-bold text-xl"
                  style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }}
                >+</button>
              </div>
            </div>
          )}

          {/* Search button full-width */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 font-black py-4 text-sm transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
              color: "#071A2E",
            }}
          >
            <Search className="w-4 h-4" />
            Търси оферти
          </button>
        </div>
      </form>
    </section>
  );
}
