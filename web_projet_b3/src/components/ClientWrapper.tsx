'use client';

import { useSession } from 'next-auth/react';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
