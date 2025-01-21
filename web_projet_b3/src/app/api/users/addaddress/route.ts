import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id_user, address, region, country, city, zip, address2 } = await request.json();

    if (!id_user|| !address || !country || !city || !zip) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const result = await sql`
      INSERT INTO "Adresse" (ville, region, code_postal, pays, adresse, complement_adresse, id_user)
      VALUES (${city}, ${region}, ${zip}, ${country}, ${address}, ${address2}, ${id_user})
      RETURNING id;
    `;

    const addressId = result.rows[0]?.id;
    if (!addressId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de l\'adresse' }), { status: 500 });
    }


    console.log('Adresse ajouté avec ID:', addressId);
    return new NextResponse(JSON.stringify({ message: 'Adresse créé avec succès', addressId }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'adresse:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout de l\'adresse' }), { status: 500 });
  }
}
