import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json())

import { createSessionHandler } from './pages/api/createSession.js'
import detectInappropriateContent, { batchObjects, AWS_ModerateLabels } from './pages/detectInappropriateContent.js'
import { checkForInappropriateContent } from './pages/api/checkForInappropriateContent.js';
import { getSessionResultHandler } from './pages/api/getSessionResult.js'

app.get("/api/createSession", async (request, response) => {
    const sessionId = await createSessionHandler(request, response)
    // response.json({ sessionId })
})

app.get("/api/getFaceLivenessResults", async (req, res) => {
    const result = await getSessionResultHandler(req.query.sessionId);
    // console.log(result)
    res.json(result)
})


app.get("/api/checkInappropriateContent", async (req, res) => {
    //const result = await detectInappropriateContent(req)
    const objectKey = req.query.objectKey
    const result = await checkForInappropriateContent(objectKey)
    console.log(result)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listen on the port "+port);
});