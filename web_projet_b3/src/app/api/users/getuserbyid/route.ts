import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'ID est requis' }), { status: 400 });
        }

        // Récupérer l'utilisateur
        const { data: userResult, error: userError } = await supabase
            .from('User')
            .select('*')
            .eq('id', id)
            .single();

        if (userError) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', userError);
            return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération de l\'utilisateur' }), { status: 500 });
        }

        if (!userResult) {
            return new NextResponse(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
        }

        // Récupérer les adresses
        const { data: addressResult, error: addressError } = await supabase
            .from('Adresse')
            .select('*')
            .eq('id_user', id);

        if (addressError) {
            console.error('Erreur lors de la récupération des adresses:', addressError);
            return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des adresses' }), { status: 500 });
        }

        // Récupérer les moyens de paiement
        const { data: paymentResult, error: paymentError } = await supabase
            .from('Moyens_paiement')
            .select('*')
            .eq('id_user', id);

        if (paymentError) {
            console.error('Erreur lors de la récupération des moyens de paiement:', paymentError);
            return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des moyens de paiement' }), { status: 500 });
        }

        const responseData = {
            user: userResult,
            addresses: addressResult || [],
            payment: paymentResult || [],
        };

        return new NextResponse(JSON.stringify(responseData), { status: 200 });

    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur et des adresses:', error);
        return new NextResponse(JSON.stringify({ error: 'Erreur lors de la récupération des informations de l\'utilisateur et des adresses' }), { status: 500 });
    }
}
