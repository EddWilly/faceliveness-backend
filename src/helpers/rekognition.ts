// helpers/rekognition.js

import { Rekognition } from '@aws-sdk/client-rekognition'
import { Amplify, withSSRContext } from 'aws-amplify'
import { FastifyRequest } from 'fastify'
import awsExports from '../aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

export async function getRekognitionClient(req?: FastifyRequest) {
  try {
    const { Credentials } = withSSRContext({ req })

    const credentials = await Credentials.get()
    const rekognitionClient = new Rekognition({
      region: 'us-east-1',
      credentials,
      endpoint: 'https://rekognition.us-east-1.amazonaws.com',
    })
    return rekognitionClient
  } catch (err) {
    console.error(err)
    throw new Error('Error getting Rekognition client.')
  }
}
