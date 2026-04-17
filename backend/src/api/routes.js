import { Router } from "express";
import { runDailyPipeline } from "../modules/pipeline/dailyJob.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tnpsc-quiz-backend" });
});

router.post("/pipeline/run-daily", async (_req, res) => {
  try {
    const result = await runDailyPipeline();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/quiz/today", (_req, res) => {
  // TODO: fetch from DB/cache.
  res.json({
    title: "Today's TNPSC Quiz",
    questions: [],
    notes: [],
    message: "Wire DB integration in next step"
  });
});

export default router;
