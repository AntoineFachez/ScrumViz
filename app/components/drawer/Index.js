import React, { useContext, useState } from 'react';
import Drawer from './Drawer';
import UIContext from '@/context/UIContext';
import { IconButton, MenuItem } from '@mui/material';

export default function Index({
  // showDrawer,
  // setShowDrawer,
  // orientationDrawer,
  // setOrientationDrawer,
  // buttonOpen,
  // selectedWidgetContext,
  // setSelectedWidgetContext,
  // toggleDrawer,
  // orientationDrawer,
  // setOrientationDrawer,
  drawerMenu,
  handleGoBack,
  // list,
  drawerFloorElement,
  styled,
}) {
  const {
    // showDrawer,
    // setShowDrawer,
    handleToggleDrawer,
    orientationDrawer,
    setOrientationDrawer,
  } = useContext(UIContext);

  const buttonOpen = (
    <>
      {/* <Box sx={styledComponent?.widgetMenu}> */}
      {/* <IconButton
        onClick={toggleDrawer(anchor, true)}
        sx={styledComponent?.widgetMenuButton}
      >
        <MenuIcon />
      </IconButton> */}
      {/* </Box> */}
    </>
  );

  return (
    <>
      <Drawer
        // showDrawer={showDrawer}
        // setShowDrawer={setShowDrawer}
        orientationDrawer={orientationDrawer}
        setOrientationDrawer={setOrientationDrawer}
        // buttonOpen={buttonOpen}
        handleToggleDrawer={handleToggleDrawer}
        // selectedWidgetContext={selectedWidgetContext}
        // setSelectedWidgetContext={setSelectedWidgetContext}
        drawerMenu={drawerMenu}
        handleGoBack={handleGoBack}
        drawerFloorElement={drawerFloorElement}
        styled={styled}
      />
    </>
  );
}
