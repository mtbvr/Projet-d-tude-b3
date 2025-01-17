import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const { rows } = await sql`SELECT * FROM "User" WHERE email = ${email}`;

        if (rows.length > 0) {
            return new Response(JSON.stringify({ exists: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ exists: false }), { status: 200 });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        return new Response(JSON.stringify({ error: 'Erreur lors de la vérification de l\'email' }), { status: 500 });
    }
}
