import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

    if (!name|| !description) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const result = await sql`
      INSERT INTO "Categories" (name, description)
      VALUES (${name}, ${description})
      RETURNING id;
    `;

    const categorieId = result.rows[0]?.id;
    if (!categorieId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de la categorie' }), { status: 500 });
    }


    return new NextResponse(JSON.stringify({ message: 'Categorie créée avec succès', categorieId }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la categorie:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout de la categorie' }), { status: 500 });
  }
}
