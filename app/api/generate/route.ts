import { generateText } from "ai";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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

  // TODO: Check user access level/credits

  const { prompt, imageUrl }: { prompt: string; imageUrl: string } =
    await req.json();

  const result = await generateText({
    model: "google/gemini-3-pro-image",
    // model: "google/gemini-2.5-flash-image", // Doesn't work well
    system: `
    You are an AI App called Homeify AI, which turns blueprints of floorplans
    into a furniture full home floor image. Create a 3d rendering image of the
    attached floorplan with furniture based on the prompt
    given by the user. ONLY return the image, do not communicate back with text.
    Give only ONE image. In the final generated image, remove any text and graphics
    from the original reference image. There are two options for the angle, either top down, meaning a birds eye view,
    from teh top, not at all from an angle, or if the property is on a prespective 3d, then do a 45 degree
    view NOT a first person in the home view, just a 3d prespective of the layout model. Remove any graphic saying Bright MLS
    to avoid copy right laws because I'm not able to use their graphic.
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
      return new Response(Buffer.from(file.uint8Array), {
        headers: {
          "Content-Type": file.mediaType,
        },
      });
    }
  }
}
