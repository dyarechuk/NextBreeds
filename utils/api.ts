import { Breed } from '@/types/breeds';

const catApiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;
const dogApiKey = process.env.NEXT_PUBLIC_DOG_API_KEY;

export const fetchCats = async (): Promise<Breed[]> => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${catApiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to cat breeds: ${response.status}`);
  }

  const data = await response.json();

  const modifiedData = data.map((breed: Breed) => ({
    ...breed,
    animalType: 'cat',
  }));

  return modifiedData;
};

export const getBreedById = async (id: string): Promise<Breed> => {
  const catBreedUrl = `https://api.thecatapi.com/v1/breeds/${id}?api_key=${catApiKey}`;
  const catImagesUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}&api_key=${catApiKey}`;

  const dogBreedUrl = `https://api.thedogapi.com/v1/breeds/${id}?api_key=${dogApiKey}`;
  const dogImagesUrl = `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${id}&api_key=${dogApiKey}`;

  try {
    let breedResponse = await fetch(catBreedUrl);
    if (!breedResponse.ok) {
      throw new Error(`Cat API failed with status: ${breedResponse.status}`);
    }

    let breedData = await breedResponse.json();
    let imagesResponse = await fetch(catImagesUrl);

    if (!imagesResponse.ok) {
      throw new Error(
        `Failed to fetch images from Cat API: ${imagesResponse.status}`,
      );
    }

    let imagesData = await imagesResponse.json();
    let images = imagesData.map((image: { url: string }) => image.url);

    return { ...breedData, images };
  } catch (error) {
    console.error('Cat API request failed, attempting Dog API...', error);

    let breedResponse = await fetch(dogBreedUrl);
    if (!breedResponse.ok) {
      throw new Error(`Dog API failed with status: ${breedResponse.status}`);
    }

    let breedData = await breedResponse.json();
    let imagesResponse = await fetch(dogImagesUrl);

    if (!imagesResponse.ok) {
      throw new Error(
        `Failed to fetch images from Dog API: ${imagesResponse.status}`,
      );
    }

    let imagesData = await imagesResponse.json();
    let images = imagesData.map((image: { url: string }) => image.url);

    return { ...breedData, images };
  }
};

export const fetchDogs = async (): Promise<Breed[]> => {
  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${dogApiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to cat breeds: ${response.status}`);
  }

  const data = await response.json();

  const modifiedData = data.map((breed: Breed) => ({
    ...breed,
    animalType: 'dog',
  }));

  return modifiedData;
};
