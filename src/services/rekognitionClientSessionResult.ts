import { getRekognitionClient } from '../helpers/rekognition.js'

export async function getSessionResultHandler(sessionId: string) {
  const rekognition = await getRekognitionClient()
  const response = await rekognition
    .getFaceLivenessSessionResults({ SessionId: sessionId })
    .then()
  return {
    sessionId: response.SessionId,
    confidence: response.Confidence,
    referenceImage: response.ReferenceImage,
    status: response.Status,
  }
}
