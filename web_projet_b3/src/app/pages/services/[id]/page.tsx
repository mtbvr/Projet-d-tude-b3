'use client'

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; 

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  disponible: boolean;
  categories: Array<string>;
}

const ServicePage = () => {
  const params = useParams(); 
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!params?.id) return; 
      
      try {
        const { data } = await axios.get(`/api/products/products/getById?id=${params.id}`);
        setService(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du service :", error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params?.id]); 

  if (loading) {
    return <div className="text-center text-gray-400">Chargement du service...</div>;
  }

  if (!service) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-10">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400">{service.name}</h1>
        <p className="mt-2 text-gray-300">{service.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-400 font-bold">{service.price} €</span>
          <span className={`px-3 py-1 rounded ${service.disponible ? "bg-green-500" : "bg-red-500"}`}>
            {service.disponible ? "Disponible" : "Indisponible"}
          </span>
        </div>
        <div className="mt-4 text-gray-400">Catégories : {service.categories.join(", ")}</div>
      </div>
    </div>
  );
};

export default ServicePage;