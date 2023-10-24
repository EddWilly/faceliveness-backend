"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const addImageProfilePic_1 = require("../controllers/addImageProfilePic");
const changeOrderImageProfilePic_1 = require("../controllers/changeOrderImageProfilePic");
const checkForInappropriateContent_1 = require("../controllers/checkForInappropriateContent");
const createRekognitionClientSession_1 = require("../controllers/createRekognitionClientSession");
const getRekognitionClientSesionResult_1 = require("../controllers/getRekognitionClientSesionResult");
const removeImageProfilePic_1 = require("../controllers/removeImageProfilePic");
const uploader = (0, fastify_multer_1.default)({});
async function router(instance) {
    instance.get('/heath', () => {
        return {
            ok: true,
        };
    });
    instance.post('/add-image', { preHandler: uploader.single('image') }, addImageProfilePic_1.addImageProfileController);
    instance.put('/change-order/:imageId', changeOrderImageProfilePic_1.changeOrderImageProfilePic);
    instance.get('/api/createSession', createRekognitionClientSession_1.createRekognitionClientSessionController);
    instance.get('/api/checkInappropriateContent', checkForInappropriateContent_1.checkForInappropriateContentController);
    instance.get('/api/getFaceLivenessResults', getRekognitionClientSesionResult_1.getRekognitionClientSessionResultController);
    instance.delete('/deleteImage/:imageId', removeImageProfilePic_1.removeImageProfilePicController);
}
exports.router = router;
// app.get("/api/createSession", async (request, response) => {
//   const sessionId = await createSessionHandler(request, response);
// });
// app.get("/api/getFaceLivenessResults", async (req, res) => {
//   const result = await getSessionResultHandler(req.query.sessionId);
//   res.json(result);
// });
// app.get("/api/checkInappropriateContent", async (req, res) => {
//   const objectKey = req.query.objectKey;
//   const result = await checkForInappropriateContent(objectKey);
//   res.json(result);
// });
// app.post("/api/text/moderations", textController)
