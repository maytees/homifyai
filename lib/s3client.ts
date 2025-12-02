import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: false,
});

export const floorplansBucket = process.env.NEXT_PUBLIC_AWS_FLOORPLANS_BUCKET;
