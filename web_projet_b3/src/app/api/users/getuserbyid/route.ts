import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        
        const userResult = await sql`SELECT * FROM "User" WHERE id = ${id}`;
        if (userResult.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
        }
        const existingUser = userResult.rows[0];

        const addressResult = await sql`SELECT * FROM "Adresse" WHERE id_user = ${id}`;
        const paymentResult = await sql`SELECT * FROM "Moyens_paiement" WHERE id_user = ${id}`

        const responseData = {
            user: existingUser,
            addresses: addressResult.rows,
            payment: paymentResult.rows,
        };

        return new Response(JSON.stringify(responseData), { status: 200 });

    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur et des adresses:', error);
        return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des informations de l\'utilisateur et des adresses' }), { status: 500 });
    }
}
