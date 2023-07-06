import { Amplify, withSSRContext } from 'aws-amplify';
import { Rekognition } from '@aws-sdk/client-rekognition';

const { Credentials } = withSSRContext({});
  
const credentials = await Credentials.get();
//Put this inside the function
const rekognition = new Rekognition({
  region: 'eu-west-2',
  credentials,
  endpoint: 'https://rekognition.eu-west-2.amazonaws.com',
});

 export const checkForInappropriateContent = async (key) => {

  const bucketName = "playdate.prod"
  const params = {
    Image: {
      S3Object: {
          Bucket: bucketName,
          Name: key
      }
    },
  
    MinConfidence: 60
  }

  try {
    
    const moderationLabels = await rekognition.detectModerationLabels(params);
  
    if (moderationLabels.ModerationLabels.length > 0) {
      if(moderationLabels.ModerationLabels[1].Name === "Explicit Nudity"){
        console.log(`Nudity content detected in image: ${key}`);
        console.log("Confidence: " + moderationLabels.ModerationLabels[1].Confidence)
        console.log(`Deleting image...`);
        // const command = new DeleteObjectCommand(params);
        // const response = await s3Client.send(command);
        // return response
        const response = {
          inappropriate: true,
          moderationLabels: {
            name: moderationLabels.ModerationLabels[0].Name,
            parentName: moderationLabels.ModerationLabels[0].ParentName, 
            confidence: moderationLabels.ModerationLabels[0].Confidence
          }
        }
        return response
      }
    }
  } catch (err) {
    console.log(err)
  }
}