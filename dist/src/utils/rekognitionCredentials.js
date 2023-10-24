"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRekognitionClient = void 0;
const client_rekognition_1 = require("@aws-sdk/client-rekognition");
const aws_amplify_1 = require("aws-amplify");
async function getRekognitionClient() {
    try {
        const { Credentials } = (0, aws_amplify_1.withSSRContext)({});
        const credentials = await Credentials.get();
        const rekognitionClient = new client_rekognition_1.Rekognition({
            region: "us-east-1",
            credentials,
            endpoint: "https://rekognition.us-east-1.amazonaws.com",
            apiVersion: "2016-06-27",
        });
        return rekognitionClient;
    }
    catch (err) {
        console.error(err);
        throw new Error("Error getting Rekognition client.");
    }
}
exports.getRekognitionClient = getRekognitionClient;
