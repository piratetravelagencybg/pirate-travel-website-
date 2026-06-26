"use client";

import { useState, useCallback } from "react";
import { saveInquiry } from "@/lib/supabase";

// ── DATA ──────────────────────────────────────────────────────────────────────

const TRAVEL_TYPES = [
  { emoji: "🏖️", label: "Почивка и релакс" },
  { emoji: "🏛️", label: "Култура и история" },
  { emoji: "🌿", label: "Природа" },
  { emoji: "💑",  label: "Романтика" },
  { emoji: "👨‍👩‍👧‍👦", label: "Семейно приключение" },
  { emoji: "🦁",  label: "Сафари" },
  { emoji: "💎",  label: "Луксозно изживяване" },
  { emoji: "⛷️", label: "Зимни приключения" },
  { emoji: "🎉",  label: "Парти & нощен живот" },
  { emoji: "🚢",  label: "Круиз" },
];

const CONTINENTS = [
  { emoji: "🌍", label: "Европа" },
  { emoji: "🌏", label: "Азия" },
  { emoji: "🌍", label: "Африка" },
  { emoji: "🌎", label: "Сев. Америка" },
  { emoji: "🌎", label: "Южна Америка" },
  { emoji: "🌊", label: "Океания" },
];

const COUNTRIES_BY_CONTINENT: Record<string, { emoji: string; label: string }[]> = {
  "Европа": [
    { emoji: "🇬🇷", label: "Гърция" },
    { emoji: "🇹🇷", label: "Турция" },
    { emoji: "🇮🇹", label: "Италия" },
    { emoji: "🇪🇸", label: "Испания" },
    { emoji: "🇫🇷", label: "Франция" },
    { emoji: "🇭🇷", label: "Хърватия" },
    { emoji: "🇷🇴", label: "Румъния" },
    { emoji: "🇲🇪", label: "Черна Гора" },
    { emoji: "🇷🇸", label: "Сърбия" },
    { emoji: "🇦🇹", label: "Австрия" },
  ],
  "Азия": [
    { emoji: "🇹🇭", label: "Тайланд" },
    { emoji: "🇯🇵", label: "Япония" },
    { emoji: "🇦🇪", label: "ОАЕ" },
    { emoji: "🇲🇻", label: "Малдиви" },
    { emoji: "🇮🇩", label: "Бали" },
    { emoji: "🇻🇳", label: "Виетнам" },
  ],
  "Африка": [
    { emoji: "🇪🇬", label: "Египет" },
    { emoji: "🇲🇦", label: "Мароко" },
    { emoji: "🇰🇪", label: "Кения" },
    { emoji: "🇿🇦", label: "ЮАР" },
    { emoji: "🇹🇿", label: "Танзания" },
  ],
  "Сев. Америка": [
    { emoji: "🇺🇸", label: "САЩ" },
    { emoji: "🇨🇦", label: "Канада" },
    { emoji: "🇲🇽", label: "Мексико" },
    { emoji: "🇨🇺", label: "Куба" },
    { emoji: "🇩🇴", label: "Доминикана" },
  ],
  "Южна Америка": [
    { emoji: "🇧🇷", label: "Бразилия" },
    { emoji: "🇦🇷", label: "Аржентина" },
    { emoji: "🇵🇪", label: "Перу" },
    { emoji: "🇨🇴", label: "Колумбия" },
  ],
  "Океания": [
    { emoji: "🇦🇺", label: "Австралия" },
    { emoji: "🇳🇿", label: "Нова Зеландия" },
    { emoji: "🇫🇯", label: "Фиджи" },
  ],
};

const SIGHT_CHIPS = [
  { emoji: "🏰", label: "Замъци" },
  { emoji: "🏖️", label: "Плажове" },
  { emoji: "🏔️", label: "Планини" },
  { emoji: "🍷", label: "Вино & храна" },
  { emoji: "🎨", label: "Изкуство" },
  { emoji: "🕌", label: "Джамии" },
  { emoji: "🌋", label: "Вулкани" },
  { emoji: "🐘", label: "Сафари" },
];

const TRAVELER_OPTIONS = [
  { emoji: "1️⃣", label: "Един (1)",       value: "1" },
  { emoji: "2️⃣", label: "Двама (2)",      value: "2" },
  { emoji: "3️⃣", label: "Трима (3)",      value: "3" },
  { emoji: "4️⃣", label: "Четирима (4)",  value: "4" },
  { emoji: "👥",  label: "Група (5+)",    value: "5+" },
];

