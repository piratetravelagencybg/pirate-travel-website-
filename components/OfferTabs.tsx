"use client";

import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import type { ProgramDay } from "@/lib/types";

interface OfferTabsProps {
  program: ProgramDay[] | null;
  includes: string[] | null;
  excludes: string[] | null;
}

export default function OfferTabs({ program, includes, excludes }: OfferTabsProps) {
  const [activeTab, setActiveTab] = useState<"program" | "includes" | "conditions">("program");
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <>
      {/* Tabs */}
      <div className="mb-6" style={{ borderBottom: "1px solid #BDD5EE" }}>
        <div className="flex gap-1">
          {(["program", "includes", "conditions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
              style={{
                borderBottomColor: activeTab === tab ? "#1A6EBD" : "transparent",
                color: activeTab === tab ? "#1A6EBD" : "#5A8AB0",
              }}
            >
              {tab === "program" && "Програма"}
              {tab === "includes" && "Включено"}
              {tab === "conditions" && "Условия"}
            </button>
          ))}
        </div>
      </div>

      {/* Program */}
      {activeTab === "program" && program && (
        <div className="space-y-2 mb-8">
          {program.map((day, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #BDD5EE" }}
            >
              <button
                onClick={() => setOpenDay(openDay === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "rgba(26,110,189,0.1)", color: "#1A6EBD" }}
                  >
                    {day.day}
                  </span>
                  <span className="font-semibold text-sm" style={{ color: "#0D2240" }}>{day.title}</span>
                </div>
                {openDay === i ? (
                  <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#5A8AB0" }} />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#5A8AB0" }} />
                )}
              </button>
              {openDay === i && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm leading-relaxed pl-11" style={{ color: "#1E4A7A" }}>
                    {day.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Includes */}
      {activeTab === "includes" && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {includes && includes.length > 0 && (
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#0D2240" }}>
                <Check className="w-5 h-5 text-green-600" />
                Включено в цената
              </h3>
              <ul className="space-y-2">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1E4A7A" }}>
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {excludes && excludes.length > 0 && (
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#0D2240" }}>
                <X className="w-5 h-5 text-red-500" />
                Не е включено
              </h3>
              <ul className="space-y-2">
                {excludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1E4A7A" }}>
                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Conditions */}
      {activeTab === "conditions" && (
        <div className="mb-8 text-sm leading-relaxed space-y-3" style={{ color: "#1E4A7A" }}>
          <p>За резервация е необходим депозит от 30% от стойността на пътуването.</p>
          <p>Пълното плащане се извършва не по-късно от 14 дни преди датата на тръгване.</p>
          <p>При анулация повече от 30 дни преди тръгване — пълно възстановяване на депозита.</p>
          <p>При анулация между 14–30 дни — 50% от депозита.</p>
          <p>При анулация по-малко от 14 дни — депозитът не се възстановява.</p>
          <p>Pirate Travel Agency си запазва правото да промени програмата при форсмажорни обстоятелства.</p>
        </div>
      )}
    </>
  );
}
