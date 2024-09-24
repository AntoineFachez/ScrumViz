'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { getDocIdSByValueSearch } from '../../../firebase/helperFunctions';
import { auth, db } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [userInFocus, setUserInFocus] = useState([null]);

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
    const parentCollectionName = 'users';
    const queryField = 'userId';
    const searchString = user?.uid;
    const tempUserInFocus = getDocIdSByValueSearch(
      parentCollectionName,
      queryField,
      searchString
      //  foundParents,
    );
    tempUserInFocus.then(function (result) {
      setUserInFocus(result?.parentDoc);
    });

    return () => {};
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        userInFocus,
        setUserInFocus,
        // userLocation,
        // setUserLocation,
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
