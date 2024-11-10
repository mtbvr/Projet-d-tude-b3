import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, password } = await request.json();

    if (!firstname || !lastname || !email || !password) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const rounds = genSaltSync(12);
    const hashedPassword = hashSync(password, rounds);

    const verificationToken = uuidv4();

    const result = await sql`
      INSERT INTO "User" (firstname, lastname, email, password, "verificationToken")
      VALUES (${firstname}, ${lastname}, ${email}, ${hashedPassword}, ${verificationToken})
      RETURNING id;
    `;

    const userId = result.rows[0]?.id;
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création de l\'utilisateur' }), { status: 500 });
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const mailVerif = await axios.post(`${baseUrl}/api/mail/send`, { firstname, email, verificationToken });
      console.log(mailVerif);
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: `Erreur lors de l'envoi du mail: ${error}` }), { status: 500 });
    }

    console.log('Utilisateur ajouté avec ID:', userId);
    return new NextResponse(JSON.stringify({ message: 'Utilisateur créé avec succès', userId }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout de l\'utilisateur' }), { status: 500 });
  }
}
