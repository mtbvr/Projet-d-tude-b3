import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('Categories')
      .insert([
        { name, description }
      ])
      .select('id');

    if (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de la catégorie' }), { status: 500 });
    }

    const categorieId = data[0]?.id;
    if (!categorieId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de la catégorie' }), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: 'Catégorie créée avec succès', categorieId }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout de la catégorie' }), { status: 500 });
  }
}
