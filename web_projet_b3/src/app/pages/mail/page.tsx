'use client'

import { useEffect, useState } from 'react';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utilisation de URLSearchParams pour extraire les paramètres d'URL
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');

    if (success || error) {
      setLoading(false);
      if (success === 'true') {
        setMessage('🎉 Your email has been successfully verified! You can now check your account');
      } else if (error === 'invalid-token') {
        setMessage('❌ Invalid token. Please check your verification link.');
      } else if (error === 'expired-token') {
        setMessage('⚠️ Your token has expired. Please request a new verification email.');
      } else if (error === 'internal') {
        setMessage('🚨 An internal error occurred. Please try again later.');
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>
        <p className={`text-lg mb-6 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
        {message.includes('success') && (
          <a
            href="/pages/account"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
          >
            Go to account
          </a>
        )}
        {(message.includes('Invalid') || message.includes('expired')) && (
          <a
            href="/resend-verification"
            className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium shadow-md hover:bg-yellow-600 transition"
          >
            Resend Verification Email
          </a>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
