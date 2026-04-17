import OpenAI from "openai";

export async function generateQuizBundle({ apiKey, cleanedText, language = "ta", questionCount = 10 }) {
  const client = new OpenAI({ apiKey });

  const prompt = `
Generate ${questionCount} TNPSC MCQs from the content below.
Rules: 4 options, single correct answer, short explanation, difficulty easy/medium/hard.
Language: ${language}.
Return JSON with keys: questions, notes, facts.
Content:\n${cleanedText}
`;

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    temperature: 0.2,
    text: { format: { type: "json_object" } }
  });

  const raw = completion.output_text || "{}";
  return JSON.parse(raw);
}
