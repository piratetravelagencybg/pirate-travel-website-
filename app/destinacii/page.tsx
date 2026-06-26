"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OfferCard from "@/components/OfferCard";
import { getMockOffers } from "@/lib/supabase";
import type { Offer } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";

const COUNTRIES = ["Всички", "Гърция", "Турция", "Сърбия", "Румъния", "Италия"];
const BUDGETS = [
  { label: "Всички цени", value: 9999 },
  { label: "до 100€", value: 100 },
  { label: "до 200€", value: 200 },
  { label: "до 300€", value: 300 },
  { label: "до 500€", value: 500 },
];

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function DestinationsContent() {
  const searchParams = useSearchParams();
  const queryQ = searchParams.get("q") || "";
  const queryBudget = searchParams.get("budget")
    ? parseInt(searchParams.get("budget")!)
    : 9999;

  const [offers, setOffers] = useState<Offer[]>([]);
  const [country, setCountry] = useState("Всички");
  const [budget, setBudget] = useState(queryBudget);
  const [search, setSearch] = useState(queryQ);

  useEffect(() => {
    const all = getMockOffers();
    setOffers(all);
  }, []);

  const filtered = offers.filter((o) => {
    const matchCountry = country === "Всички" || o.country === country;
    const matchBudget = o.price_eur <= budget;
    const matchSearch =
      !search ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.destination.toLowerCase().includes(search.toLowerCase()) ||
      o.country.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchBudget && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10" style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <h1 className="text-2xl md:text-3xl font-black mb-6" style={{ color: "#0D2240" }}>
        Всички <span style={goldText}>дестинации</span>
      </h1>

      {/* Filters */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{ background: "#FFFFFF", border: "1px solid #BDD5EE", boxShadow: "0 2px 12px rgba(26,110,189,0.07)" }}
      >
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Търси дестинация..."
          className="w-full text-sm px-4 py-3 rounded-xl outline-none mb-3"
          style={{
            background: "#FAFAF8",
            border: "1px solid #BDD5EE",
            color: "#0D2240",
          }}
        />

        {/* Country filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-3">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className="text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap transition-all"
              style={
                country === c
                  ? { background: "linear-gradient(135deg, #0D2240 0%, #1A6EBD 100%)", color: "#FFFFFF" }
                  : { background: "#FAFAF8", color: "#1E4A7A", border: "1px solid #BDD5EE" }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Budget filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {BUDGETS.map((b) => (
            <button
              key={b.value}
              onClick={() => setBudget(b.value)}
              className="text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap transition-all"
              style={
                budget === b.value
                  ? { background: "rgba(26,110,189,0.12)", color: "#1A6EBD", border: "1px solid rgba(26,110,189,0.35)" }
                  : { background: "#FAFAF8", color: "#1E4A7A", border: "1px solid #BDD5EE" }
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm mb-4" style={{ color: "#5A8AB0" }}>
        Намерени{" "}
        <span className="font-bold" style={{ color: "#1A6EBD" }}>{filtered.length}</span>{" "}
        оферти
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16" style={{ color: "#5A8AB0" }}>
          <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Няма намерени оферти</p>
          <p className="text-sm mt-2">Опитай с различни филтри</p>
        </div>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-10" style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-blue-100 rounded w-64" />
          <div className="h-32 bg-blue-100 rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-blue-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}
