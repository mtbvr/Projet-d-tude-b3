/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/getuser/route.ts
import { sql } from '@vercel/postgres';

// Définir un type pour un utilisateur
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function GET() {
  try {
    // Exécuter la requête pour récupérer tous les utilisateurs
    const { rows } = await sql<User[]>`SELECT * FROM "User"`;

    // Si aucun utilisateur n'est trouvé, renvoyer un message d'erreur
    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Aucun utilisateur trouvé' }), { status: 404 });
    }

    // Retourner les utilisateurs en tant que JSON
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error); // Pour un log plus détaillé
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
  }
}
