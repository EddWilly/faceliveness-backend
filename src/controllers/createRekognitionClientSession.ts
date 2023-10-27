// pages/api/get.js

import { Request, Response } from 'express'
import { getRekognitionClient } from '../helpers/rekognition'

export async function createRekognitionClientSessionController(
  req: Request,
  reply: Response,
) {
  try {
    const rekognition = await getRekognitionClient()

    const { SessionId } = await rekognition.createFaceLivenessSession({})

    reply.status(200).json({
      SessionId,
    })
  } catch (err) {
    console.log(err)
    reply.status(500).json({
      error:
        'Internal server error! It was not possible to create a liveness session',
    })
  }
}
