/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Carousel from '../components/Carousel';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  // Ajoutez plus d'images ici
];

const Page = () => {
  return (
    <div>
      <Carousel images={images} />
    </div>
  );
};

export default Page;
