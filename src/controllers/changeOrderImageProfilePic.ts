import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { prismaClient } from '../configs/prisma'

const changeOrderSchema = z.object({
  newOrder: z.number(),
})
const paramsOrderSchema = z.object({
  imageId: z.string().transform(Number),
})

export async function changeOrderImageProfilePic(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { imageId } = paramsOrderSchema.parse(req.params)
    const { newOrder } = changeOrderSchema.parse(req.body)

    await prismaClient.playdate_auth_profilepic.update({
      where: {
        id: imageId,
      },
      data: {
        order: newOrder,
      },
    })

    reply.code(StatusCodes.NO_CONTENT)
  } catch (err) {
    console.log(err)
  }
}
