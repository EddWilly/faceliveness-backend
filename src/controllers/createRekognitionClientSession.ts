// pages/api/get.js

import { FastifyReply, FastifyRequest } from 'fastify'
import { getRekognitionClient } from '../helpers/rekognition'

export async function createRekognitionClientSessionController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = req.query as { sessionId: string }
  const rekognition = await getRekognitionClient()
  const response = await rekognition
    .getFaceLivenessSessionResults({
      SessionId: sessionId,
    })
    .then((resp) => resp)

  if (!response) {
    return reply.code(404).send({
      error: 'Session not found',
    })
  }

  const isLive = response?.Confidence && response?.Confidence >= 65

  reply.code(200).send({
    isLive,
  })
}
