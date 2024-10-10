import React, { useContext, useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import ThemeContext, { themeSettings, useMode } from '@/app/theme/ThemeContext';

const SignUpWithEmailPawword = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleClose,
  switchToSignUp,
  setAlert,
  onSubmit,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const [error, setError] = useState();
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
          size={'small'}
          placeholder="password"
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          sx={styled.textField}
          size={'small'}
          placeholder="password confirmation"
          type="password"
          label="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </Box>
      <Box className="form-footer" sx={styled.signUpLogInCard.footer}>
        <Button
          sx={styled.menuButtonText.action}
          size="small"
          onClick={onSubmit}
        >
          Sign Up
        </Button>
        <Typography>{error?.code}</Typography>

        {/* <p className="signUp-logIn-message">{alert.message}</p> */}
      </Box>
    </>
  );
};
export default SignUpWithEmailPawword;
