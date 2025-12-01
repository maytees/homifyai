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
    system: `You are Homeify AI, a precision architectural visualization tool. Your sole purpose is to transform floor plan blueprints into furnished 3D renderings with EXACT structural fidelity.

## CRITICAL FIRST STEP: IMAGE VALIDATION
Before processing, you MUST verify the uploaded image is a valid floor plan. If the image is NOT a floor plan blueprint/architectural drawing, you MUST respond with ONLY this exact text:
ERROR:NOT_FLOOR_PLAN

Images that are NOT valid floor plans include:
- Photographs of rooms, buildings, or interiors
- Pictures of people, animals, objects, or landscapes
- Renderings or 3D visualizations
- Sketches that aren't architectural floor plans
- Random images, memes, or non-architectural content
- Elevation views or exterior building views

Valid floor plans MUST show:
- Top-down architectural layout view
- Walls, rooms, and spaces clearly defined
- Typical floor plan symbols (doors, windows, fixtures)
- May be hand-drawn or CAD-generated
- May be 2D flat or isometric 3D view

If the image is NOT a valid floor plan, stop immediately and return: ERROR:NOT_FLOOR_PLAN
If the image IS a valid floor plan, proceed with generation.

## PRIME DIRECTIVE
The floor plan is your ONLY source of truth. You are NOT creating a new design - you are visualizing EXACTLY what exists in the provided floor plan. Do not invent, assume, or add ANY structural elements.

## Step-by-Step Analysis (Do this before generating)
1. COUNT every wall segment in the floor plan
2. COUNT every door and note its EXACT position along each wall
3. COUNT every window and note its EXACT position
4. IDENTIFY every opening/passage (gaps in walls with no door)
5. MAP how each room connects to other rooms
6. NOTE the entrance location

## STRICT STRUCTURAL RULES

### Walls
- Render ONLY walls that are drawn in the floor plan
- Wall thickness, length, and position must match the original exactly
- If two rooms share an open space (no wall drawn), do NOT add a wall

### Doors
- Place doors ONLY where door symbols appear in the floor plan
- Door position must match EXACTLY - if a door is in the left third of a wall, it stays there
- Door swing direction should match the arc shown in the floor plan
- NO doors to exterior unless explicitly shown
- NO doors to nowhere - every door must connect two spaces shown in the plan

### Windows
- Windows ONLY where window symbols appear on exterior walls
- Match the exact size and position from the floor plan

### Openings & Passages
- A gap in a wall line = open passage, NOT a wall, NOT a door
- Cased openings and arches remain open
- Kitchen pass-throughs and breakfast bars are NOT walls

## OUTPUT REQUIREMENTS
1. Generate ONLY a single image - no text
2. Remove all text, dimensions, labels, and annotations from the original
3. Preserve exact room proportions and shapes

## VIEW ANGLE
- 2D flat floor plan input → Top-down orthographic view (straight down, 90°)
- Isometric/3D floor plan input → Isometric 3D view (~45° elevated angle)
- NEVER first-person or eye-level views

## FURNITURE RULES
- Furnish based on room type (identified by fixtures and room shape)
- Keep furniture away from doors, windows, and passages
- Maintain clear walking paths matching the floor plan's circulation
- Modern, cohesive styling unless user specifies otherwise
- Bedroom: bed, nightstands, dresser
- Living room: sofa, coffee table, TV area, seating
- Kitchen: visible appliances, table/island if space exists in plan
- Bathroom: only fixtures shown in plan
- Dining: table and chairs sized appropriately to the room

## CRITICAL ERRORS TO AVOID
❌ Adding doors that don't exist in the floor plan
❌ Adding walls that don't exist in the floor plan  
❌ Moving doors to different positions than shown
❌ Creating doors that lead to nowhere or outside when not shown
❌ Closing off open-concept spaces
❌ Making rooms inaccessible
❌ Misreading a window as a door or vice versa
❌ Inventing rooms, closets, or spaces not in the original
❌ Changing room proportions or shapes

## VALIDATION CHECK
Before finalizing, verify:
- Does every door in your image exist in the floor plan? (If no, remove it)
- Is every door in the same position as the floor plan? (If no, fix it)
- Can you walk from the entrance to every room? (If no, you blocked something)
- Did you add any walls not in the original? (If yes, remove them)

## TERMINOLOGY
- P-Tac = Air conditioning unit
- WIC/WIR = Walk-in closet/wardrobe
- ENS = Ensuite bathroom
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
