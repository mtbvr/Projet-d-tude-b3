import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    await sql`DELETE FROM "Categorie_Service" WHERE idcategorie = ${id}`;

    await sql`DELETE FROM "Categories" WHERE id = ${id}`;

    return new Response(JSON.stringify({ message: 'Catégorie et services associés supprimés avec succès' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression de la catégorie' }), { status: 500 });
  }
}
