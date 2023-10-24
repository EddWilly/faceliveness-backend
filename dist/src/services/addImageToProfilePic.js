"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImageToProfilePic = void 0;
const client_rekognition_1 = require("@aws-sdk/client-rekognition");
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_amplify_1 = require("aws-amplify");
const node_crypto_1 = require("node:crypto");
const constants_1 = require("../common/constants");
const bucket_1 = require("../configs/bucket");
const prisma_1 = require("../configs/prisma");
const ExplicitNudityError_1 = require("../errors/ExplicitNudityError");
async function addImageToProfilePic(input) {
    const { image } = input;
    const key = (0, node_crypto_1.randomUUID)().replaceAll('-', '');
    const command = new client_s3_1.PutObjectCommand({
        Bucket: constants_1.BUCKET_NAME,
        Key: key,
        Body: image.buffer,
        ContentType: image.mimetype,
    });
    await bucket_1.bucket.send(command);
    const { Credentials } = (0, aws_amplify_1.withSSRContext)({});
    const credentials = await Credentials.get();
    const rekognition = new client_rekognition_1.Rekognition({
        region: 'eu-west-2',
        credentials,
        endpoint: 'https://rekognition.eu-west-2.amazonaws.com',
    });
    const params = {
        Image: {
            S3Object: {
                Bucket: constants_1.BUCKET_NAME,
                Name: key,
            },
        },
        MinConfidence: 60,
    };
    const moderationLabels = await rekognition.detectModerationLabels(params);
    if (moderationLabels.ModerationLabels &&
        moderationLabels.ModerationLabels.some((moderation) => moderation.Name === 'Explicit Nudity')) {
        const command = new client_s3_1.DeleteObjectCommand({
            Key: key,
            Bucket: constants_1.BUCKET_NAME,
        });
        await bucket_1.bucket.send(command);
        throw new ExplicitNudityError_1.ExplicitNudityError('Explicit Nudity');
    }
    const url = `https://s3.eu-west-2.amazonaws.com/playdate.prod/${key}`;
    const result = await prisma_1.prismaClient.playdate_auth_profilepic.create({
        data: {
            order: input.order,
            created_at: new Date(),
            is_profile: input.isProfile,
            profile_id: input.userId,
            link: url,
            is_deleted: false,
            updated_at: new Date(),
        },
        select: {
            id: true,
            link: true,
            order: true,
            is_profile: true,
        },
    });
    return result;
}
exports.addImageToProfilePic = addImageToProfilePic;
