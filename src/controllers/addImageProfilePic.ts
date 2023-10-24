import { FastifyReply } from 'fastify'
import { ZodError, z } from 'zod'
import { CustonRequest } from '../@types/request'
import { ExplicitNudityError } from '../errors/ExplicitNudityError'
import { ImageNotFountError } from '../errors/ImageNotFounError'
import { addImageToProfilePic } from '../services/addImageToProfilePic'

const bodySchema = z.object({
  userId: z.string().transform(Number),
  order: z.string().transform(Number),
  isProfile: z.string().transform((str) => str === 'true'),
})

export async function addImageProfileController(
  req: CustonRequest,
  reply: FastifyReply,
) {
  try {
    const { isProfile, order, userId } = bodySchema.parse(req.body)

    const image = req.file

    if (!image) {
      throw new ImageNotFountError('Image not found')
    }
    const response = await addImageToProfilePic({
      image,
      userId,
      order,
      isProfile,
    })

    reply.code(201).send({
      link: response.link,
      order: response.order,
      is_profile: response.is_profile,
      id: Number(response.id),
    })
  } catch (err) {
    if (err instanceof ZodError) {
      reply.code(400).send({
        error: JSON.parse(err.message),
      })
    }
    if (err instanceof ImageNotFountError) {
      reply.code(err.code).send({
        error: err.message,
      })
    }
    if (err instanceof ExplicitNudityError) {
      reply.code(err.code).send({
        error: err.message,
      })
    }
    reply.code(500).send({
      error: err,
      message: 'Internal server error',
    })
  }
}
