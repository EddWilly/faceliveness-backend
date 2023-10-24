"use strict";
// pages/api/get.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRekognitionClientSessionController = void 0;
const rekognition_1 = require("../helpers/rekognition");
async function createRekognitionClientSessionController(req, reply) {
    const { sessionId } = req.query;
    const rekognition = await (0, rekognition_1.getRekognitionClient)();
    const response = await rekognition
        .getFaceLivenessSessionResults({
        SessionId: sessionId,
    })
        .then((resp) => resp);
    if (!response) {
        return reply.code(404).send({
            error: 'Session not found',
        });
    }
    const isLive = response?.Confidence && response?.Confidence >= 65;
    reply.code(200).send({
        isLive,
    });
}
exports.createRekognitionClientSessionController = createRekognitionClientSessionController;
