import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
  try {
    const { id_user, address, region, country, city, zip, address2 } = await request.json();

    if (!id_user || !address || !country || !city || !zip) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('Adresse')
      .insert([
        { ville: city, region, code_postal: zip, pays: country, adresse: address, complement_adresse: address2, id_user }
      ])
      .select('id');

    if (error) {
      console.error('Erreur lors de la création de l\'adresse:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de l\'adresse' }), { status: 500 });
    }

    const addressId = data[0]?.id;
    if (!addressId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de l\'adresse' }), { status: 500 });
    }

    console.log('Adresse ajoutée avec ID:', addressId);
    return new NextResponse(JSON.stringify({ message: 'Adresse créée avec succès', addressId }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'adresse:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout de l\'adresse' }), { status: 500 });
  }
}
