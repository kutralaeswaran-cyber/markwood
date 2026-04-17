import express from "express";
import routes from "./api/routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use("/api", routes);

app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
});
