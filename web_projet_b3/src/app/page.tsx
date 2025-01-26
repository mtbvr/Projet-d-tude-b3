/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Simuler la récupération des images 
    const fetchImages = () => {
      const imagePaths = [
        '/images/image1.jpg',
        '/images/image2.jpg',
        '/images/image3.jpg',
      ];
      setImages(imagePaths);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Carousel images={images} />
    </div>
  );
}
