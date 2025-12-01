export interface InteriorStyle {
  id: string;
  title: string;
  category: "free" | "pro";
  description: string;
  promptDescription: string;
  hasImage: boolean; // Toggle this to true when you add images
}

export const SHOW_STYLE_IMAGES = false; // Change to true when you have images

export const interiorStyles: InteriorStyle[] = [
  // FREE TIER STYLES (Original 6)
  {
    id: "modern-minimalist",
    title: "Modern Minimalist",
    category: "free",
    description:
      "Clean lines, simple finishes, and the principle that less is more. Functional furniture with smart storage solutions.",
    promptDescription:
      "Modern minimalist style with uncomplicated forms, clean lines, simple finishes, neutral color scheme, functional furniture, and emphasis on negative space. Less is more philosophy with texture as a key element.",
    hasImage: false,
  },
  {
    id: "cozy-scandinavian",
    title: "Cozy Scandinavian",
    category: "free",
    description:
      "Simple, light, airy, and organic with hygge vibes. Pale walls, sleek layouts, and cozy textiles in abundance.",
    promptDescription:
      "Scandinavian design style with simple, light, airy, and organic elements. Features pale walls, sleek layouts, large mirrors, cozy textiles, ashy-colored woods, clean lines, minimalist forms, and hygge atmosphere. Emphasizes natural light and open spaces.",
    hasImage: false,
  },
  {
    id: "luxury-contemporary",
    title: "Luxury Contemporary",
    category: "free",
    description:
      "Sleek and sophisticated with current trends. Open concepts, streamlined furniture, and organic materials.",
    promptDescription:
      "Contemporary luxury design that is sleek and simple. Features exposed legs furniture, clean lines, metal and glass for light reflection, organic materials, neutral color palettes, curvy forms, textured fabrics, and quiet luxury aesthetic.",
    hasImage: false,
  },
  {
    id: "rustic-farmhouse",
    title: "Rustic Farmhouse",
    category: "free",
    description:
      "Roughly finished natural materials with farmhouse charm. Wood abundance softened by cozy textiles.",
    promptDescription:
      "Rustic farmhouse style with roughly finished natural materials, abundant wood, cowhides and sheepskin, farmhouse charm, subtle fabric patterns, rich texture, and a cozy, nature-focused atmosphere.",
    hasImage: false,
  },
  {
    id: "sleek-industrial",
    title: "Sleek Industrial",
    category: "free",
    description:
      "Exposed pipes and beams, brick and concrete. Raw, unfinished materials with masculine tendencies.",
    promptDescription:
      "Industrial interior design with exposed pipes and beams, brick and concrete, strong masculine character, rustic or modern minimalist furniture, raw or unfinished materials, oversized artwork, and cozy textiles for balance.",
    hasImage: false,
  },
  {
    id: "vibrant-family",
    title: "Vibrant Family Home",
    category: "free",
    description:
      "Comfortable, lived-in feel with durable materials. Warm, inviting spaces perfect for daily family life.",
    promptDescription:
      "Vibrant family home style that is comfortable, lived-in, warm and inviting. Features durable materials, practical furniture arrangements, and spaces designed for daily family activities.",
    hasImage: false,
  },

  // PRO TIER STYLES (Extended collection)
  {
    id: "transitional",
    title: "Transitional",
    category: "pro",
    description:
      "Perfect blend of traditional elegance and contemporary lines. Calmer patterns, cleaner layouts, and flexible design.",
    promptDescription:
      "Transitional interior design blending traditional elegance with contemporary clean lines, calmer patterns, cleaner layouts, minimal accessories, mix of masculine and feminine elements, modern curved furniture with ornate details, and flexible combinations of materials like rattan and lacquer.",
    hasImage: false,
  },
  {
    id: "traditional",
    title: "Traditional",
    category: "pro",
    description:
      "18th and 19th-century European elegance. Rich colors, classic shapes, symmetry, and ornate details.",
    promptDescription:
      "Traditional interior design with 18th and 19th-century European inspiration, symmetrical layouts, rich color palettes, classic shapes, crown molding, wainscoting, antique furniture, abundant textiles in silk/velvet/damask with florals/stripes/plaids, dark lacquered woods with intricate carvings, chandeliers, sconces, and elegant atmosphere.",
    hasImage: false,
  },
  {
    id: "modern",
    title: "Modern",
    category: "pro",
    description:
      "Mid-20th century design with Scandinavian and mid-century influences. Clean lines, metal, chrome, and glass.",
    promptDescription:
      "Modern interior design from early to mid-20th century with mix of Scandinavian and mid-century modern elements. Features clean lines, smooth sleek surfaces, metal/chrome/glass materials, minimal décor, bold colorful accents in neutral spaces, and emphasis on art over knick-knacks.",
    hasImage: false,
  },
  {
    id: "eclectic",
    title: "Eclectic",
    category: "pro",
    description:
      "Curated mix of styles that shouldn't work but do. Every object tells a story and has purpose.",
    promptDescription:
      "Eclectic interior design with deliberately curated contradictions. Features baroque with concrete, indigo batik with leather, Turkish kilims under Danish chairs, neutral base palette with worldly accents, florals mixed with geometrics using color codes, and nothing matches but everything relates.",
    hasImage: false,
  },
  {
    id: "mid-century-modern",
    title: "Mid-Century Modern",
    category: "pro",
    description:
      "1950s-60s classic with iconic furniture. Seamless indoor-outdoor flow with rich woods and retro accents.",
    promptDescription:
      "Mid-century modern design from 1950s-60s with iconic furniture pieces, seamless indoor-outdoor flow, sliding doors, picture windows, rich luxurious woods (teak/rosewood/walnut), accents of mustard yellow/chartreuse/avocado, and balance between form and function with timeless elegance.",
    hasImage: false,
  },
  {
    id: "bohemian",
    title: "Bohemian",
    category: "pro",
    description:
      "Free-spirited and eclectic. Mix of cultures, bold patterns, and nomadic vibes with natural emphasis.",
    promptDescription:
      "Bohemian design with free-spirited aesthetic, mix of different cultures and artistic expressions, bold patterns and bright colors, strong emphasis on nature, nomadic feel, trinkets from travels, animal hides, metallic accents, rich wood, and unconventional use of objects like hanging rugs as art.",
    hasImage: false,
  },
  {
    id: "modern-farmhouse",
    title: "Modern Farmhouse",
    category: "pro",
    description:
      "Clean farmhouse aesthetic. Shiplap, barn doors, wide plank floors, and connection to nature.",
    promptDescription:
      "Modern farmhouse interior design with shiplap, barn doors, wide plank floors, open concept living, sleek lighting, mixed metals (gold/black/nickel), raw wood, greenery, neutral color palettes, and strong indoors-outdoors connection.",
    hasImage: false,
  },
  {
    id: "shabby-chic",
    title: "Shabby Chic",
    category: "pro",
    description:
      "Vintage-loving style with soft, feminine feel. Distressed furniture, gentle colors, and floral patterns.",
    promptDescription:
      "Shabby chic interior design with vintage furniture showing heritage and family memories, white or distressed painted furniture, soft feminine feel, gentle color palettes, floral patterns, whitewashed floors and walls, imperfections as features not damage, and materials that show natural aging.",
    hasImage: false,
  },
  {
    id: "coastal",
    title: "Coastal",
    category: "pro",
    description:
      "Beach-inspired brightness. Sand neutrals, surf blues, breezy feel with natural materials.",
    promptDescription:
      "Coastal interior design inspired by natural beach environment with neutrals/whites/beige base mimicking sand, pops of blues resembling surf and sea, bright and breezy feel, genuine indoors-outdoors connection, minimal window treatments, blue glass vases, striped patterns, abstract ocean art, comfortable lived-in furniture, wicker/jute materials, and indoor plants.",
    hasImage: false,
  },
  {
    id: "hollywood-glam",
    title: "Hollywood Glam",
    category: "pro",
    description:
      "1930s golden age glamour. Art deco meets mid-century, high contrast, and over-the-top luxury.",
    promptDescription:
      "Hollywood glam interior design from 1930s golden age with mix of art deco and mid-century modern, high contrasts (hot pink/green or black/white), over-the-top chandeliers, high-gloss or mirrored furniture, sexy and sophisticated atmosphere, and built in layers with bold elements controlling the mood.",
    hasImage: false,
  },
  {
    id: "southwestern",
    title: "Southwestern",
    category: "pro",
    description:
      "Desert-inspired with adobe influences. Terracotta, rust, cactus green, and rich textures.",
    promptDescription:
      "Southwestern interior design inspired by American desert with soft lines of adobe houses, Spanish textiles, ironwork, nature inspiration, desert colors (rust/terracotta/cactus green), heavy furniture with thick legs and bulky finishes, abundant texture, leather and suede upholstery, and landscape-pulled palette.",
    hasImage: false,
  },
  {
    id: "rustic",
    title: "Rustic",
    category: "pro",
    description:
      "Nature-focused simplicity. Roughly finished materials, industrial touches, and cabin charm.",
    promptDescription:
      "Rustic interior design with roughly finished natural materials, industrial touches, farmhouse/cabin charm, abundance of wood, cowhides and sheepskin, textures without loud patterns, central statement fireplace, unfinished surfaces showing rough stone and weathered wood, and cozy atmosphere.",
    hasImage: false,
  },
  {
    id: "french-country",
    title: "French Country",
    category: "pro",
    description:
      "Romantic countryside elegance. Natural materials, soft colors, and timeless antique pieces.",
    promptDescription:
      "French country interior design with sophisticated blend of shabby chic/farmhouse/traditional, timeless antique furniture, tufted upholstery over weathered wood, natural materials (stone/wood/wrought iron), exposed beams, distressed finishes, raw textures, soft muted colors (beige/cream/sage green/lavender), feminine with neutral blend, and nostalgic serene atmosphere.",
    hasImage: false,
  },
  {
    id: "mediterranean",
    title: "Mediterranean",
    category: "pro",
    description:
      "Spanish, Greek, Italian influences. Arches, columns, vibrant earth tones, and decorative tiles.",
    promptDescription:
      "Mediterranean interior design inspired by Spain/Greece/Italy with arches, columns, interior balconies, rich wood tones, ornate features, vibrant earthy hues (terracotta/ochre/deep blues/sandy neutrals), decorative tiles and mosaics, ceramic or terracotta patterns on floors/walls/staircases, wrought iron elements, and connection to natural surroundings.",
    hasImage: false,
  },
  {
    id: "art-deco",
    title: "Art Deco",
    category: "pro",
    description:
      "1910s-1940s glamour. Sharp geometry, glossy metals, exotic materials, and bold opulence.",
    promptDescription:
      "Art Deco interior design from 1910s-1940s with industrial revolution inspiration, glossy metal, oversized furniture, sharp geometry with pointed edges and jagged corners, mirrored surfaces, glass accents, exotic luxurious elements, silk/velvet/lacquered rare woods/animal hides, opulent sense, and precise edges with gloss and polish.",
    hasImage: false,
  },
  {
    id: "asian-zen",
    title: "Asian Zen",
    category: "pro",
    description:
      "Feng shui principles with ultimate relaxation. Sleek lines, natural references, and serene atmosphere.",
    promptDescription:
      "Asian Zen interior design with feng shui philosophy, sleek lines, interesting shapes, notably relaxing atmosphere, essential nature references, asymmetrical layouts preferring curves to squares, shoji screens or door panels, color palette from nature, low furniture with horizontal movement, bamboo/stone/water integration, clean uninterrupted floors, and emptiness as important as tangible elements.",
    hasImage: false,
  },
];

// Helper functions
export const getFreeStyles = () =>
  interiorStyles.filter((style) => style.category === "free");

export const getProStyles = () =>
  interiorStyles.filter((style) => style.category === "pro");

export const getStyleById = (id: string) =>
  interiorStyles.find((style) => style.id === id);

export const getStylePromptDescription = (id: string) => {
  const style = getStyleById(id);
  return style?.promptDescription || "";
};
