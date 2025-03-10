import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, categorieList } = await request.json();

    if (!name || !description || !price || !categorieList) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const disponible = true;

    const { data: serviceData, error: serviceError } = await supabase
      .from('Services')
      .insert([
        { name, description, price, disponible }
      ])
      .select('id');

    if (serviceError) {
      console.error('Erreur lors de la création du service:', serviceError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création du service' }), { status: 500 });
    }

    const serviceId = serviceData[0]?.id;
    if (!serviceId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création du service' }), { status: 500 });
    }

    const categoryInsertions = categorieList.map(async (categorie: string) => {
      const { data, error } = await supabase
        .from('Categorie_Service')
        .insert([
          { idcategorie: categorie, idservice: serviceId }
        ])

      if (error) {
        console.error('Erreur lors de la création de la catégorie:', error);
        throw new Error('Erreur lors de la création de la catégorie');
      }

      return data;
    });

    try {
      await Promise.all(categoryInsertions);
    } catch (categoryError) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création des catégories' , categoryError}), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: 'Service créé avec succès', serviceId }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'ajout du service:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout du service' }), { status: 500 });
  }
}
