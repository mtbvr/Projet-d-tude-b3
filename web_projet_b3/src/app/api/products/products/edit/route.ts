import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { id_service, name, description, price, categorieList } = await request.json();

    // if (!id_service || !name || !description || !price || !categorieList) {
    //   return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    // }

    const { data: updatedServiceData, error: updateServiceError } = await supabase
      .from('Services')
      .update({ name, description, price })
      .eq('id', id_service)
      .select('id');

    if (updateServiceError) {
      console.error('Erreur lors de la mise à jour du service:', updateServiceError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour du service' }), { status: 500 });
    }

    if (updatedServiceData.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Service non trouvé' }), { status: 404 });
    }

    const { error: deleteCategoriesError } = await supabase
      .from('Categorie_Service')
      .delete()
      .eq('idservice', id_service);

    if (deleteCategoriesError) {
      console.error('Erreur lors de la suppression des catégories existantes:', deleteCategoriesError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression des catégories existantes' }), { status: 500 });
    }

    const categoryInsertions = categorieList.map(async (categorie: string) => {
      const { error: insertCategoryError } = await supabase
        .from('Categorie_Service')
        .insert([
          { idcategorie: categorie, idservice: id_service }
        ]);

      if (insertCategoryError) {
        console.error('Erreur lors de la création de la catégorie:', insertCategoryError);
        throw new Error('Erreur lors de la création de la catégorie');
      }
    });

    await Promise.all(categoryInsertions);

    return new NextResponse(JSON.stringify({ success: 'Service mis à jour avec succès', id: updatedServiceData[0].id }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du service:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour du service' }), { status: 500 });
  }
}
