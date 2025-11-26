"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { requireUser } from "@/data/require-user";
import { prisma } from "@/lib/db";
import { deleteFromS3, uploadToS3 } from "@/lib/s3-upload";
import type { ApiResponse } from "@/lib/types";

// ==================== FOLDER ACTIONS ====================

export async function createFolder(
  folderName: string,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!folderName || !folderName.trim()) {
      return {
        status: "error",
        message: "Folder name is required",
      };
    }

    const trimmedName = folderName.trim();

    if (trimmedName.length > 50) {
      return {
        status: "error",
        message: "Folder name must be less than 50 characters",
      };
    }

    await prisma.folder.create({
      data: {
        name: trimmedName,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Folder created successfully!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2002":
          return {
            status: "error",
            message: "A folder with this name already exists",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to create folder:\n", e);
    return {
      status: "error",
      message: "Failed to create folder. Please try again.",
    };
  }
}

export async function deleteFolder(folderId: string): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!folderId) {
      return {
        status: "error",
        message: "Folder ID is required",
      };
    }

    // First, verify the folder belongs to the user
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
        userId: user.id,
      },
    });

    if (!folder) {
      return {
        status: "error",
        message: "Folder not found",
      };
    }

    // Delete the folder (plans will be set to null due to onDelete: SetNull)
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    return {
      status: "success",
      message: "Folder deleted successfully!",
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

    console.error("Failed to delete folder:\n", e);
    return {
      status: "error",
      message: "Failed to delete folder. Please try again.",
    };
  }
}

export async function moveFloorplanToFolder(
  floorplanId: string,
  folderId: string | null,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!floorplanId) {
      return {
        status: "error",
        message: "Floor plan ID is required",
      };
    }

    // Verify the floor plan belongs to the user
    const floorplan = await prisma.floorplan.findUnique({
      where: {
        id: floorplanId,
        userId: user.id,
      },
    });

    if (!floorplan) {
      return {
        status: "error",
        message: "Floor plan not found",
      };
    }

    // If moving to a folder, verify it belongs to the user
    if (folderId) {
      const folder = await prisma.folder.findUnique({
        where: {
          id: folderId,
          userId: user.id,
        },
      });

      if (!folder) {
        return {
          status: "error",
          message: "Folder not found",
        };
      }
    }

    // Update the floor plan's folder
    await prisma.floorplan.update({
      where: {
        id: floorplanId,
      },
      data: {
        folderId: folderId,
      },
    });

    return {
      status: "success",
      message: folderId
        ? "Floor plan moved to folder!"
        : "Floor plan removed from folder!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Floor plan or folder not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to move floor plan:\n", e);
    return {
      status: "error",
      message: "Failed to move floor plan. Please try again.",
    };
  }
}

// ==================== FLOORPLAN ACTIONS ====================

export async function toggleArchiveFloorplan(
  floorplanId: string,
  isArchived: boolean,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!floorplanId) {
      return {
        status: "error",
        message: "Floor plan ID is required",
      };
    }

    // Verify the floor plan belongs to the user
    const floorplan = await prisma.floorplan.findUnique({
      where: {
        id: floorplanId,
        userId: user.id,
      },
    });

    if (!floorplan) {
      return {
        status: "error",
        message: "Floor plan not found",
      };
    }

    // Update the archive status
    await prisma.floorplan.update({
      where: {
        id: floorplanId,
      },
      data: {
        isArchived: isArchived,
      },
    });

    return {
      status: "success",
      message: isArchived
        ? "Floor plan archived successfully!"
        : "Floor plan unarchived successfully!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Floor plan not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to toggle archive status:\\n", e);
    return {
      status: "error",
      message: "Failed to update floor plan. Please try again.",
    };
  }
}

export async function renameFloorplan(
  floorplanId: string,
  newName: string,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!floorplanId) {
      return {
        status: "error",
        message: "Floor plan ID is required",
      };
    }

    if (!newName || !newName.trim()) {
      return {
        status: "error",
        message: "Floor plan name is required",
      };
    }

    const trimmedName = newName.trim();

    if (trimmedName.length > 100) {
      return {
        status: "error",
        message: "Floor plan name must be less than 100 characters",
      };
    }

    // Verify the floor plan belongs to the user
    const floorplan = await prisma.floorplan.findUnique({
      where: {
        id: floorplanId,
        userId: user.id,
      },
    });

    if (!floorplan) {
      return {
        status: "error",
        message: "Floor plan not found",
      };
    }

    // Update the floor plan name
    await prisma.floorplan.update({
      where: {
        id: floorplanId,
      },
      data: {
        stagingStyle: trimmedName,
      },
    });

    return {
      status: "success",
      message: "Floor plan renamed successfully!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Floor plan not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to rename floor plan:\\n", e);
    return {
      status: "error",
      message: "Failed to rename floor plan. Please try again.",
    };
  }
}

export async function toggleFavoriteFloorplan(
  floorplanId: string,
  isFavorite: boolean,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!floorplanId) {
      return {
        status: "error",
        message: "Floor plan ID is required",
      };
    }

    // Verify the floor plan belongs to the user
    const floorplan = await prisma.floorplan.findUnique({
      where: {
        id: floorplanId,
        userId: user.id,
      },
    });

    if (!floorplan) {
      return {
        status: "error",
        message: "Floor plan not found",
      };
    }

    // Update the favorite status
    await prisma.floorplan.update({
      where: {
        id: floorplanId,
      },
      data: {
        isFavorite: isFavorite,
      },
    });

    return {
      status: "success",
      message: isFavorite
        ? "Added to favorites!"
        : "Removed from favorites!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Floor plan not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to toggle favorite status:\\n", e);
    return {
      status: "error",
      message: "Failed to update favorite status. Please try again.",
    };
  }
}

export async function deleteFloorplan(
  floorplanId: string,
): Promise<ApiResponse> {
  try {
    const user = await requireUser();

    if (!floorplanId) {
      return {
        status: "error",
        message: "Floor plan ID is required",
      };
    }

    // First, get the floor plan to retrieve S3 keys and verify ownership
    const floorplan = await prisma.floorplan.findUnique({
      where: {
        id: floorplanId,
        userId: user.id,
      },
    });

    if (!floorplan) {
      return {
        status: "error",
        message: "Floor plan not found",
      };
    }

    // Delete images from S3 first
    try {
      await Promise.all([
        deleteFromS3(floorplan.referenceS3Key),
        deleteFromS3(floorplan.generatedS3Key),
      ]);
    } catch (s3Error) {
      console.error("Failed to delete S3 objects:\\n", s3Error);
      // Continue with database deletion even if S3 deletion fails
      // This prevents orphaned database records
    }

    // Delete the floor plan from database
    await prisma.floorplan.delete({
      where: {
        id: floorplanId,
      },
    });

    return {
      status: "success",
      message: "Floor plan deleted successfully!",
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2025":
          return {
            status: "error",
            message: "Floor plan not found",
          };
        default:
          return {
            status: "error",
            message: `Database error: ${e.code}`,
          };
      }
    }

    console.error("Failed to delete floor plan:\\n", e);
    return {
      status: "error",
      message: "Failed to delete floor plan. Please try again.",
    };
  }
}

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
