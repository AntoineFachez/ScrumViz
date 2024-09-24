import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
// import { theme as pipes } from "../../themes/Theme";
import NavBarWidget from './NavBarWidget';

export default function NavBarWidgetList({ data, styled }) {
  // const theme = useTheme();
  // const colors = pipes(theme.palette.mode);
  // const color = `${colors.primary[200]} !important`;
  const test = 'weird text';
  return (
    <>
      {data?.content?.body.map((block, i) => (
        <Box className="navBarButton" key={i}>
          {NavBarWidget(block, {
            test,
            contextToolBar: 'navBar',
          })}
        </Box>
      ))}
    </>
  );
}
