import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { floorplansBucket, s3 } from "./s3client";

/**
 * Uploads a file to S3 and returns the S3 key
 * @param file - The file to upload (File or Blob)
 * @param userId - The user ID for organizing files
 * @param prefix - Optional prefix for the S3 key (e.g., 'reference' or 'generated')
 * @returns The S3 key of the uploaded file
 */
export async function uploadToS3(
  file: File | Blob,
  userId: string,
  prefix: "reference" | "generated" = "reference",
): Promise<string> {
  if (!floorplansBucket) {
    throw new Error("AWS_FLOORPLANS_BUCKET environment variable is not set");
  }

  // Generate a unique key for the file
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const extension = file instanceof File ? file.name.split(".").pop() : "png";
  const s3Key = `floorplans/${userId}/${prefix}/${timestamp}-${randomId}.${extension}`;

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Determine content type
  const contentType = file instanceof File ? file.type : "image/png";

  // Upload to S3
  const command = new PutObjectCommand({
    Bucket: floorplansBucket,
    Key: s3Key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return s3Key;
}

/**
 * Converts a data URL (from canvas or blob URL) to a File object
 * @param dataUrl - The data URL to convert
 * @param filename - The filename for the file
 * @returns A File object
 */
export async function dataUrlToFile(
  dataUrl: string,
  filename: string,
): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Converts a blob URL to a File object
 * @param blobUrl - The blob URL to convert
 * @param filename - The filename for the file
 * @returns A File object
 */
export async function blobUrlToFile(
  blobUrl: string,
  filename: string,
): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

/**
 * Gets the public URL for an S3 object
 * @param s3Key - The S3 key of the object
 * @returns The public URL to access the object
 */
export function getS3Url(s3Key: string): string {
  return `https://floorplans.t3.storage.dev/${s3Key}`;
}

/**
 * Deletes a file from S3
 * @param s3Key - The S3 key of the object to delete
 */
export async function deleteFromS3(s3Key: string): Promise<void> {
  if (!floorplansBucket) {
    throw new Error("AWS_FLOORPLANS_BUCKET environment variable is not set");
  }

  const command = new DeleteObjectCommand({
    Bucket: floorplansBucket,
    Key: s3Key,
  });

  await s3.send(command);
}