const SEASONS = [
  { emoji: "🌸", label: "Пролет", value: "Пролет" },
  { emoji: "☀️", label: "Лято",   value: "Лято" },
  { emoji: "🍂", label: "Есен",   value: "Есен" },
  { emoji: "❄️", label: "Зима",   value: "Зима" },
];

const MONTHS = ["Яну","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"];

const TRANSPORT_OPTIONS = [
  { emoji: "✈️", label: "Самолет",           value: "Самолет" },
  { emoji: "🚌", label: "Автобус",           value: "Автобус" },
  { emoji: "🚗", label: "Собствен транспорт", value: "Собствен транспорт" },
  { emoji: "🤷", label: "Без значение",      value: "Без значение" },
];

const BUDGET_OPTIONS = [
  { emoji: "💰", title: "Икономичен",  subtitle: "Най-изгодна цена",     value: "Икономичен" },
  { emoji: "⚖️", title: "Стандартен", subtitle: "Баланс цена/качество", value: "Стандартен" },
  { emoji: "🥂", title: "Висок клас",  subtitle: "Лукс и удобства",      value: "Висок клас" },
  { emoji: "👑", title: "Premium",     subtitle: "VIP обслужване",        value: "Premium" },
];

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface FormData {
  travelTypes: string[];
  continent: string;
  countries: string[];
  sights: string;
  sightChips: string[];
  travelers: string;
  dateType: string;
  dateFrom: string;
  dateTo: string;
  season: string;
  month: string;
  transport: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  comments: string;
}

const BLANK: FormData = {
  travelTypes: [], continent: "", countries: [],
  sights: "", sightChips: [],
  travelers: "",
  dateType: "", dateFrom: "", dateTo: "", season: "", month: "",
  transport: "", budget: "",
  name: "", phone: "", email: "", comments: "",
};

// ── GOLD GRADIENT ─────────────────────────────────────────────────────────────

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
};

// ── SELECTION CARD ────────────────────────────────────────────────────────────

function SelectCard({
  emoji, label, selected, onClick,
}: {
  emoji: string; label: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-150 w-full"
      style={{
        background: selected ? "#F8FBFD" : "#FFFFFF",
        border: selected ? "2px solid #1A6EBD" : "1px solid #BDD5EE",
        boxShadow: selected ? "0 2px 12px rgba(26,110,189,0.15)" : "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
    >
      {selected && (
        <span
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
          style={{ background: "#1A6EBD" }}
        >✓</span>
      )}
      <span className="text-2xl leading-none">{emoji}</span>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: "#0D2240" }}>
        {label}
      </span>
    </button>
  );
}

// ── WIZARD ────────────────────────────────────────────────────────────────────

const TOTAL = 9;

