"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForInappropriateContentController = void 0;
const client_rekognition_1 = require("@aws-sdk/client-rekognition");
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_amplify_1 = require("aws-amplify");
const zod_1 = require("zod");
const constants_1 = require("../common/constants");
const bucket_1 = require("../configs/bucket");
const CheckInappropriateContent_1 = require("../errors/CheckInappropriateContent");
const query = zod_1.z.object({
    objectKey: zod_1.z.string(),
});
const checkForInappropriateContentController = async (req) => {
    const { objectKey } = query.parse(req.query);
    const { Credentials } = (0, aws_amplify_1.withSSRContext)({});
    const credentials = await Credentials.get();
    // Put this inside the function
    const rekognition = new client_rekognition_1.Rekognition({
        region: 'eu-west-2',
        credentials,
        endpoint: 'https://rekognition.eu-west-2.amazonaws.com',
    });
    const params = {
        Image: {
            S3Object: {
                Bucket: constants_1.BUCKET_NAME,
                Name: objectKey,
            },
        },
        MinConfidence: 60,
    };
    try {
        const moderationLabels = await rekognition.detectModerationLabels(params);
        if (moderationLabels.ModerationLabels.length > 0 &&
            moderationLabels.ModerationLabels[1].Name === 'Explicit Nudity') {
            const response = {
                inappropriate: true,
                moderationLabels: {
                    name: moderationLabels.ModerationLabels[0].Name,
                    parentName: moderationLabels.ModerationLabels[0].ParentName,
                    confidence: moderationLabels.ModerationLabels[0].Confidence,
                },
            };
            const command = new client_s3_1.DeleteObjectCommand({
                Key: objectKey,
                Bucket: constants_1.BUCKET_NAME,
            });
            await bucket_1.bucket.send(command);
            return response;
        }
        const response = {
            inappropriate: false,
        };
        return response;
    }
    catch (err) {
        throw new CheckInappropriateContent_1.CheckInappropriateContent(500, 'Something went wrong');
    }
};
exports.checkForInappropriateContentController = checkForInappropriateContentController;
// https://s3.eu-west-2.amazonaws.com/playdate.prod/1688064616
