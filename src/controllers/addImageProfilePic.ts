import { Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { ExplicitNudityError } from '../errors/ExplicitNudityError'
import { ImageNotFountError } from '../errors/ImageNotFounError'
import { addImageToProfilePic } from '../services/addImageToProfilePic'

const bodySchema = z.object({
  userId: z.string().transform(Number),
  order: z.string().transform(Number),
  isProfile: z.string().transform((str) => str === 'true'),
})

export async function addImageProfileController(req: Request, reply: Response) {
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

    reply.status(201).json({
      link: response.link,
      order: response.order,
      is_profile: response.is_profile,
      id: Number(response.id),
    })
  } catch (err) {
    console.log({ err })
    if (err instanceof ZodError) {
      reply.status(400).json({
        error: JSON.parse(err.message),
      })
    }
    if (err instanceof ImageNotFountError) {
      reply.status(err.code).json({
        error: err.message,
      })
    }
    if (err instanceof ExplicitNudityError) {
      reply.status(err.code).json({
        error: err.message,
      })
    }
    reply.status(500).json({
      error: err,
      message: 'Internal server error',
    })
  }
}
