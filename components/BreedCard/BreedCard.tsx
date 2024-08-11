'use client';

import { Breed } from '@/types/breeds';
import Image from 'next/image';
import React from 'react';
import noImage from '@/public/images/no-image.jpg';
import Link from 'next/link';

interface BreedCardProps {
  breed: Breed;
}

export const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const displayImage = breed.image?.url || noImage;

  return (
    <Link
      href={`/${breed.id}`}
      className="border-2 mb-6 border-gray-500 rounded-2xl max-w-[400px] shadow-lg flex flex-col gap-4 pb-10 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
    >
      <Image
        src={displayImage}
        width={210}
        height={120}
        alt={breed.name}
        className={`object-cover w-full h-full max-h-[220px] rounded-t-2xl ${
          !breed.image?.url ? 'object-center' : 'object-top'
        }`}
      />
      <div className="text-center text-lg sm:text-2xl font-bold">
        {breed.name}
      </div>
    </Link>
  );
};

export default BreedCard;
