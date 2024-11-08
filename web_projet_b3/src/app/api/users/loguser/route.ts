import { sql } from '@vercel/postgres';
import { compare } from 'bcrypt-ts';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const { rows }= await sql`SELECT * FROM "User" WHERE email= ${email}`;

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
        }
        const existingUser = rows[0];
        const validPassword = await compare(password, existingUser.password);

        if (!validPassword) {
            return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401 });
        } else {
            return new Response(JSON.stringify({ message: 'Utilisateur connecté avec succès'}), { status: 200 });
        }

    } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la connexion de l\'utilisateur' }), { status: 500 });
  }
}