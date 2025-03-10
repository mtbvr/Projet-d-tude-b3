import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const { error: errorCategorieService } = await supabase
      .from('Categorie_Service')
      .delete()
      .eq('idservice', id);

    if (errorCategorieService) {
      console.error('Erreur lors de la suppression des services associés:', errorCategorieService);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression des services associés' }), { status: 500 });
    }

    const { error: errorServices } = await supabase
      .from('Services')
      .delete()
      .eq('id', id);

    if (errorServices) {
      console.error('Erreur lors de la suppression du service:', errorServices);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression du service' }), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: 'Catégorie et services associés supprimés avec succès' }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la suppression du service' }), { status: 500 });
  }
}