export default function PersonalOfferWizard() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState<FormData>(BLANK);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fadeKey, setFadeKey] = useState(0);
  const [err, setErr]       = useState("");

  function toggleMulti(key: keyof FormData, value: string) {
    setForm(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  }

  const advance = useCallback(() => {
    setErr("");
    setFadeKey(k => k + 1);
    setStep(s => Math.min(s + 1, TOTAL));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function goNext() {
    if (step === 1 && form.travelTypes.length === 0) { setErr("Моля изберете поне един стил."); return; }
    if (step === 2 && !form.continent) { setErr("Моля изберете континент."); return; }
    if (step === 5 && !form.travelers) { setErr("Моля изберете брой пътници."); return; }
    if (step === 6 && !form.dateType)  { setErr("Моля изберете тип дата."); return; }
    if (step === 7 && !form.transport) { setErr("Моля изберете транспорт."); return; }
    if (step === 8 && !form.budget)    { setErr("Моля изберете бюджет."); return; }
    advance();
  }

  function goBack() {
    setErr("");
    setFadeKey(k => k + 1);
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (!form.name.trim())  { setErr("Моля въведете вашето ime и фамилия."); return; }
    if (!form.phone.trim()) { setErr("Моля въведете телефон за връзка."); return; }
    setErr("");
    setStatus("sending");

    const dateStr =
      form.dateType === "date"   ? `${form.dateFrom} → ${form.dateTo}` :
      form.dateType === "season" ? form.season :
      form.dateType === "month"  ? form.month  : "";

    const msgObj = {
      стил_на_пътуване: form.travelTypes.join(", "),
      континент: form.continent,
      държави: form.countries.join(", "),
      забележителности: [form.sights, ...form.sightChips].filter(Boolean).join(", "),
      пътници: form.travelers,
      дати: dateStr,
      транспорт: form.transport,
      бюджет: form.budget,
      коментари: form.comments,
    };

    const ok = await saveInquiry({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      destination: form.countries.join(", ") || form.continent || undefined,
      travel_date: dateStr || undefined,
      travelers: form.travelers === "5+" ? 5 : (parseInt(form.travelers) || undefined),
      message: JSON.stringify(msgObj),
    });

    setStatus(ok ? "success" : "error");
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="max-w-md mx-auto px-4 pb-24">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "#FFFFFF", border: "1px solid #BDD5EE", boxShadow: "0 4px 20px rgba(26,110,189,0.1)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(26,110,189,0.1)" }}
          >
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-black mb-3" style={{ color: "#0D2240" }}>Благодарим!</h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#1E4A7A" }}>
            Скоро ще изпратим Вашата персонална оферта на посочения телефон/имейл.
          </p>
          <p className="text-xs font-semibold mb-2" style={{ color: "#5A8AB0" }}>Или се свържете директно:</p>
          <a href="tel:+359877121209" className="block font-black text-xl mb-6" style={{ color: "#1A6EBD" }}>
            📞 0877 121 209
          </a>
          <button
            onClick={() => { setStatus("idle"); setStep(1); setForm(BLANK); setFadeKey(0); }}
            className="font-semibold text-sm px-6 py-3 rounded-2xl border"
            style={{ borderColor: "#BDD5EE", color: "#1E4A7A" }}
          >
            ← Ново запитване
          </button>
        </div>
      </div>
    );
  }

  // ── STEP CONTENT ─────────────────────────────────────────────────────────────
  const countries = COUNTRIES_BY_CONTINENT[form.continent] || [];

  const stepContent = () => {
    switch (step) {

      case 1: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Какво търсите?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Изберете един или повече стилове.</p>
          <div className="grid grid-cols-2 gap-2.5">
            {TRAVEL_TYPES.map(t => (
              <SelectCard key={t.label} emoji={t.emoji} label={t.label}
                selected={form.travelTypes.includes(t.label)}
                onClick={() => toggleMulti("travelTypes", t.label)} />
            ))}
          </div>
        </>
      );

      case 2: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Къде искате да отидете?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Изберете предпочитан континент или регион.</p>
          <div className="grid grid-cols-2 gap-2.5">
            {CONTINENTS.map(c => (
              <SelectCard key={c.label} emoji={c.emoji} label={c.label}
                selected={form.continent === c.label}
                onClick={() => setForm(p => ({ ...p, continent: c.label, countries: [] }))} />
            ))}
          </div>
        </>
      );

      case 3:
        if (!form.continent) return (
          <p className="text-sm py-8 text-center" style={{ color: "#5A8AB0" }}>
            Моля, върнете се назад и изберете континент.
          </p>
        );
        return (
          <>
            <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Топ дестинации</h2>
            <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Изберете конкретни държави.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {countries.map(c => (
                <SelectCard key={c.label} emoji={c.emoji} label={c.label}
                  selected={form.countries.includes(c.label)}
                  onClick={() => toggleMulti("countries", c.label)} />
              ))}
            </div>
          </>
        );

      case 4: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Какво искате да видите?</h2>
          <p className="text-sm mb-4" style={{ color: "#5A8AB0" }}>Специални места, забележителности или градове?</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SIGHT_CHIPS.map(c => {
              const sel = form.sightChips.includes(c.label);
              return (
                <button key={c.label} type="button"
                  onClick={() => toggleMulti("sightChips", c.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: sel ? "#1A6EBD" : "#FFFFFF",
                    color: sel ? "#FFFFFF" : "#1E4A7A",
                    border: sel ? "1.5px solid #1A6EBD" : "1.5px solid #BDD5EE",
                  }}>
                  {c.emoji} {c.label}
                </button>
              );
            })}
          </div>
          <textarea value={form.sights}
            onChange={e => setForm(p => ({ ...p, sights: e.target.value }))}
            placeholder="Например: исторически замъци, плажове, планински пейзажи, местна кухня..."
            rows={4} className="w-full text-sm px-4 py-3 rounded-xl outline-none resize-none"
            style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }} />
        </>
      );

      case 5: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Колко души ще пътувате?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Изберете брой пътници.</p>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {TRAVELER_OPTIONS.map(t => (
              <button key={t.value} type="button"
                onClick={() => setForm(p => ({ ...p, travelers: t.value }))}
                className="flex flex-col items-center gap-1.5 px-4 py-3.5 rounded-2xl shrink-0 transition-all"
                style={{
                  background: form.travelers === t.value ? "#1A6EBD" : "#FFFFFF",
                  border: form.travelers === t.value ? "2px solid #1A6EBD" : "1px solid #BDD5EE",
                  color: form.travelers === t.value ? "#FFFFFF" : "#1E4A7A",
                  minWidth: 84,
                  fontWeight: 700,
                }}>
                <span className="text-2xl leading-none">{t.emoji}</span>
                <span className="text-xs whitespace-nowrap">{t.label}</span>
              </button>
            ))}
          </div>
        </>
      );

      case 6: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Кога планирате пътуването?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Изберете начин на планиране.</p>
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {[
              { icon: "📅", label: "Конкретна дата", value: "date" },
              { icon: "🌤️", label: "Сезон",          value: "season" },
              { icon: "📆", label: "Месец",           value: "month" },
            ].map(opt => (
              <button key={opt.value} type="button"
                onClick={() => setForm(p => ({ ...p, dateType: opt.value }))}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                style={{
                  background: form.dateType === opt.value ? "#F8FBFD" : "#FFFFFF",
                  border: form.dateType === opt.value ? "2px solid #1A6EBD" : "1px solid #BDD5EE",
                }}>
                <span className="text-2xl leading-none">{opt.icon}</span>
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: "#0D2240" }}>{opt.label}</span>
              </button>
            ))}
          </div>

          {form.dateType === "date" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "#5A8AB0" }}>Дата на тръгване</label>
                <input type="date" value={form.dateFrom}
                  onChange={e => setForm(p => ({ ...p, dateFrom: e.target.value }))}
                  className="w-full text-sm px-3 py-2.5 rounded-xl outline-none"
                  style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240", colorScheme: "light" }} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "#5A8AB0" }}>Дата на връщане</label>
                <input type="date" value={form.dateTo}
                  onChange={e => setForm(p => ({ ...p, dateTo: e.target.value }))}
                  className="w-full text-sm px-3 py-2.5 rounded-xl outline-none"
                  style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240", colorScheme: "light" }} />
              </div>
            </div>
          )}

          {form.dateType === "season" && (
            <div className="grid grid-cols-2 gap-2.5">
              {SEASONS.map(s => (
                <SelectCard key={s.value} emoji={s.emoji} label={s.label}
                  selected={form.season === s.value}
                  onClick={() => setForm(p => ({ ...p, season: s.value }))} />
              ))}
            </div>
          )}

          {form.dateType === "month" && (
            <div className="flex flex-wrap gap-2">
              {MONTHS.map(m => (
                <button key={m} type="button"
                  onClick={() => setForm(p => ({ ...p, month: m }))}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: form.month === m ? "#1A6EBD" : "#FFFFFF",
                    color: form.month === m ? "#FFFFFF" : "#1E4A7A",
                    border: form.month === m ? "2px solid #1A6EBD" : "1px solid #BDD5EE",
                  }}>
                  {m}
                </button>
              ))}
            </div>
          )}
        </>
      );

      case 7: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Предпочитан транспорт?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Как предпочитате да пътувате?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {TRANSPORT_OPTIONS.map(t => (
              <SelectCard key={t.value} emoji={t.emoji} label={t.label}
                selected={form.transport === t.value}
                onClick={() => setForm(p => ({ ...p, transport: t.value }))} />
            ))}
          </div>
        </>
      );

      case 8: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Какъв е твоя бюджет?</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>На човек за цялото пътуване.</p>
          <div className="flex flex-col gap-3">
            {BUDGET_OPTIONS.map(b => (
              <button key={b.value} type="button"
                onClick={() => setForm(p => ({ ...p, budget: b.value }))}
                className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                style={{
                  background: form.budget === b.value ? "#F8FBFD" : "#FFFFFF",
                  border: "1px solid #BDD5EE",
                  borderLeft: form.budget === b.value ? "4px solid #1A6EBD" : "1px solid #BDD5EE",
                  boxShadow: form.budget === b.value ? "0 2px 12px rgba(26,110,189,0.12)" : "none",
                }}>
                <span className="text-2xl shrink-0">{b.emoji}</span>
                <div className="flex-1">
                  <p className="font-black text-sm" style={{ color: "#0D2240" }}>{b.title}</p>
                  <p className="text-xs" style={{ color: "#5A8AB0" }}>{b.subtitle}</p>
                </div>
                {form.budget === b.value && (
                  <span className="font-black text-base" style={{ color: "#1A6EBD" }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      );

      case 9: return (
        <>
          <h2 className="text-lg font-black mb-1" style={{ color: "#0D2240" }}>Данни за офертата</h2>
          <p className="text-sm mb-5" style={{ color: "#5A8AB0" }}>Къде да изпратим вашата персонална оферта?</p>
          <div className="flex flex-col gap-3.5">
            {[
              { label: "Име и Фамилия *", key: "name", type: "text",  placeholder: "Иван Иванов" },
              { label: "Телефон за връзка *", key: "phone", type: "tel", placeholder: "+359 877 121 209" },
              { label: "Имейл адрес",     key: "email", type: "email", placeholder: "ivan@example.com" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "#5A8AB0" }}>
                  {f.label}
                </label>
                <input type={f.type} value={form[f.key as keyof FormData] as string}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full text-sm px-4 py-3 rounded-xl outline-none"
                  style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "#5A8AB0" }}>
                Допълнителни коментари
              </label>
              <textarea value={form.comments}
                onChange={e => setForm(p => ({ ...p, comments: e.target.value }))}
                placeholder="Специални изисквания, въпроси..."
                rows={3} className="w-full text-sm px-4 py-3 rounded-xl outline-none resize-none"
                style={{ background: "#F8FBFD", border: "1px solid #BDD5EE", color: "#0D2240" }} />
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "#5A8AB0" }}>🔒 Не споделяме данните ви с никого.</p>
        </>
      );

      default: return null;
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-lg mx-auto px-4 pb-28 pt-4">

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: "#5A8AB0" }}>
            Стъпка {step} от {TOTAL}
          </span>
          <span className="text-xs font-black" style={{ color: "#1A6EBD" }}>
            {Math.round((step / TOTAL) * 100)}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#BDD5EE" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ ...goldGrad, width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div
        key={fadeKey}
        className="rounded-2xl p-6 mb-4"
        style={{
          background: "#FFFFFF",
          border: "1px solid #BDD5EE",
          boxShadow: "0 4px 20px rgba(26,110,189,0.08)",
          animation: "wizardFadeIn 0.2s ease forwards",
        }}
      >
        {stepContent()}
      </div>

      {/* Error */}
      {err && (
        <p className="text-sm mb-3 px-1 font-semibold" style={{ color: "#C0392B" }}>{err}</p>
      )}
      {status === "error" && (
        <p className="text-sm mb-3 px-1" style={{ color: "#C0392B" }}>
          Грешка при изпращане. Моля опитайте отново или се обадете на{" "}
          <a href="tel:+359877121209" style={{ color: "#1A6EBD", fontWeight: 700 }}>0877 121 209</a>.
        </p>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 1 && (
          <button type="button" onClick={goBack}
            className="flex items-center gap-1.5 px-5 py-3.5 rounded-2xl text-sm font-black border transition-colors"
            style={{ borderColor: "#1A6EBD", color: "#1A6EBD", background: "transparent" }}>
            ← Назад
          </button>
        )}
        <button
          type="button"
          onClick={step === TOTAL ? handleSubmit : goNext}
          disabled={status === "sending"}
          className="flex-1 py-3.5 rounded-2xl text-sm font-black disabled:opacity-60 transition-all"
          style={{ ...goldGrad, color: "#071A2E", boxShadow: "0 4px 16px rgba(232,160,32,0.3)" }}
        >
          {status === "sending"
            ? "Изпращане..."
            : step === TOTAL
            ? "Изпрати запитването →"
            : "Напред →"}
        </button>
      </div>
    </div>
  );
}
