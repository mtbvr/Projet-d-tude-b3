import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  verificationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verificationUrl,
}) => (
  <div>
    <h1>Bonjour, {firstName}!</h1>
    <p>Veuillez vérifier votre adresse mail en cliquant sur le lient ci-dessous:</p>
    <a href={verificationUrl}>Verify Email</a>
  </div>
);
