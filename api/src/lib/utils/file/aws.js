import AWS from "aws-sdk";

export const S3 = new AWS.S3({
    region: "default",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    s3BucketEndpoint: true,
    s3ForcePathStyle: true
});