import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, password } = await request.json();

    // Valider les champs
    if (!firstname || !lastname || !email || !password) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    // Insérer l'utilisateur avec le mot de passe hashé
    const result = await sql`
      INSERT INTO "User" (firstname, lastname, email, password)
      VALUES (${firstname}, ${lastname}, ${email}, ${password})
      RETURNING id;
    `;

    // Accéder aux résultats via la propriété `rows` de `QueryResult`
    const userId = result.rows[0]?.id;

    // Vérification si l'utilisateur a bien été inséré
    if (userId) {
      console.log('Utilisateur ajouté avec ID:', userId);
      return new Response(JSON.stringify({ message: 'Utilisateur créé avec succès', userId }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'utilisateur' }), { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'ajout de l\'utilisateur' }), { status: 500 });
  }
}
