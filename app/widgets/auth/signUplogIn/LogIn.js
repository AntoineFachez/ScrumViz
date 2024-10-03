import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { auth, db } from '@/firebase/firebase';
import { arrayUnion } from 'firebase/firestore';

import AppContext, { AppState } from '@/context/AppContext';

import {
  handleAddDocToSubCollection,
  getDocIdSByValueSearch,
} from '@/firebase/helperFunctions';
import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';

const Login = ({
  users,
  user,
  setUser,
  email,
  setEmail,
  password,
  setPassword,
  userInFocus,
  setUserInFocus,
  handleClose,
  switchToSignUp,
  // styled,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const { alert, setAlert } = AppState();
  const [error, setError] = useState();
  const { log, setLog } = useContext(AppContext);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'fill in email and password',
        type: 'error',
      });
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.emailVerified) {
        setUser(userCredential.user);

        //* Set Log of login Time
        const data = {
          logsFrontEnd: arrayUnion({
            logIn: new Date().getTime(),
            logIn2: new Date(),
            logId: uuidv4(),
          }),
        };

        const parentCollectionName = 'users';
        const subCollectionName = 'logs';
        const queryField = 'userId';
        const searchString = userCredential.user.uid;
        const setItemInFocus = setLog;
        const foundParents = users;
        const parentDoc = await getDocIdSByValueSearch(
          parentCollectionName,
          queryField,
          searchString,
          foundParents
        );
        // console.log("parentCollectionName", parentDoc.parentDoc);
        // users.push(parentDoc.parentDoc);

        if (parentDoc.parentId)
          handleAddDocToSubCollection(
            parentCollectionName,
            parentDoc.parentId,
            subCollectionName,
            data,
            setItemInFocus,
            setError
          );
        setUserInFocus(parentDoc?.parentDoc);

        setAlert({
          open: true,
          message: `welcome ${userCredential.user.email}`,
          type: 'success',
        });
      } else {
        setAlert({
          open: true,
          message: `please check your emails before proceeding`,
          type: 'success',
        });
      }
      // window.localStorage.setItem(JSON.stringify("userLogin", userCredential));
      // localStorage.clear();
      // window.localStorage.clear();
    } catch (error) {
      setError(error);
      // setAlert({
      //   open: true,
      //   message: error.message,
      //   type: "error",
      // });
      return;
    }
  };

  return (
    <>
      <TextField
        sx={styled.textField}
        placeholder="email"
        type="email"
        label="email"
        value={email}
        size="small"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        sx={styled.textField}
        placeholder="password"
        type="password"
        label="password"
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Box className="form-footer">
        <Button
          sx={styled.textButtonStyles}
          onClick={handleSubmit}
          size="small"
        >
          Log In
        </Button>
        <Typography>{error?.code}</Typography>
        <p className="signUp-logIn-message">{alert?.message}</p>
      </Box>
    </>
  );
};

export default Login;
