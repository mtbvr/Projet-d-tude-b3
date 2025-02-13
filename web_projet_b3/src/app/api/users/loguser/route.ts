import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt-ts';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: 'Email et mot de passe sont requis' }), { status: 400 });
    }

    const { data: users, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
    }

    if (!users || users.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
    }

    const existingUser = users[0];
    const validPassword = await compare(password, existingUser.password);

    if (!validPassword) {
      return new NextResponse(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401 });
    } else {
      return new NextResponse(JSON.stringify({ message: 'Utilisateur connecté avec succès' }), { status: 200 });
    }

  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la connexion de l\'utilisateur' }), { status: 500 });
  }
}
