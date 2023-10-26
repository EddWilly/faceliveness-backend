import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { prismaClient } from '../configs/prisma'

const paramsParser = z.object({
  imageId: z.string().transform(Number),
})

export async function removeImageProfilePicController(
  req: Request,
  reply: Response,
) {
  try {
    const { imageId } = paramsParser.parse(req.params)

    await prismaClient.playdate_auth_profilepic.delete({
      where: {
        id: imageId,
      },
    })
    reply.status(StatusCodes.NO_CONTENT)
  } catch (err) {
    console.log(err)
  }
}
