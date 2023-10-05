import "dotenv/config"
import express from "express";
import cors from "cors";
import statusMonitor from 'express-status-monitor'
import { createSessionHandler } from "./pages/api/createSession.js";
import { checkForInappropriateContent } from "./pages/api/checkForInappropriateContent.js";
import { getSessionResultHandler } from "./pages/api/getSessionResult.js";
import {textController } from './pages/checkText/api/textController.js'



const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(statusMonitor())



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

app.post("/api/text/moderations", textController)


app.listen(port, () => {
  console.log("Listen on the port " + port);
});


