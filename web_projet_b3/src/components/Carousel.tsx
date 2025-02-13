'use client';

import { useState, useEffect } from 'react';


interface CarouselProps {
  images: string[];
}

// Déclaration du composant Carousel
const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // interval de 3sec du carrousel 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Permet que les images passent correctement
  const getVisibleImages = () => {
    const lastIndex = images.length - 1;
    if (currentIndex === 0) return [images[lastIndex], images[0], images[1]];
    if (currentIndex === lastIndex) return [images[lastIndex - 1], images[lastIndex], images[0]];
    return [images[currentIndex - 1], images[currentIndex], images[currentIndex + 1]];
  };

  
  return (
    <div className="relative w-4/5 max-w-lg overflow-hidden rounded-lg shadow-lg mx-auto my-5">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${100}%)` }}
      >
        {getVisibleImages().map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-64 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
