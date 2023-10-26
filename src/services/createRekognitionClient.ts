import { Request, Response } from 'express'
import { getRekognitionClient } from '../helpers/rekognition.js'

export async function createSessionHandler(req: Request, reply: Response) {
  try {
    const rekognition = await getRekognitionClient(req)
    const { SessionId } = await rekognition
      .createFaceLivenessSession({})
      .then((resp) => resp)

    reply.status(200).json({
      sessionId: SessionId,
    })
  } catch (error) {
    console.error(error)
    reply.status(500).json({
      error:
        'Internal server error! It was not possible to create a liveness session',
    })
  }

  //   const rekognition = await getRekognitionClient();
  //     const response = rekognition.createFaceLivenessSession().then();

  //     res.status(200).json({
  //         sessionId: response.SessionId,
  //     });
}
