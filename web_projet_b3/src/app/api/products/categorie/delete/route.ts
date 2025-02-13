import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const { error: errorCategorieService } = await supabase
      .from('Categorie_Service')
      .delete()
      .eq('idcategorie', id);

    if (errorCategorieService) {
      console.error('Erreur lors de la suppression des services associés:', errorCategorieService);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression des services associés' }), { status: 500 });
    }

    const { error: errorCategories } = await supabase
      .from('Categories')
      .delete()
      .eq('id', id);

    if (errorCategories) {
      console.error('Erreur lors de la suppression de la catégorie:', errorCategories);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression de la catégorie' }), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: 'Catégorie et services associés supprimés avec succès' }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression de la catégorie' }), { status: 500 });
  }
}
