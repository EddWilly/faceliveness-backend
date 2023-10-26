import { Request, Response, Router } from 'express'
import multer from 'multer'
import { addImageProfileController } from '../controllers/addImageProfilePic'
import { changeOrderImageProfilePic } from '../controllers/changeOrderImageProfilePic'
import { checkForInappropriateContentController } from '../controllers/checkForInappropriateContent'
import { createRekognitionClientSessionController } from '../controllers/createRekognitionClientSession'
import { getRekognitionClientSessionResultController } from '../controllers/getRekognitionClientSesionResult'
import { removeImageProfilePicController } from '../controllers/removeImageProfilePic'

const uploader = multer({})

const router = Router()

router.get('/heath', (req: Request, res: Response) => {
  res.json({
    ok: true,
  })
})

router.post('/add-image', uploader.single('image'), addImageProfileController)
router.put('/change-order/:imageId', changeOrderImageProfilePic)
router.get('/api/createSession', createRekognitionClientSessionController)
router.get(
  '/api/checkInappropriateContent',
  checkForInappropriateContentController,
)
router.get(
  '/api/getFaceLivenessResults',
  getRekognitionClientSessionResultController,
)
router.delete('/deleteImage/:imageId', removeImageProfilePicController)

export { router }

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
