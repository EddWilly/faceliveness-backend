// pages/api/get.js

import { Request, Response } from 'express'
import { getRekognitionClient } from '../helpers/rekognition'

export async function createRekognitionClientSessionController(
  req: Request,
  reply: Response,
) {
  const { sessionId } = req.query as { sessionId: string }
  const rekognition = await getRekognitionClient()
  const response = await rekognition
    .getFaceLivenessSessionResults({
      SessionId: sessionId,
    })
    .then((resp) => resp)

  if (!response) {
    return reply.status(404).json({
      error: 'Session not found',
    })
  }

  const isLive = response?.Confidence && response?.Confidence >= 65

  reply.status(200).json({
    isLive,
  })
}
