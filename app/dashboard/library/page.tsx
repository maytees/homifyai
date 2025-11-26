import { SavedFloorPlans } from "@/components/dashboard/saved-floorplans";
import { getFloorplansData } from "@/data/get-floorplans";

const LibraryPage = async () => {
  const data = await getFloorplansData();

  return <SavedFloorPlans data={data} />;
};

export default LibraryPage;
