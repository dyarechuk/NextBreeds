import { BreedsList } from '@/components/BreedsList';
import { fetchCats, fetchDogs } from '@/utils/api';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/BreedsList/BreedsList'),
  { ssr: false }
)

export default async function Home() {
  const cats = await fetchCats();
  const dogs = await fetchDogs();

  return (
    <main className="min-h-screen bg-gray-300">
      <div className="container py-10">
        <div className="flex flex-col gap-6">
          <DynamicComponentWithNoSSR cats={cats} dogs={dogs} />
        </div>
      </div>
    </main>
  );
}
