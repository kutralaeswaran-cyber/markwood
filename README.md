# TNPSC Daily Current Affairs Quiz MVP

This repository now contains a production-oriented starter for a **mobile-first TNPSC preparation web app** that converts daily current affairs PDFs into interactive quizzes.

## What is included

- **Backend (Node.js + Express)**
  - Daily pipeline entrypoint (`POST /api/pipeline/run-daily`)
  - TNPSC PDF link scraping
  - PDF download module
  - Text extraction placeholder (replace with parser/OCR)
  - OpenAI quiz generation module
  - MySQL schema migration
- **Frontend (Next.js app router)**
  - Mobile-first home UI scaffold
  - Tamil + English heading style for bilingual users
  - Streak / Accuracy / Rank cards
  - Space for quiz + revision workflows

## Repo structure

```text
backend/
  .env.example
  package.json
  src/
    api/routes.js
    config/env.js
    db/
      client.js
      migrations/001_init.sql
    modules/
      ai/generateQuiz.js
      pipeline/
        dailyJob.js
        scrapeTnpsc.js
        downloadPdf.js
        extractText.js
    server.js

frontend/
  package.json
  next.config.mjs
  app/
    layout.js
    page.js
  components/
    StatCard.js
```

## Quick start

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend starts at `http://localhost:4000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:3000`.

## MVP flow implemented

1. Run `POST /api/pipeline/run-daily`
2. Scrape TNPSC current affairs page for PDF links
3. Download first new PDF to local storage path
4. Extract + clean text (placeholder)
5. Send cleaned text to OpenAI to generate quiz bundle
6. Return generation summary response

## Next implementation steps

1. Replace `extractText.js` placeholder with `pdf-parse` + OCR fallback.
2. Persist pipeline state and generated quiz rows into MySQL tables.
3. Build quiz/question/result/revision pages on frontend.
4. Add Redis + BullMQ for scheduled, retry-safe jobs.
5. Add auth (Google + OTP), streak logic, and leaderboard APIs.

## Important constraint handling

- Raw PDF content is not exposed in frontend routes.
- Only processed quiz content, notes, and facts are intended for display.

