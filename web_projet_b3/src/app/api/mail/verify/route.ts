import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const result = await sql`
      UPDATE "User"
      SET "isConfirmed" = TRUE, "verificationToken" = NULL
      WHERE "verificationToken" = ${token}
      RETURNING id, email, "isConfirmed";
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email successfully verified' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}
