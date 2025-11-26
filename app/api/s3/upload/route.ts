// app/api/s3/upload/route.ts

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { auth } from "@/lib/auth";
import { floorplansBucket, s3 } from "@/lib/s3client";

const uploadFloorplanSchema = z.object({
  fileName: z.string().min(1, { message: "Filename is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "Size is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();
    const validationResult = uploadFloorplanSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.message },
        { status: 400 },
      );
    }

    const { fileName, contentType, size } = validationResult.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: floorplansBucket,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 360 }); // Expire sin 6 minutes

    const response = {
      preSignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
