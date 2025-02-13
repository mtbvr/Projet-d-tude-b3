/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct
import { PostgrestResponse, PostgrestError } from '@supabase/supabase-js';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function GET() {
  try {
    const { data, error }: PostgrestResponse<User> = await supabase
      .from('User')
      .select('*');

    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
    }

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ message: 'Aucun utilisateur trouvé' }), { status: 404 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500 });
  }
}
