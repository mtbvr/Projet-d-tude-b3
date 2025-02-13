/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct
import { PostgrestResponse, PostgrestError } from '@supabase/supabase-js';

interface Categorie {
  id: number;
  name: string;
  description: string;
}

export async function GET() {
  try {
    const { data, error }: PostgrestResponse<Categorie> = await supabase
      .from('Categories')
      .select('*');

    if (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des catégories' }), { status: 500 });
    }

    if (!data || data.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'Aucune catégorie trouvée' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des catégories' }), { status: 500 });
  }
}
