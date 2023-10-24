"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionHandler = void 0;
const rekognition_js_1 = require("../helpers/rekognition.js");
async function createSessionHandler(req, reply) {
    try {
        const rekognition = await (0, rekognition_js_1.getRekognitionClient)(req);
        const { SessionId } = await rekognition
            .createFaceLivenessSession({})
            .then((resp) => resp);
        return { sessionId: SessionId };
    }
    catch (error) {
        console.error(error);
        reply.code(500).send({
            error: 'Internal server error! It was not possible to create a liveness session',
        });
    }
    //   const rekognition = await getRekognitionClient();
    //     const response = rekognition.createFaceLivenessSession().then();
    //     res.status(200).json({
    //         sessionId: response.SessionId,
    //     });
}
exports.createSessionHandler = createSessionHandler;
