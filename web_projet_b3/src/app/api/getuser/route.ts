/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/getuser/route.ts
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Exécuter la requête pour récupérer tous les utilisateurs
    const { rows } = await sql`SELECT * FROM "User"`;
    
    // Retourner les utilisateurs en tant que JSON
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    // En cas d'erreur, retourner une réponse d'erreur
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
  }
}
