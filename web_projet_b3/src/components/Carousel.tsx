'use client';
import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-4/5 max-w-lg overflow-hidden rounded-lg shadow-lg mx-auto mb-5 mt-5">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div className="min-w-full box-border" key={index}>
            <img src={src} alt={`Image ${index + 1}`} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;