import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getMockOffers, getOffers } from "@/lib/supabase";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch offers for context (fallback to mock)
    let offers;
    try {
      offers = await getOffers();
      if (!offers.length) offers = getMockOffers();
    } catch {
      offers = getMockOffers();
    }

    const offersContext = offers
      .map(
        (o) =>
          `- ${o.title}: ${o.duration_days} дни, от ${o.price_eur}€, транспорт: ${o.transport}, линк: /destinacii/${o.slug}${o.dates ? `, дати: ${o.dates}` : ""}`
      )
      .join("\n");

    const systemPrompt = `Ти си AI помощник на Pirate Travel Agency — туристическа агенция от Благоевград, България.

Отговаряш САМО на български език. Помагаш на клиенти да намерят подходяща екскурзия.

Текущи оферти:
${offersContext}

Когато препоръчваш оферта, винаги давай директния линк /destinacii/[slug].
Ако клиентът иска да резервира, насочи го да се обади на +359 888 123 456 или да попълни формата на страницата на офертата.
За персонална оферта препрати към /personalni-oferti.

Бъди приятелски, ентусиазиран и кратък. Отговаряй в 2-3 изречения освен ако не е нужно повече.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Съжалявам, имам технически проблем. Обади се на +359 888 123 456." },
      { status: 200 }
    );
  }
}
