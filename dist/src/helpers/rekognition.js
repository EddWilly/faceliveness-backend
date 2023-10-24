"use strict";
// helpers/rekognition.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRekognitionClient = void 0;
const client_rekognition_1 = require("@aws-sdk/client-rekognition");
const aws_amplify_1 = require("aws-amplify");
const aws_exports_js_1 = __importDefault(require("../aws-exports.js"));
aws_amplify_1.Amplify.configure({ ...aws_exports_js_1.default, ssr: true });
async function getRekognitionClient(req) {
    try {
        const { Credentials } = (0, aws_amplify_1.withSSRContext)({ req });
        const credentials = await Credentials.get();
        const rekognitionClient = new client_rekognition_1.Rekognition({
            region: 'us-east-1',
            credentials,
            endpoint: 'https://rekognition.us-east-1.amazonaws.com',
        });
        return rekognitionClient;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error getting Rekognition client.');
    }
}
exports.getRekognitionClient = getRekognitionClient;
