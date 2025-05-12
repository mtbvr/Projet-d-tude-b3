import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { id_service, name, description, price, categorieList, caracList, image } = await request.json();

    // Mise à jour de la table Services
    const { data: updatedServiceData, error: updateServiceError } = await supabase
      .from('Services')
      .update({ name, description, price })
      .eq('id', id_service)
      .select('id');
      
    if (updateServiceError) {
      console.error('Erreur lors de la mise à jour du service:', updateServiceError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour du service' }), { status: 500 });
    }
    
    if (!updatedServiceData || updatedServiceData.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Service non trouvé' }), { status: 404 });
    }

    // Mise à jour des catégories :
    // 1. Suppression des catégories existantes
    const { error: deleteCategoriesError } = await supabase
      .from('Categorie_Service')
      .delete()
      .eq('idservice', id_service);
      
    if (deleteCategoriesError) {
      console.error('Erreur lors de la suppression des catégories existantes:', deleteCategoriesError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression des catégories existantes' }), { status: 500 });
    }

    // 2. Insertion des nouvelles catégories
    const categoryInsertions = categorieList.map(async (categorie: string) => {
      const { error: insertCategoryError } = await supabase
        .from('Categorie_Service')
        .insert([{ idcategorie: categorie, idservice: id_service }]);
      if (insertCategoryError) {
        console.error('Erreur lors de la création de la catégorie:', insertCategoryError);
        throw new Error('Erreur lors de la création de la catégorie');
      }
    });
    await Promise.all(categoryInsertions);

    // Mise à jour des caractéristiques techniques :
    // 1. Suppression des caractéristiques existantes pour ce service
    const { error: deleteCaracError } = await supabase
      .from('Carac_technique')
      .delete()
      .eq('id_service', id_service);
      
    if (deleteCaracError) {
      console.error('Erreur lors de la suppression des caractéristiques techniques existantes:', deleteCaracError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression des caractéristiques techniques existantes' }), { status: 500 });
    }
    
    // 2. Insertion des nouvelles caractéristiques techniques
    const caracInsertions = caracList.map(async (tech: string) => {
      const { error: insertCaracError } = await supabase
        .from('Carac_technique')
        .insert([{ name: tech, id_service }]);
      if (insertCaracError) {
        console.error('Erreur lors de l\'insertion de la caractéristique technique:', insertCaracError);
        throw new Error('Erreur lors de l\'insertion de la caractéristique technique');
      }
    });
    await Promise.all(caracInsertions);

    if (image && image.trim().length > 0) {
      const base64Regex = /^data:image\/\w+;base64,/;
      let imageData = image;
      if (base64Regex.test(image)) {
        imageData = image.replace(base64Regex, '');
      }
      
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // Vérifie si event.target existe et qu'un fichier a bien été sélectionné
        if (!event.target?.files || event.target.files.length === 0) return;
      
        const file = event.target.files[0];
        // Assurez-vous que 'id_service' est défini dans votre contexte
        const fileName = `${id_service}.jpg`;
      
        const { data, error } = await supabase.storage
          .from('service-images')
          .update(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });
      
        if (error) {
          console.error("Erreur lors de l'update de l'image:", error);
        } else {
          console.log("Image mise à jour avec succès:", data);
        }
      };
      
      
    }

    return new NextResponse(JSON.stringify({ success: 'Service mis à jour avec succès', id: updatedServiceData[0].id }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du service:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour du service' }), { status: 500 });
  }
}