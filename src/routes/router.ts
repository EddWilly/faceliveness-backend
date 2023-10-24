import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { addImageProfileController } from '../controllers/addImageProfilePic'
import { changeOrderImageProfilePic } from '../controllers/changeOrderImageProfilePic'
import { checkForInappropriateContentController } from '../controllers/checkForInappropriateContent'
import { createRekognitionClientSessionController } from '../controllers/createRekognitionClientSession'
import { getRekognitionClientSessionResultController } from '../controllers/getRekognitionClientSesionResult'
import { removeImageProfilePicController } from '../controllers/removeImageProfilePic'

const uploader = multer({})

export async function router(instance: FastifyInstance) {
  instance.get('/heath', () => {
    return {
      ok: true,
    }
  })

  instance.post(
    '/add-image',
    { preHandler: uploader.single('image') },
    addImageProfileController,
  )
  instance.put('/change-order/:imageId', changeOrderImageProfilePic)
  instance.get('/api/createSession', createRekognitionClientSessionController)
  instance.get(
    '/api/checkInappropriateContent',
    checkForInappropriateContentController,
  )
  instance.get(
    '/api/getFaceLivenessResults',
    getRekognitionClientSessionResultController,
  )
  instance.delete('/deleteImage/:imageId', removeImageProfilePicController)
}

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
