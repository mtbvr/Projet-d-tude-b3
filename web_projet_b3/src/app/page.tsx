/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import axios from "axios";
import Link from 'next/link';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
];

// Pour la gestion affichage des catégories 
interface Categorie {
  id: number;
  name: string;
  description: string;
}

const addCategorie = async (name: string, description: string) => {
  try {
    const reponse = await axios.post('/api/products/categorie/add', { name, description });
    return reponse;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la nouvelle categorie:', error);
    return false;
  }
}

const Page = () => {
  const [categorie, setCategorie] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products/categorie/get');
        setCategorie(response.data);
      } catch (error) {
        console.error("Erreur lors de la recherche des catégories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <main>
      <Carousel images={images} />
      <section className="my-[20px] px-[20px]">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {categorie.map((element, index) => (
              <Link key={index} href={`/categorie/${element.id}`}>
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg rounded-2xl p-4 flex flex-col items-center justify-center w-full h-72 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                  <img src="/images/image4.png" alt={element.name} className="w-72 h-60 object-contain mb-1 mt-4 rounded-lg" />
                  <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2">{element.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
