import { z } from "zod";

// Floor plan schema based on Prisma Floorplan model
export const floorplanSchema = z.object({
  stagingStyle: z
    .string()
    .min(1, "Staging style is required")
    .describe("The interior design style for staging"),
  furnishingDensity: z
    .string()
    .min(1, "Furnishing density is required")
    .describe("How densely furnished the space should be"),
  colorTone: z
    .string()
    .min(1, "Color tone is required")
    .describe("The color palette/tone for the design"),
  angle: z
    .string()
    .min(1, "Angle is required")
    .describe("The viewing angle for the floor plan"),
  additionalNotes: z
    .string()
    .optional()
    .describe("Any additional notes or requirements"),
  isFavorite: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  folderId: z.string().nullable().optional(),
});

// Schema for creating a new floor plan (includes file reference)
export const createFloorplanSchema = floorplanSchema.extend({
  referenceImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Reference image is required")
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Image must be less than 10MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported",
    ),
});

// Schema for updating an existing floor plan
export const updateFloorplanSchema = floorplanSchema
  .partial()
  .extend({
    id: z.string().cuid(),
  })
  .refine((data) => Object.keys(data).length > 1, {
    message: "At least one field must be provided for update",
  });

// Schema for toggling favorite status
export const toggleFavoriteSchema = z.object({
  id: z.string().cuid(),
  isFavorite: z.boolean(),
});

// Schema for moving floor plan to folder
export const moveToFolderSchema = z.object({
  id: z.string().cuid(),
  folderId: z.string().cuid().nullable(),
});

// Schema for deleting a floor plan
export const deleteFloorplanSchema = z.object({
  id: z.string().cuid(),
});

// Folder schema
export const folderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name must be less than 50 characters"),
});

// Schema for creating a new folder
export const createFolderSchema = folderSchema;

// Schema for updating a folder
export const updateFolderSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name must be less than 50 characters"),
});

// Schema for deleting a folder
export const deleteFolderSchema = z.object({
  id: z.string().cuid(),
});

// Type exports
export type FloorplanSchemaType = z.infer<typeof floorplanSchema>;
export type CreateFloorplanSchemaType = z.infer<typeof createFloorplanSchema>;
export type UpdateFloorplanSchemaType = z.infer<typeof updateFloorplanSchema>;
export type ToggleFavoriteSchemaType = z.infer<typeof toggleFavoriteSchema>;
export type MoveToFolderSchemaType = z.infer<typeof moveToFolderSchema>;
export type DeleteFloorplanSchemaType = z.infer<typeof deleteFloorplanSchema>;
export type FolderSchemaType = z.infer<typeof folderSchema>;
export type CreateFolderSchemaType = z.infer<typeof createFolderSchema>;
export type UpdateFolderSchemaType = z.infer<typeof updateFolderSchema>;
export type DeleteFolderSchemaType = z.infer<typeof deleteFolderSchema>;
