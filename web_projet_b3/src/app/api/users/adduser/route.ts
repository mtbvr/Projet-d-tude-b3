import { sql } from '@vercel/postgres';

// Définir une interface pour représenter un utilisateur
interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export async function POST(request: { json: () => any; }) {
    try {
        const { firstname, lastname, email, password } = await request.json();

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
