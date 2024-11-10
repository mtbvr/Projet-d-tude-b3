import { NextRequest } from "next/server";
import { EmailTemplate } from "../../../../components/EmailTemplate"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, firstname, verificationToken } = await request.json();

    console.log(email)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const verificationUrl = `${baseUrl}/api/mail/verify?token=${verificationToken}`

    const { data, error } = await resend.emails.send({
      from: 'Acme <noreply@mateo-bouvier.com>',
      to: [email],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: firstname , verificationUrl: verificationUrl}),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
