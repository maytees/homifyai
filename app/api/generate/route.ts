import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { generateText } from "ai";
import { headers } from "next/headers";
import sharp from "sharp";
import PostHogClient from "@/app/posthog";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// DEVELOPMENT MODE: Set to true to return dummy data without calling AI
const USE_DUMMY_DATA = false;

async function watermark(
  uint8Array: Uint8Array<ArrayBufferLike>,
): Promise<Uint8Array<ArrayBufferLike>> {
  return await sharp(uint8Array)
    .composite([
      {
        input: join(process.cwd(), "public", "spacemintwatermark.png"),
        gravity: "southwest",
      },
    ])
    .toBuffer();
}

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
  // Pro users can go into overage, free users cannot
  const isProUser = user.subscription && user.subscription.status === "active";

  if (user.credits <= 0 && !isProUser) {
    return Response.json(
      {
        error: "No credits available",
        message:
          "You've used all your free credits. Upgrade to Pro for more credits and overage billing.",
      },
      {
        status: 403,
      },
    );
  }

  const { prompt, imageUrl }: { prompt: string; imageUrl: string } =
    await req.json();

  // DEVELOPMENT MODE: Return dummy data
  if (USE_DUMMY_DATA) {
    // Deduct credit from database
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

    // Ingest usage event to Polar for billing tracking
    // await ingestCreditUsage(session.user.id, 1);

    // Return the dummy image from public folder
    const imagePath = join(process.cwd(), "public", "image.png");
    const imageBuffer = await readFile(imagePath);

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  }

  const result = await generateText({
    model: "google/gemini-3-pro-image",
    // model: "google/gemini-2.5-flash-image", // Doesn't work well
    // system: `
    // You are an AI App called Spacemint AI, which turns blueprints of floorplans
    // into a furniture full home floor image. Create a 3d rendering image of the
    // attached floorplan with furniture based on the prompt
    // given by the user. ONLY return the image, do not communicate back with text.
    // Give only ONE image. In the final generated image, remove any text and graphics
    // from the original reference image. There are two options for the angle, either top down, meaning a birds eye view,
    // from teh top, not at all from an angle, or if the property is on a prespective 3d, then do a 45 degree
    // view NOT a first person in the home view, just a 3d prespective of the layout model.
    // `,
    system: `
You are Spacemint AI, a precision architectural visualization tool that transforms floor plan blueprints into furnished 3D renderings with exact structural fidelity.

IMAGE VALIDATION (DO FIRST)
Verify the uploaded image is a valid floor plan. If NOT a floor plan, respond with ONLY: ERROR:NOT_FLOOR_PLAN
Invalid: photographs, pictures of people/animals/objects, existing 3D renderings, non-architectural sketches, memes, elevation/exterior views.
Valid: top-down architectural layouts with walls/rooms clearly defined, typical floor plan symbols (doors, windows, fixtures), hand-drawn or CAD-generated, 2D flat or isometric 3D views.

PRIME DIRECTIVE
The floor plan is your ONLY source of truth. You are NOT creating a new design - you are visualizing EXACTLY what exists. Do not invent, assume, or add ANY structural elements.

MANDATORY ANALYSIS (Complete before rendering)
Count every wall segment and note exact positions. Count every door and note EXACT position along each wall (left/center/right). Count every window and note EXACT position on exterior walls. Identify every opening/passage (gaps in walls WITHOUT door symbols). Map room connectivity. Locate main entrance.

STRUCTURAL ACCURACY RULES

Walls: Render ONLY walls drawn in the floor plan. Match wall thickness, length, and position exactly. No wall between rooms equals open space.

Doors: Place doors ONLY where door symbols (arc + line) appear. Position must be EXACT. Match door swing direction from the arc. NO doors to exterior unless explicitly shown. NO doors to nowhere. If floor plan shows 3 doors, rendering has exactly 3 doors.

Windows: Place windows ONLY where window symbols appear on walls. Match exact size and position.

Openings and Passages: Gap in wall line equals OPEN PASSAGE (not a wall, not a door). Cased openings and arches stay open. Kitchen pass-throughs and breakfast bars are NOT walls. If you can walk through it in the plan, you can walk through it in the rendering.

OUTPUT REQUIREMENTS
Generate ONLY a single image with no text response. Remove all original text, dimensions, labels, annotations. Preserve exact room proportions and shapes.

RENDERING STYLE SETTINGS (from user prompt)
User will specify Style (interior design aesthetic), Furniture Density (Sparse/Standard/Full), Color Tone (Neutral/Warm/Bold), Angle (Top-down orthographic 90° or Perspective 3D isometric ~45°), and Notes (specific requests). Apply these while maintaining structural accuracy.

FURNITURE PLACEMENT
Identify room type by fixtures and shape then furnish appropriately. Bedroom gets bed, nightstands, dresser. Living room gets sofa, coffee table, TV area, seating. Kitchen gets visible appliances, table/island if space exists. Bathroom gets fixtures only as shown. Dining gets appropriately sized table and chairs. NEVER block doors, windows, or passages. Maintain clear walking paths. Add subtle decor per style.

VALIDATION CHECKLIST (Before finalizing)
Does door count match exactly? Is every door in the exact same position? Did I add any doors that don't exist? Did I add any walls that don't exist? Can someone walk from entrance to every room? Are all open passages still open?

ERRORS TO AVOID
Adding doors or walls that don't exist. Moving doors to different positions. Creating doors that lead nowhere or outside. Closing off open-concept spaces. Making rooms inaccessible. Misreading windows as doors or vice versa. Inventing rooms, closets, or spaces. Changing room proportions.

TERMINOLOGY
P-Tac = Air conditioning unit. WIC/WIR = Walk-in closet/wardrobe. ENS = Ensuite bathroom. Open arrows/gaps in walls = passages NOT doors.
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

  const posthog = PostHogClient();

  if (result.text) {
    process.stdout.write(`\nAssistant: ${result.text}\n`);

    posthog.capture({
      distinctId: session.user.email,
      event: "generation_error",
      properties: {
        isFree: user.subscription != null,
        aiResponse: result.text,
      },
    });

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

      posthog.capture({
        distinctId: session.user.email,
        event: "floorplan_generated",
        properties: {
          isFree: user.subscription != null,
        },
      });

      return new Response(
        Buffer.from(
          user.subscription
            ? file.uint8Array
            : await watermark(file.uint8Array),
        ),
        {
          headers: {
            "Content-Type": file.mediaType,
          },
        },
      );
    }
  }

  posthog.shutdown();
}
