import { Request, Response } from 'express'
import { z } from 'zod'
import { getSessionResultHandler } from '../services/rekognitionClientSessionResult'

const query = z.object({
  sessionId: z.string(),
})

export async function getRekognitionClientSessionResultController(
  req: Request,
  reply: Response,
) {
  try {
    const { sessionId } = query.parse(req.query)

    const result = await getSessionResultHandler(sessionId)

    reply.json(result)
  } catch (err) {
    reply.status(500).json({
      error:
        'Internal server error! It was not possible to create a liveness session',
    })
  }
}
