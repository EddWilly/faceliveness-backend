"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImageProfileController = void 0;
const zod_1 = require("zod");
const ExplicitNudityError_1 = require("../errors/ExplicitNudityError");
const ImageNotFounError_1 = require("../errors/ImageNotFounError");
const addImageToProfilePic_1 = require("../services/addImageToProfilePic");
const bodySchema = zod_1.z.object({
    userId: zod_1.z.string().transform(Number),
    order: zod_1.z.string().transform(Number),
    isProfile: zod_1.z.string().transform((str) => str === 'true'),
});
async function addImageProfileController(req, reply) {
    try {
        const { isProfile, order, userId } = bodySchema.parse(req.body);
        const image = req.file;
        if (!image) {
            throw new ImageNotFounError_1.ImageNotFountError('Image not found');
        }
        const response = await (0, addImageToProfilePic_1.addImageToProfilePic)({
            image,
            userId,
            order,
            isProfile,
        });
        reply.code(201).send({
            link: response.link,
            order: response.order,
            is_profile: response.is_profile,
            id: Number(response.id),
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            reply.code(400).send({
                error: JSON.parse(err.message),
            });
        }
        if (err instanceof ImageNotFounError_1.ImageNotFountError) {
            reply.code(err.code).send({
                error: err.message,
            });
        }
        if (err instanceof ExplicitNudityError_1.ExplicitNudityError) {
            reply.code(err.code).send({
                error: err.message,
            });
        }
        reply.code(500).send({
            error: err,
            message: 'Internal server error',
        });
    }
}
exports.addImageProfileController = addImageProfileController;
