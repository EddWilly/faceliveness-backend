import { Rekognition } from '@aws-sdk/client-rekognition'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { withSSRContext } from 'aws-amplify'
import { Request } from 'express'
import { randomUUID } from 'node:crypto'
import { BUCKET_NAME } from '../common/constants'
import { bucket } from '../configs/bucket'
import { prismaClient } from '../configs/prisma'
import { ExplicitNudityError } from '../errors/ExplicitNudityError'

type Input = {
  image: {
    buffer: Buffer
    encoding: string
    fieldname: string
    mimetype: string
    originalname: string
    size: number
    filename: string
  }
  userId: number
  order: number
  isProfile: boolean
}

export async function addImageToProfilePic(input: Input, req: Request) {
  const { image } = input

  const key = randomUUID().replaceAll('-', '')

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: image.buffer,
    ContentType: image.mimetype,
  })
  await bucket.send(command)

  const { Credentials } = withSSRContext({ req })
  const credentials = await Credentials.get()

  const rekognition = new Rekognition({
    region: 'eu-west-2',
    credentials,
    endpoint: 'https://rekognition.eu-west-2.amazonaws.com',
  })

  const params = {
    Image: {
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: key,
      },
    },
    MinConfidence: 60,
  }

  const moderationLabels = await rekognition.detectModerationLabels(params)

  if (
    moderationLabels.ModerationLabels &&
    moderationLabels.ModerationLabels.some(
      (moderation) => moderation.Name === 'Explicit Nudity',
    )
  ) {
    const command = new DeleteObjectCommand({
      Key: key,
      Bucket: BUCKET_NAME,
    })

    await bucket.send(command)
    throw new ExplicitNudityError('Explicit Nudity')
  }

  const url = `https://s3.eu-west-2.amazonaws.com/playdate.prod/${key}`

  const result = await prismaClient.playdate_auth_profilepic.create({
    data: {
      order: input.order,
      created_at: new Date(),
      is_profile: input.isProfile,
      profile_id: input.userId,
      link: url,
      is_deleted: false,
      is_active: true,
      updated_at: new Date(),
    },
    select: {
      id: true,
      link: true,
      order: true,
      is_profile: true,
    },
  })

  return result
}
