import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { menuRouter } from "./routes/menu";

config();

const app = express();

const origins = ["http://localhost:*"];
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: origins,
  })
);

app.use("v1/api/menu", menuRouter);

app.get("*", (_, res) => {
  res.json({
    server: "is running",
  });
});

app.listen(PORT, () => {
  console.log("�� server running on ", PORT);
});
