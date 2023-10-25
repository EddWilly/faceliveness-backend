import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { openAiConfig } from '../configs/openai'

const bodySchema = z.object({
  input: z.string(),
})

export async function checkTextContentController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { input } = bodySchema.parse(req.body)

    const response = await openAiConfig.moderations.create({
      input,
    })

    const flagged = response.results[0].flagged

    return reply.send({ inappropriate: flagged })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
