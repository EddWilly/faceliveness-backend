import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { changeOrderToImageProfilePic } from '../services/changeOrderToImageProfilePic'

const changeOrderSchema = z.object({
  newOrder: z.number(),
})
const paramsOrderSchema = z.object({
  imageId: z.string().transform(Number),
})

export async function changeOrderImageProfilePic(
  req: Request,
  reply: Response,
) {
  try {
    const { imageId } = paramsOrderSchema.parse(req.params)
    const { newOrder } = changeOrderSchema.parse(req.body)

    changeOrderToImageProfilePic(imageId, newOrder)

    reply.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    console.log(err)

    reply.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}
