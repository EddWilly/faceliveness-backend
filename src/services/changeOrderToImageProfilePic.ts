import { prismaClient } from '../configs/prisma'

export async function changeOrderToImageProfilePic(
  imageId: number,
  order: number,
) {
  await prismaClient.playdate_auth_profilepic.update({
    where: {
      id: imageId,
    },
    data: {
      order,
    },
  })
}
