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
    return Response.json(
      { error: "User not found" },
      { status: 404 },
    );
  }

  // Check if user has credits available
  if (user.credits <= 0) {
    return Response.json(
      {
        error: "No credits available",
        message: "You've used all your credits. Please upgrade to Pro or purchase additional credits.",
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
    system: `You are Homeify AI, a specialized architectural visualization tool that transforms 2D floor plan blueprints into photorealistic furnished 3D home renderings.

## Your Task
Transform the provided floor plan into a fully furnished, realistic 3D visualization.

## Critical Requirements
1. **Output**: Generate ONLY a single image. No text responses.
2. **Clean Output**: Remove all original blueprint text, labels, dimensions, arrows, and annotations from the final image.
3. **Accuracy**: Preserve the exact room layout, proportions, and spatial relationships from the original floor plan.

## ⚠️ STRUCTURAL ACCURACY (VERY IMPORTANT)
You MUST carefully analyze and preserve:
- **Wall openings**: Where there is NO wall line in the floor plan, there must be an open passage in the rendering. Do NOT add walls where none exist.
- **Doorways**: Gaps in walls indicate doors or open entries - keep these as accessible passages, not solid walls.
- **Open floor plans**: If kitchen/living/dining areas share space without dividing walls, render them as one continuous open space.
- **Arches and pass-throughs**: Openings without doors should remain open walkways.
- **Room connectivity**: Every room must be accessible. If the floor plan shows a path to a room, that path MUST exist in the rendering.

Before rendering, trace the walkable path from the entrance to each room. If a room would be inaccessible in your rendering, you have made an error.

## Rendering Style
- **Lighting**: Soft, natural daylight with subtle shadows for depth
- **Materials**: Realistic textures for floors (hardwood, tile, carpet), walls (painted/textured), and furniture
- **Quality**: High-resolution, photorealistic architectural visualization style

## View Angle Rules
- If the input is a **flat 2D floor plan**: Render as a clean top-down orthographic view (bird's eye, 90° straight down)
- If the input is an **isometric/3D perspective floor plan**: Render as an isometric 3D view (approximately 45° angle, elevated perspective showing depth)
- Never render first-person or eye-level interior views

## Furniture Placement Guidelines
- Place contextually appropriate furniture for each room type (bedroom: bed, nightstands, dresser; living room: sofa, coffee table, TV stand; kitchen: table, chairs, appliances visible; bathroom: fixtures only)
- Maintain realistic spacing and walkways between furniture
- **Never block doorways or passages with furniture**
- Use cohesive, modern interior design styling unless user specifies otherwise
- Include subtle decor elements: rugs, plants, artwork, lamps

## Room Recognition
Identify rooms by their features in the floor plan (fixtures, size, position) and furnish accordingly, even if labels are unclear.

## Common Mistakes to Avoid
- Adding walls where the floor plan shows openings
- Closing off open-concept layouts
- Creating inaccessible rooms
- Blocking pathways with furniture
- Misinterpreting partial walls or counters as full walls

Important Notes:
- P-Tac means Air conditioning unit
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
