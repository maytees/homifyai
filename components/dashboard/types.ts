export interface FloorPlan {
  id: string;
  stagingStyle: string;
  furnishingDensity: string;
  colorTone: string;
  angle: string;
  additionalNotes: string | null;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: Date;
  referenceS3Key: string;
  generatedS3Key: string;
  folderId: string | null;
}

export interface FolderItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  plans: FloorPlan[];
}

export const folderColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-yellow-500",
];
