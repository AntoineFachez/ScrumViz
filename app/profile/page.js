'use client';
import React from 'react';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'authenticated') {
    return (
      <div>
        <img
          src={session.user.image}
          alt={session.user.name}
          style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
        />
      </div>
    );
  }
  return (
    <>
      <div>You are not logged in.</div>
    </>
  );
}
