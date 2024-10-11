import React from 'react';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();
  console.log(session?.expires, session?.user);

  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Profile</div>
      {session && (
        <div>
          <p>Logged in as {session.user.email}</p>
          <p>Using provider: {session.provider}</p> {/* Display the provider */}
          <img src={session.user.image} alt={session.user.name} />
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>{' '}
        </div>
      )}{' '}
    </div>
  );
}
