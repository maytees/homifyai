import { generateText } from "ai";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
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

  // Check if user's email is verified
  if (!session.user.emailVerified) {
    return Response.json(
      {
        error: "Email not verified",
        message:
          "Please verify your email address before generating floor plans.",
      },
      {
        status: 403,
      },
    );
  }

  // Check user credits
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Check if user has credits available
  if (user.credits <= 0) {
    return Response.json(
      {
        error: "No credits available",
        message:
          "You've used all your credits. Please upgrade to Pro or purchase additional credits.",
      },
      {
        status: 403,
      },
    );
  }

  const { prompt, imageUrl }: { prompt: string; imageUrl: string } =
    await req.json();

  const result = await generateText({
    model: "google/gemini-3-pro-image",
    // model: "google/gemini-2.5-flash-image", // Doesn't work well
    // system: `
    // You are an AI App called Homeify AI, which turns blueprints of floorplans
    // into a furniture full home floor image. Create a 3d rendering image of the
    // attached floorplan with furniture based on the prompt
    // given by the user. ONLY return the image, do not communicate back with text.
    // Give only ONE image. In the final generated image, remove any text and graphics
    // from the original reference image. There are two options for the angle, either top down, meaning a birds eye view,
    // from teh top, not at all from an angle, or if the property is on a prespective 3d, then do a 45 degree
    // view NOT a first person in the home view, just a 3d prespective of the layout model.
    // `,
    system: `You are Homeify AI. Transform floor plan blueprints into furnished 3D renderings. If the uploaded image is not a valid floor plan (photos, people, objects, memes, or non-architectural content), respond ONLY with: ERROR:NOT_FLOOR_PLAN — otherwise proceed with generation.
The floor plan is your ONLY source of truth. Before rendering, carefully count every door and note its exact position along each wall. Render doors ONLY where door symbols (arc + line) appear in the floor plan - never add extra doors, doors to nowhere, or doors leading outside unless explicitly shown. If the plan shows 3 doors, your rendering must have exactly 3 doors in those exact positions. Gaps in walls without door symbols are open passages, not walls or doors - keep them open. Never add walls that don't exist, never close off open-concept spaces, and ensure every room remains accessible. Generate only a single image with no text, removing all original labels and dimensions. Apply the user's specified style, furniture density, color tone, and viewing angle while furnishing rooms appropriately (beds in bedrooms, sofas in living rooms, etc.) without blocking any doorways or passages. Key terms: P-Tac means AC unit, WIC means walk-in closet, ENS means ensuite bathroom.
`,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  if (result.text) {
    process.stdout.write(`\nAssistant: ${result.text}\n`);

    // Check if AI detected invalid image type
    if (result.text.includes("ERROR:NOT_FLOOR_PLAN")) {
      return Response.json(
        {
          error: "INVALID_IMAGE_TYPE",
          code: "NOT_FLOOR_PLAN",
          message:
            "The uploaded image doesn't appear to be a floor plan. Please upload a blueprint or architectural drawing showing a top-down view of a building layout.",
        },
        {
          status: 400,
        },
      );
    }
  }

  for (const file of result.files) {
    if (file.mediaType.startsWith("image/")) {
      // Deduct credit after successful generation
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          credits: { decrement: 1 },
          lifetimeCredits: { increment: 1 },
        },
      });

      // If user has subscription, update subscription credits used
      if (user.subscription) {
        await prisma.subscription.update({
          where: { id: user.subscription.id },
          data: {
            creditsUsed: { increment: 1 },
          },
        });
      }

      return new Response(Buffer.from(file.uint8Array), {
        headers: {
          "Content-Type": file.mediaType,
        },
      });
    }
  }
}
