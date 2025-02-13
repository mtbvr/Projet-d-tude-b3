import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new NextResponse(JSON.stringify({ error: 'Email est requis' }), { status: 400 });
        }

        const { data: users, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email);

        if (error) {
            console.error('Erreur lors de la vérification de l\'email:', error);
            return new NextResponse(JSON.stringify({ error: 'Erreur lors de la vérification de l\'email' }), { status: 500 });
        }

        if (users.length > 0) {
            return new NextResponse(JSON.stringify({ exists: true }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ exists: false }), { status: 200 });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        return new NextResponse(JSON.stringify({ error: 'Erreur lors de la vérification de l\'email' }), { status: 500 });
    }
}
