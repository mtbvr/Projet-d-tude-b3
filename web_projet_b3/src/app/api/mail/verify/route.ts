import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/pages/mail?error=invalid-token`);
  }

  try {
    const result = await sql`
      UPDATE "User"
      SET "isConfirmed" = TRUE, "verificationToken" = NULL
      WHERE "verificationToken" = ${token}
      RETURNING id, email, "isConfirmed";
    `;

    if (result.rowCount === 0) {
      return NextResponse.redirect(`${baseUrl}/pages/mail?error=expired-token`);
    }
    
    return NextResponse.redirect(`${baseUrl}/pages/mail?success=true`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(`${baseUrl}/pages/mail?error=internal`,);
  }
}
