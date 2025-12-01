import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3-upload";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    // Upload to S3
    const s3Key = await uploadToS3(file, session.user.id, "reference");
    const url = `https://floorplans.t3.storage.dev/${s3Key}`;

    return Response.json({
      success: true,
      s3Key,
      url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
