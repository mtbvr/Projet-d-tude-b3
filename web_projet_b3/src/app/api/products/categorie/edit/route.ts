import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const { id_categorie, name, description } = await request.json();

    if (!id_categorie || !name || !description) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const result = await sql`
      UPDATE "Categories"
      SET name = ${name}, description = ${description}
      WHERE id = ${id_categorie}
      RETURNING id;
    `;

    if (result.rowCount === 0) {
      return new NextResponse(JSON.stringify({ error: 'Catégorie non trouvée' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ success: 'Catégorie mise à jour avec succès', id: result.rows[0].id }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de la catégorie' }), { status: 500 });
  }
}
