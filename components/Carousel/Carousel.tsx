import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [emblaApi, currentIndex]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [emblaApi, currentIndex, images.length]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden max-w-[400px] mx-auto flex items-center justify-center"
      ref={emblaRef}
    >
      <div className="flex rounded-2xl">
        {images.map((image, index) => (
          <div className="flex-[0_0_100%] min-w-0 rounded-2xl" key={index}>
            <Image
              src={image}
              alt={index.toString()}
              width={500}
              height={500}
              className="object-cover object-top h-full max-h-[220px] rounded-2xl"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            className={`absolute top-1/2 transform -translate-y-1/2 left-2 bg-black bg-opacity-50 text-white p-2 cursor-pointer z-10 rounded-xl ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={scrollPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft />
          </button>
          <button
            className={`absolute top-1/2 transform -translate-y-1/2 right-2 bg-black bg-opacity-50 text-white p-2 cursor-pointer z-10 rounded-xl ${
              currentIndex === images.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={scrollNext}
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
