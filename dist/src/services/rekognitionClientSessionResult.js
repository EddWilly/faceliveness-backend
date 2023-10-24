"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionResultHandler = void 0;
const rekognition_js_1 = require("../helpers/rekognition.js");
async function getSessionResultHandler(sessionId) {
    const rekognition = await (0, rekognition_js_1.getRekognitionClient)();
    const response = await rekognition
        .getFaceLivenessSessionResults({ SessionId: sessionId })
        .then();
    return {
        sessionId: response.SessionId,
        confidence: response.Confidence,
        referenceImage: response.ReferenceImage,
        status: response.Status,
    };
}
exports.getSessionResultHandler = getSessionResultHandler;
