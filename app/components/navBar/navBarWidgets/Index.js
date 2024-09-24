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
// import PaintRuns from "../../../PaintRuns";

// import './sidebar.scss';

export default function Index({
  data,
  color,
  navBarButtonList,
  // blurDashboard
}) {
  // console.log(data);
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
      {themeMode === 'tutorial' ? (
        <Box className="navBar" sx={{ backgroundColor: color }}></Box>
      ) : (
        <>
          <List className="navBar" sx={navBarButtonList}>
            <NavBarWidgetCompiler
              data={data}
              // styled={styled}
            />
          </List>
        </>
      )}
    </>
  );
}
