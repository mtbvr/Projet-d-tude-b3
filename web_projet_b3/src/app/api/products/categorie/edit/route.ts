import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
  try {
    const { id_categorie, name, description } = await request.json();

    if (!id_categorie || !name || !description) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('Categories')
      .update({ name, description })
      .eq('id', id_categorie)
      .select('id');

    if (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de la catégorie' }), { status: 500 });
    }

    if (data.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Catégorie non trouvée' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ success: 'Catégorie mise à jour avec succès', id: data[0].id }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de la catégorie' }), { status: 500 });
  }
}
