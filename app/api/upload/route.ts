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
    const type = (formData.get("type") as string) || "floorplan"; // 'floorplan' or 'avatar'

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size based on type
    const maxSize = type === "avatar" ? 2 * 1024 * 1024 : 10 * 1024 * 1024; // 2MB for avatars, 10MB for floorplans
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      return Response.json(
        { error: `File size must be less than ${maxSizeMB}MB` },
        { status: 400 },
      );
    }

    // Upload to S3 with appropriate folder and prefix
    const folder = type === "avatar" ? "avatars" : "floorplans";
    const prefix = type === "avatar" ? "avatar" : "reference";
    const s3Key = await uploadToS3(
      file,
      session.user.id,
      prefix as "avatar" | "reference",
      folder as "avatars" | "floorplans",
    );
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
