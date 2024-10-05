import React, { useContext, useEffect } from 'react';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import NavBarWidgetCompiler from './NavBarWidgetCompiler';
import { List } from '@mui/material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
// import dataTutorial from "../../pages/forms/tutorial/navBarWidgetListTUT";
import { useTheme } from '@emotion/react';
// import { colorTokens } from "../../../Theme";
import { Box } from '@mui/system';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
// import PaintRuns from "../../../PaintRuns";

// import './sidebar.scss';

export default function Index({
  data,
  color,
  styled,
  // blurDashboard
}) {
  const { themeMode } = useContext(AppContext);

  // useEffect(() => {
  // blurDashboard(true);
  // }, []);

  return (
    <>
      {/* <Box
        sx={{
          position: "absolute",
          // width: "var(--bar-btn-size)",
          width: "var(--bar-btn-size)",
          marginLeft: "var(--left-panel-margin)",
          paddingLeft: "0.2rem",
          // height: "100%",
          // backgroundColor: "pink",
        }}
      >
        <PaintRuns />
      </Box> */}

      <>
        <List
          className="navBar"
          sx={{ ...styled.navBarButtonList, flexFlow: 'row nowrap' }}
        >
          <NavBarWidgetCompiler data={data} styled={styled} />
        </List>
      </>
    </>
  );
}
