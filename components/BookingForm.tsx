"use client";

import { useState } from "react";
import { Check, Phone } from "lucide-react";
import { saveInquiry } from "@/lib/supabase";

interface BookingFormProps {
  destination: string;
  price_eur: number;
  slug: string;
}

const inputStyle: React.CSSProperties = {
  background: "#F8FBFD",
  border: "1px solid #BDD5EE",
  color: "#0D2240",
};
const inputFocusStyle: React.CSSProperties = {
  borderColor: "#1A6EBD",
  outline: "none",
};

export default function BookingForm({ destination, price_eur }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travel_date: "",
    travelers: "2",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const ok = await saveInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination,
      travel_date: formData.travel_date,
      travelers: parseInt(formData.travelers),
      message: formData.message,
    });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-bold mb-2" style={{ color: "#0D2240" }}>Запитването е изпратено!</p>
        <p className="text-sm" style={{ color: "#5A8AB0" }}>Ще се свържем с теб до 24 часа.</p>
        <a
          href="tel:+359877121209"
          className="mt-4 flex items-center justify-center gap-2 font-bold py-3 rounded-xl w-full"
          style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
        >
          <Phone className="w-4 h-4" />
          Обади се сега
        </a>
      </div>
    );
  }

  const sharedInput = "w-full text-sm px-4 py-3 rounded-xl outline-none placeholder:text-[#5A8AB0]";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        type="text"
        placeholder="Твоето име *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={sharedInput}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <input
        required
        type="tel"
        placeholder="Телефон *"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className={sharedInput}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <input
        type="email"
        placeholder="Имейл"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={sharedInput}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={formData.travel_date}
          onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
          className="text-sm px-3 py-3 rounded-xl outline-none"
          style={{ ...inputStyle, colorScheme: "light" }}
        />
        <input
          type="number"
          placeholder="Пътуващи"
          min="1"
          max="50"
          value={formData.travelers}
          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
          className={sharedInput}
          style={inputStyle}
        />
      </div>
      <textarea
        placeholder="Допълнителни въпроси..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={3}
        className={`${sharedInput} resize-none`}
        style={inputStyle}
      />
      {status === "error" && (
        <p className="text-red-600 text-xs">Грешка. Обади се на 0877 121 209.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
      >
        {status === "sending" ? "Изпращане..." : "Изпрати запитване"}
      </button>
      <a
        href="tel:+359877121209"
        className="flex items-center justify-center gap-2 text-sm py-2"
        style={{ color: "#5A8AB0" }}
      >
        <Phone className="w-4 h-4" />
        или: 0877 121 209
      </a>
    </form>
  );
}
