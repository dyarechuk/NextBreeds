'use client';

import { Breed } from '@/types/breeds';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoHome } from '../GoHome';
import Carousel from '../Carousel/Carousel';

interface BreedDetailsProps {
  breedDetails: Breed;
}

export const BreedDetails: React.FC<BreedDetailsProps> = ({ breedDetails }) => {
  const temperaments = breedDetails.temperament.split(', ');
  const bredFors = breedDetails.bred_for?.split(', ');
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement>(
    document.body,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!breedDetails.images) {
    return null;
  }

  return (
    <div className="flex flex-col container lg:py-20 text-xl">
      {createPortal(<GoHome />, portalContainer)}
      <div className="text-black text-[44px] font-bold text-center">
        {breedDetails.name}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 mt-10">
        <Carousel images={breedDetails.images} />
        <div className="flex flex-1 flex-col gap-2 text-black px-10 lg:px-0">
          <div className="flex flex-col lg:flex-row lg:gap-4 lg:items-center">
            <span className="font-bold">Temperament: </span>
            <div className="flex flex-wrap gap-2 mt-2 lg:mt-0 whitespace-nowrap">
              {temperaments.map((temperament) => (
                <div
                  key={temperament}
                  className="bg-gray-500 rounded-lg px-3 py-1 text-lg text-white font-semibold"
                >
                  {temperament}
                </div>
              ))}
            </div>
          </div>
          {breedDetails.bred_for && (
            <div>
              <span className="font-bold">Bred for: </span>
              {breedDetails.bred_for}{' '}
            </div>
          )}
          {breedDetails.breed_group && (
            <div>
              <span className="font-bold">Breed group: </span>{' '}
              {breedDetails.breed_group}
            </div>
          )}
          {breedDetails.origin && (
            <div>
              <span className="font-bold">Origin: </span> {breedDetails.origin}
            </div>
          )}
          {breedDetails.description && (
            <div className="text-justify">
              <span className="font-bold">Description: </span>
              {breedDetails.description}
            </div>
          )}
          {breedDetails.hasOwnProperty('indoor') && (
            <div className="flex flex-col gap-1">
              <div className="font-bold">Additional info:</div>
              <div>
                <div>Indoor: {breedDetails.indoor}</div>
                <div>Adaptability: {breedDetails.adaptability}</div>
                <div>Affection: {breedDetails.affection_level}</div>
                <div>Child friendly: {breedDetails.child_friendly}</div>
                <div>Energy: {breedDetails.energy_level}</div>
                <div>Grooming: {breedDetails.grooming}</div>
                <div>Intelligence: {breedDetails.intelligence}</div>
                <div>Vocalisation: {breedDetails.vocalisation}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;
