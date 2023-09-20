import "dotenv/config"
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

import { createSessionHandler } from "./pages/api/createSession.js";
import { checkForInappropriateContent } from "./pages/api/checkForInappropriateContent.js";
import { getSessionResultHandler } from "./pages/api/getSessionResult.js";

app.get("/api/createSession", async (request, response) => {
  const sessionId = await createSessionHandler(request, response);
});

app.get("/api/getFaceLivenessResults", async (req, res) => {
  const result = await getSessionResultHandler(req.query.sessionId);
  res.json(result);
});

app.get("/api/checkInappropriateContent", async (req, res) => {
  const objectKey = req.query.objectKey;
  const result = await checkForInappropriateContent(objectKey);
  res.json(result);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listen on the port " + port);
});


