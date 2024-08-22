'use client';

import React, { useState } from 'react';
import { Breed } from '@/types/breeds';
import { BreedAutocomplete } from '../BreedAutocomplete';
import { BreedCard } from '../BreedCard';
import { createPortal } from 'react-dom';

interface BreedsListProps {
  cats: Breed[];
  dogs: Breed[];
}

const shuffleArray = (array: Breed[]): Breed[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const BreedsList: React.FC<BreedsListProps> = ({ cats, dogs }) => {
  const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>(
    shuffleArray([...cats, ...dogs]),
  );

  if (!filteredBreeds) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto px-10">
      {createPortal(
        <BreedAutocomplete
          cats={cats}
          dogs={dogs}
          setFilteredBreeds={(breeds) =>
            setFilteredBreeds(shuffleArray(breeds))
          }
        />,
        document.body,
      )}
      <div className="text-center text-3xl text-slate-900 mt-20 mb-6 font-semibold">
        Breeds
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 mx-auto">
        {filteredBreeds.length === 0 && (
          <div className="text-2xl mt-4">No breeds found</div>
        )}
        {filteredBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
};

export default BreedsList;
