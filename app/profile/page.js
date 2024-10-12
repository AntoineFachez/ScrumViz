'use client';
import React from 'react';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession(); // Don't destructure immediately

  if (session?.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.status === 'authenticated') {
    // Now you can safely destructure
    const { data } = session;

    return (
      <div>
        <p>Logged in as {data?.user?.email}</p>{' '}
        <img
          src={data?.user?.image}
          alt={data?.user?.name}
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
