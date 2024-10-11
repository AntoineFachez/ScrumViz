import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { auth, db } from '@/firebase/firebase';

import AppContext, { AppState } from '@/context/AppContext';

import { handleLogIn } from '../../functions/helper';

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
  setAlert,
  // styled,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const [error, setError] = useState();
  const { log, setLog } = useContext(AppContext);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <>
      <Box
        sx={{
          ...styled.card,
          ...styled.signUpLogInCard.body,
        }}
      >
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
      </Box>
      {/* <Box className="form-footer" sx={styled.signUpLogInCard.footer}>
        <Button
          sx={styled.menuButtonText.action}
          onClick={(e) =>
            handleLogIn(
              e,
              auth,
              email,
              password,
              setUser,
              setUserInFocus,
              setAlert,
              setError
            )
          }
          size="small"
        >
          Log In
        </Button>
        <Typography>{error?.code}</Typography>
      </Box> */}
    </>
  );
};

export default Login;
