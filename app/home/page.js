'use client';
import React from 'react';
// import Profile from '../profile/page';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  // if (!session) {
  //   return <div>Loading...</div>; // Display a loading message
  // }

  return (
    <div>
      <div>Home</div>
      {/* {session && ( // Conditional rendering
        <div>
          <p>Logged in as {session.user.email}</p>
          <p>Using provider: {session.provider}</p>
          <img src={session.user.image} alt={session.user.name} />
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
        </div>
      )} */}
    </div>
  );
}
