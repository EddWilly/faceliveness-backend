import { FastifyReply, FastifyRequest } from 'fastify'
import { getRekognitionClient } from '../helpers/rekognition.js'

export async function createSessionHandler(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const rekognition = await getRekognitionClient(req)
    const { SessionId } = await rekognition
      .createFaceLivenessSession({})
      .then((resp) => resp)
    return { sessionId: SessionId }
  } catch (error) {
    console.error(error)
    reply.code(500).send({
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
