import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const { id_user, firstname, lastname, email } = await request.json();

    if (!id_user || !firstname || !lastname || !email) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const result = await sql`
      UPDATE "User"
      SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}
      WHERE id = ${id_user}
      RETURNING id;
    `;

    if (result.rowCount === 0) {
      return new NextResponse(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ success: 'Utilisateur mis à jour avec succès', id: result.rows[0].id }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }), { status: 500 });
  }
}
