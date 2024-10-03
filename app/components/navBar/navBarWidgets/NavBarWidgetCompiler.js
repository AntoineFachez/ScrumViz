import React, { Fragment } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
// import { theme as pipes } from "../../themes/Theme";
import NavBarWidget from './NavBarWidget';
import { useMode } from '@/app/theme/ThemeContext';

export default function NavBarWidgetList({ data, styled }) {
  // const theme = useTheme();
  // const colors = pipes(theme.palette.mode);
  // const color = `${colors.primary[200]} !important`;
  const test = 'weird text';
  return (
    <>
      {data?.content?.body.map((block, i) => (
        <Fragment key={i}>
          {NavBarWidget(block, {
            test,
            contextToolBar: 'navBar',
          })}
        </Fragment>
      ))}
    </>
  );
}
