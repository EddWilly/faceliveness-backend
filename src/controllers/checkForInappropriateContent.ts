import { Rekognition } from '@aws-sdk/client-rekognition'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { withSSRContext } from 'aws-amplify'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { BUCKET_NAME } from '../common/constants'
import { bucket } from '../configs/bucket'

const query = z.object({
  objectKey: z.string(),
})

export const checkForInappropriateContentController = async (
  req: Request,
  res: Response,
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

      res.json(response)
    }
    const response = {
      inappropriate: false,
    }

    res.json(response)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err,
    })
  }
}
// https://s3.eu-west-2.amazonaws.com/playdate.prod/1688064616
