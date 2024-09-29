import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import { Box } from '@mui/material';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import { generateDOM } from './helperFunctions';
import { themeSettings } from '@/app/theme/ThemeContext';
export default function Index({}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const {
    showDev,
    showPaneMenu,
    setShowPaneMenu,
    userRole,
    defaultWidgetMap,
    gridDOMMap,
    setGridDOMMap,
    setDefaultWidgetMap,
  } = useContext(UIContext);
  const gridRef = useRef();
  const [resetGrid, setResetGrid] = useState();

  useEffect(() => {
    setResetGrid(
      <Grid
        gridRef={gridRef}
        userRole={userRole}
        appContext={appContext}
        defaultWidgetMap={defaultWidgetMap}
        gridDOMMap={gridDOMMap}
        setGridDOMMap={setGridDOMMap}
        generateDOM={generateDOM}
        showDev={showDev}
        showPaneMenu={showPaneMenu}
        setShowPaneMenu={setShowPaneMenu}
        styled={styled}
      />
    );

    return () => {};
  }, [defaultWidgetMap]);

  return <>{resetGrid}</>;
}
