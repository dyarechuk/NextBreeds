import { getBreedById } from '@/utils/api';
import { Breed } from '@/types/breeds';
import { BreedDetails } from '@/components/BreedDetails';

export default async function BreedPage({
  params,
}: {
  params: { breedId: string };
}) {
  const { breedId } = params;
  const breedDetails: Breed | null = await getBreedById(breedId);

  if (!breedDetails) return null;

  return (
    <div className="bg-gray-300 min-h-screen">
      <BreedDetails breedDetails={breedDetails!} />
    </div>
  );
}
