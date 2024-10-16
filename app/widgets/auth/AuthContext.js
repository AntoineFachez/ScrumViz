'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { getDocIdSByValueSearch } from '../../../firebase/helperFunctions';
import { auth, db } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useSession } from 'next-auth/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const { session } = useSession();
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentSession, setCurrentSession] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    setUser(currentSession?.user);
    return () => {};
  }, [currentSession]);

  return (
    <AuthContext.Provider
      value={{
        showSignUp,
        setShowSignUp,
        signInLoading,
        setSignInLoading,

        // userLocation,
        // setUserLocation,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        currentSession,
        setCurrentSession,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export const AuthState = () => {
  return useContext(AuthContext);
};
