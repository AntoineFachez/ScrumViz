import React, { useContext, useState } from 'react';
import Drawer from './Drawer';
import UIContext from '@/context/UIContext';

export default function Index({
  drawerMenu,
  handleGoBack,
  drawerFloorElement,
  styled,
}) {
  const { handleToggleDrawer, orientationDrawer, setOrientationDrawer } =
    useContext(UIContext);

  return (
    <>
      <Drawer
        orientationDrawer={orientationDrawer}
        setOrientationDrawer={setOrientationDrawer}
        handleToggleDrawer={handleToggleDrawer}
        drawerMenu={drawerMenu}
        handleGoBack={handleGoBack}
        drawerFloorElement={drawerFloorElement}
        styled={styled}
      />
    </>
  );
}
