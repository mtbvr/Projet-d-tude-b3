/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from '@vercel/postgres';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function GET() {
  try {
    const { rows } = await sql<User[]>`SELECT * FROM "User"`;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Aucun utilisateur trouvé' }), { status: 404 });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
  }
}
