"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { requireUser } from "@/data/require-user";
import { prisma } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3-upload";
import type { ApiResponse } from "@/lib/types";

export async function saveFloorplan(
  formData: FormData,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    // Extract form fields
    const stagingStyle = formData.get("stagingStyle") as string;
    const furnishingDensity = formData.get("furnishingDensity") as string;
    const colorTone = formData.get("colorTone") as string;
    const angle = formData.get("angle") as string;
    const additionalNotes = formData.get("additionalNotes") as string | null;
    const folderId = formData.get("folderId") as string | null;

    // Extract files
    const referenceImage = formData.get("referenceImage") as File;
    const generatedImage = formData.get("generatedImage") as File;

    // Validate required fields
    if (!stagingStyle || !furnishingDensity || !colorTone || !angle) {
      return {
        status: "error",
        message: "Missing required fields",
      };
    }

    if (!referenceImage || !generatedImage) {
      return {
        status: "error",
        message: "Both reference and generated images are required",
      };
    }

    // Upload images to S3
    const [referenceS3Key, generatedS3Key] = await Promise.all([
      uploadToS3(referenceImage, user.id, "reference"),
      uploadToS3(generatedImage, user.id, "generated"),
    ]);

    // Save to database
    await prisma.floorplan.create({
      data: {
        stagingStyle,
        furnishingDensity,
        colorTone,
        angle,
        additionalNotes: additionalNotes || undefined,
        referenceS3Key,
        generatedS3Key,
        folder: folderId
          ? {
              connect: {
                id: folderId,
              },
            }
          : undefined,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Floor plan saved successfully!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Folder not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to save floor plan:\n", e);
    return {
      status: "error",
      message: "Failed to save floor plan. Please try again.",
    };
  }
}
