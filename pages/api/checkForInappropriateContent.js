import { Amplify, withSSRContext } from "aws-amplify";
import { Rekognition } from "@aws-sdk/client-rekognition";
import aws from "aws-sdk";

const { Credentials } = withSSRContext({});

const credentials = await Credentials.get();
//Put this inside the function
const rekognition = new Rekognition({
  region: "eu-west-2",
  credentials,
  endpoint: "https://rekognition.eu-west-2.amazonaws.com",
});

const bucket = new aws.S3({
  region: "eu-west-2",
  accessKeyId: process.env.AWS_SECRET_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const checkForInappropriateContent = async (key) => {
  const bucketName = "playdate.prod";
  const params = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: key,
      },
    },

    MinConfidence: 60,
  };
  console.log({ key });
  try {
    const moderationLabels = await rekognition.detectModerationLabels(params);

    if (moderationLabels.ModerationLabels.length > 0) {
      console.log({ moderationLabels: moderationLabels.ModerationLabels });
      if (moderationLabels.ModerationLabels[1].Name === "Explicit Nudity") {
        // const command = new DeleteObjectCommand(params);
        // const response = await s3Client.send(command);
        // return response
        const response = {
          inappropriate: true,
          moderationLabels: {
            name: moderationLabels.ModerationLabels[0].Name,
            parentName: moderationLabels.ModerationLabels[0].ParentName,
            confidence: moderationLabels.ModerationLabels[0].Confidence,
          },
        };
        bucket.deleteObject({ Key: key, Bucket: bucketName }, (err) => {
          console.log({ err });
        });
        return response;
      } else {
        const response = {
          inappropriate: false,
        };

        return response;
      }
    } else {
      const response = {
        inappropriate: false,
      };

      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
//https://s3.eu-west-2.amazonaws.com/playdate.prod/1688064616
