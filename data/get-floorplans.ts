import "server-only";

import { prisma as db } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getFloorplansData() {
  const user = await requireUser();

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      folders: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          plans: {
            select: {
              id: true,
              stagingStyle: true,
              furnishingDensity: true,
              colorTone: true,
              angle: true,
              additionalNotes: true,
              isFavorite: true,
              isArchived: true,
              createdAt: true,
              referenceS3Key: true,
              generatedS3Key: true,
              folderId: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      floorplans: {
        select: {
          id: true,
          stagingStyle: true,
          furnishingDensity: true,
          colorTone: true,
          angle: true,
          additionalNotes: true,
          isFavorite: true,
          isArchived: true,
          createdAt: true,
          referenceS3Key: true,
          generatedS3Key: true,
          folderId: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export type FloorplansDataType = Awaited<ReturnType<typeof getFloorplansData>>;
