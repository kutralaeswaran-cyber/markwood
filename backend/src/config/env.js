import path from "node:path";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  mysql: {
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "tnpsc_quiz"
  },
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  storageDir: path.resolve(process.env.PDF_STORAGE_DIR ?? "./storage/pdfs"),
  tnpscCurrentAffairsUrl:
    process.env.TNPSC_CURRENT_AFFAIRS_URL ??
    "https://www.thervupettagam.tn.gov.in/current-affairs/",
  defaultLanguage: process.env.QUIZ_LANGUAGE_DEFAULT ?? "ta"
};
