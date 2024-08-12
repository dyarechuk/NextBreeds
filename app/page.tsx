import { BreedsList } from '@/components/BreedsList';
import { fetchCats, fetchDogs } from '@/utils/api';

export default async function HomePage() {
  const cats = await fetchCats();
  const dogs = await fetchDogs();

  return (
    <main className="min-h-screen bg-gray-300">
      <div className="container py-10">
        <div className="flex flex-col gap-6">
          <BreedsList cats={cats} dogs={dogs} />
        </div>
      </div>
    </main>
  );
};

