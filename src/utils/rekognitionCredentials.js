import { withSSRContext } from "aws-amplify";
import { Rekognition } from "@aws-sdk/client-rekognition";

export async function getRekognitionClient() {
  try {
    const { Credentials } = withSSRContext({});
    const credentials = await Credentials.get();
    const rekognitionClient = new Rekognition({
      region: "us-east-1",
      credentials,
      endpoint: "https://rekognition.us-east-1.amazonaws.com",
      apiVersion: "2016-06-27",
    });
    return rekognitionClient;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting Rekognition client.");
  }
}
