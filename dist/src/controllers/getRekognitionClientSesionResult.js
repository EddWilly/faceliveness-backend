"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRekognitionClientSessionResultController = void 0;
const zod_1 = require("zod");
const rekognitionClientSessionResult_1 = require("../services/rekognitionClientSessionResult");
const query = zod_1.z.object({
    sessionId: zod_1.z.string(),
});
async function getRekognitionClientSessionResultController(req, reply) {
    try {
        const { sessionId } = query.parse(req.query);
        const result = await (0, rekognitionClientSessionResult_1.getSessionResultHandler)(sessionId);
        reply.send(result);
    }
    catch (err) {
        reply.code(500).send({
            error: 'Internal server error! It was not possible to create a liveness session',
        });
    }
}
exports.getRekognitionClientSessionResultController = getRekognitionClientSessionResultController;
