import { prismaClient } from '../configs/prisma'

export async function changeOrderToImageProfilePic(
  imageId: number,
  order: number,
) {
  const result = await prismaClient.playdate_auth_profilepic.update({
    where: {
      id: imageId,
    },
    data: {
      order,
    },
    select: {
      playdate_auth_profile: {
        select: {
          id: true,
        },
      },
    },
  })

  await prismaClient.playdate_auth_profilepic.updateMany({
    where: {
      profile_id: Number(result.playdate_auth_profile.id),
      order,
      NOT: {
        id: imageId,
      },
    },
    data: {
      order: {
        increment: 1,
      },
    },
  })
}
