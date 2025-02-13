import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient'; // Assurez-vous que le chemin est correct

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/pages/mail?error=invalid-token`);
  }

  try {
    const { data, error } = await supabase
      .from('User')
      .update({ isConfirmed: true, verificationToken: null })
      .eq('verificationToken', token)
      .select('id, email, isConfirmed');

    if (error || data.length === 0) {
      return NextResponse.redirect(`${baseUrl}/pages/mail?error=expired-token`);
    }

    return NextResponse.redirect(`${baseUrl}/pages/mail?success=true`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(`${baseUrl}/pages/mail?error=internal`);
  }
}
