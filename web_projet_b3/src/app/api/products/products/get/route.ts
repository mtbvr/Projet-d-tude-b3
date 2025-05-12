import { NextResponse } from 'next/server';
import supabase from '@/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  disponible: boolean;
  categories: string[];
}

interface ServiceExtended extends Service {
  caracTechniques: string[];
  imageUrl: string;
}

export async function GET() {
  try {
    // Récupérer tous les services
    const { data: servicesData, error: servicesError }: PostgrestResponse<Service> = await supabase
      .from('Services')
      .select('*');

    if (servicesError) {
      console.error('Erreur lors de la récupération des services:', servicesError);
      return new NextResponse(
        JSON.stringify({ error: 'Erreur lors de la récupération des services' }),
        { status: 500 }
      );
    }

    if (!servicesData || servicesData.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Aucun service trouvé' }),
        { status: 404 }
      );
    }

    // Pour chaque service, récupérer les informations supplémentaires
    const servicesWithExtra = await Promise.all(
      servicesData.map(async (service) => {
        // Récupérer les catégories du service
        const { data: categoriesData, error: categoriesError }: PostgrestResponse<{ idcategorie: string }> = await supabase
          .from('Categorie_Service')
          .select('idcategorie')
          .eq('idservice', service.id);

        if (categoriesError) {
          console.error('Erreur lors de la récupération des catégories:', categoriesError);
          throw new Error('Erreur lors de la récupération des catégories');
        }

        // Récupérer les caractéristiques techniques
        const { data: caracData, error: caracError } = await supabase
          .from('Carac_technique')
          .select('name')
          .eq('id_service', service.id);


        if (caracError) {
          console.error('Erreur lors de la récupération des caractéristiques techniques:', caracError);
          throw new Error('Erreur lors de la récupération des caractéristiques techniques');
        }

        const imageResponse = supabase.storage
          .from('service-images')
          .getPublicUrl(`${service.id}.jpg`);
        const imageUrl = imageResponse.data.publicUrl;

        // Retourner l'objet service étendu
        return {
          ...service,
          categories: categoriesData ? categoriesData.map(categorie => categorie.idcategorie) : [],
          caracTechniques: caracData ? caracData.map(item => item.name) : [],
          imageUrl: imageUrl || '',
        } as ServiceExtended;
      })
    );

    return new NextResponse(JSON.stringify(servicesWithExtra), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erreur lors de la récupération des services' }),
      { status: 500 }
    );
  }
}