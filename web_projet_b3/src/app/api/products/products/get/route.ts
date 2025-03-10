import {  NextResponse } from 'next/server';
import supabase from '@/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    disponible: boolean;
    categories: Array<string>;
}

export async function GET() { 
  try {
    const { data: servicesData, error: servicesError }: PostgrestResponse<Service> = await supabase
      .from('Services')
      .select('*');

    if (servicesError) {
      console.error('Erreur lors de la récupération des services:', servicesError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des services' }), { status: 500 });
    }

    if (!servicesData || servicesData.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'Aucun service trouvé' }), { status: 404 });
    }

    const servicesWithCategories = await Promise.all(
      servicesData.map(async (service) => {
        const { data: categoriesData, error: categoriesError }: PostgrestResponse<{ idcategorie: string }> = await supabase
          .from('Categorie_Service')
          .select('idcategorie')
          .eq('idservice', service.id);

        if (categoriesError) {
          console.error('Erreur lors de la récupération des catégories:', categoriesError);
          throw new Error('Erreur lors de la récupération des catégories');
        }

        return {
          ...service,
          categories: categoriesData ? categoriesData.map(categorie => categorie.idcategorie) : []
        };
      })
    );

    return new NextResponse(JSON.stringify(servicesWithCategories), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des services' }), { status: 500 });
  }
}
