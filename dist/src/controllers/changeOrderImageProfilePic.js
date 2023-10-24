"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderImageProfilePic = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const prisma_1 = require("../configs/prisma");
const changeOrderSchema = zod_1.z.object({
    newOrder: zod_1.z.number(),
});
const paramsOrderSchema = zod_1.z.object({
    imageId: zod_1.z.string().transform(Number),
});
async function changeOrderImageProfilePic(req, reply) {
    try {
        const { imageId } = paramsOrderSchema.parse(req.params);
        const { newOrder } = changeOrderSchema.parse(req.body);
        await prisma_1.prismaClient.playdate_auth_profilepic.update({
            where: {
                id: imageId,
            },
            data: {
                order: newOrder,
            },
        });
        reply.code(http_status_codes_1.StatusCodes.NO_CONTENT);
    }
    catch (err) {
        console.log(err);
    }
}
exports.changeOrderImageProfilePic = changeOrderImageProfilePic;
