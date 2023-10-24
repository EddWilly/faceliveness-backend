"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImageProfilePicController = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const prisma_1 = require("../configs/prisma");
const paramsParser = zod_1.z.object({
    imageId: zod_1.z.string().transform(Number),
});
async function removeImageProfilePicController(req, reply) {
    try {
        const { imageId } = paramsParser.parse(req.params);
        await prisma_1.prismaClient.playdate_auth_profilepic.delete({
            where: {
                id: imageId,
            },
        });
        reply.code(http_status_codes_1.StatusCodes.NO_CONTENT);
    }
    catch (err) {
        console.log(err);
    }
}
exports.removeImageProfilePicController = removeImageProfilePicController;
