import path from "node:path";
import { env } from "../../config/env.js";
import { scrapeTnpscPdfLinks } from "./scrapeTnpsc.js";
import { downloadPdf } from "./downloadPdf.js";
import { extractAndCleanText } from "./extractText.js";
import { generateQuizBundle } from "../ai/generateQuiz.js";

export async function runDailyPipeline() {
  const links = await scrapeTnpscPdfLinks(env.tnpscCurrentAffairsUrl);
  if (links.length === 0) {
    return { status: "noop", message: "No PDF links found" };
  }

  const firstPdf = links[0];
  const fileName = `${Date.now()}-${path.basename(new URL(firstPdf.pdfUrl).pathname)}`;
  const localPath = await downloadPdf(firstPdf.pdfUrl, env.storageDir, fileName);

  const extracted = await extractAndCleanText(localPath);
  const quiz = await generateQuizBundle({
    apiKey: env.openAiApiKey,
    cleanedText: extracted.cleanedText,
    language: env.defaultLanguage,
    questionCount: 10
  });

  return {
    status: "success",
    pdfUrl: firstPdf.pdfUrl,
    storagePath: localPath,
    generated: {
      questions: quiz.questions?.length ?? 0,
      notes: quiz.notes?.length ?? 0,
      facts: quiz.facts?.length ?? 0
    }
  };
}
