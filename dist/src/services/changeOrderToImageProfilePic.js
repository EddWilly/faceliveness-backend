"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderToImageProfilePic = void 0;
const prisma_1 = require("../configs/prisma");
async function changeOrderToImageProfilePic(imageId, order) {
    await prisma_1.prismaClient.playdate_auth_profilepic.update({
        where: {
            id: imageId,
        },
        data: {
            order,
        },
    });
}
exports.changeOrderToImageProfilePic = changeOrderToImageProfilePic;
