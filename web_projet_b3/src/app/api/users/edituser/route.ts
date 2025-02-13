import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; 

export async function POST(request: NextRequest) {
  try {
    const { id_user, firstname, lastname, email } = await request.json();

    if (!id_user || !firstname || !lastname || !email) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('User')
      .update({ firstname, lastname, email })
      .eq('id', id_user)
      .select('id');

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }), { status: 500 });
    }

    if (data.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ success: 'Utilisateur mis à jour avec succès', id: data[0].id }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }), { status: 500 });
  }
}
