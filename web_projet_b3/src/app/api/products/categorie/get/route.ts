/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from '@vercel/postgres';

interface Categorie {
  id: number;
  name: string;
  description: string;

}

export async function GET() {
  try {
    const { rows } = await sql<Categorie[]>`SELECT * FROM "Categories"`;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Aucune catégorie trouvée' }), { status: 404 });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des catégories' }), { status: 500 });
  }
}