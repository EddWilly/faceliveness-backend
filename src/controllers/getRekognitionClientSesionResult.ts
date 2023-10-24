import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getSessionResultHandler } from '../services/rekognitionClientSessionResult'

const query = z.object({
  sessionId: z.string(),
})

export async function getRekognitionClientSessionResultController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { sessionId } = query.parse(req.query)

    const result = await getSessionResultHandler(sessionId)

    reply.send(result)
  } catch (err) {
    reply.code(500).send({
      error:
        'Internal server error! It was not possible to create a liveness session',
    })
  }
}
