import { Rekognition } from '@aws-sdk/client-rekognition'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { withSSRContext } from 'aws-amplify'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { BUCKET_NAME } from '../common/constants'
import { bucket } from '../configs/bucket'
import { CheckInappropriateContent } from '../errors/CheckInappropriateContent'

const query = z.object({
  objectKey: z.string(),
})

export const checkForInappropriateContentController = async (
  req: FastifyRequest,
) => {
  const { objectKey } = query.parse(req.query)

  const { Credentials } = withSSRContext({})
  const credentials = await Credentials.get()
  // Put this inside the function
  const rekognition = new Rekognition({
    region: 'eu-west-2',
    credentials,
    endpoint: 'https://rekognition.eu-west-2.amazonaws.com',
  })

  const params = {
    Image: {
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: objectKey,
      },
    },
    MinConfidence: 60,
  }
  try {
    const moderationLabels = await rekognition.detectModerationLabels(params)

    if (
      moderationLabels.ModerationLabels!.length > 0 &&
      moderationLabels.ModerationLabels![1].Name === 'Explicit Nudity'
    ) {
      const response = {
        inappropriate: true,
        moderationLabels: {
          name: moderationLabels.ModerationLabels![0].Name,
          parentName: moderationLabels.ModerationLabels![0].ParentName,
          confidence: moderationLabels.ModerationLabels![0].Confidence,
        },
      }

      const command = new DeleteObjectCommand({
        Key: objectKey,
        Bucket: BUCKET_NAME,
      })

      await bucket.send(command)

      return response
    }
    const response = {
      inappropriate: false,
    }

    return response
  } catch (err) {
    throw new CheckInappropriateContent(500, 'Something went wrong')
  }
}
// https://s3.eu-west-2.amazonaws.com/playdate.prod/1688064616
