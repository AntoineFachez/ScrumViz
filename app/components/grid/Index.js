//*
//*
//TODO GRID: ROW_HEIGHT

import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import { Box } from '@mui/material';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
// import { viewerGridMap, textAnalyzerGridMap } from "./defaultGridMaps";
import {
  generateDOM,
  // generateLayout,
  handleDropWidgetIntoSpace,
  // handleLayoutChange,
  resetLayout,
} from './helperFunctions';
import { themeSettings } from '@/app/theme/ThemeContext';
export default function Index({}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const {
    showDev,
    showPaneMenu,
    setShowPaneMenu,
    userRole,
    gridDOMMap,
    setGridDOMMap,
    domGridMap,
    setDomGridMap,
  } = useContext(UIContext);
  const gridRef = useRef();
  // const [generatedDOM, setGeneratedDOM] = useState();
  const [resetGrid, setResetGrid] = useState();

  useEffect(() => {
    // const tempAppContext = appContext;
    // setAppContext();
    // setTimeout(() => {
    //   setAppContext(tempAppContext);
    // }, 10);
    // generateLayout(
    //   // gridDOMMap ? gridDOMMap : textAnalyzerGridMap,
    //   domGridMap,
    //   //TODO ROW_HEIGHT
    //   //* setParentHeight,
    //   gridRef,
    // );
    setResetGrid(
      <Grid
        gridRef={gridRef}
        userRole={userRole}
        appContext={appContext}
        domGridMap={domGridMap}
        gridDOMMap={gridDOMMap}
        // generatedDOM={generatedDOM}
        setGridDOMMap={setGridDOMMap}
        generateDOM={generateDOM}
        // handleLayoutChange={handleLayoutChange}
        showDev={showDev}
        showPaneMenu={showPaneMenu}
        setShowPaneMenu={setShowPaneMenu}
        styled={styled}
      />
    );

    return () => {};
  }, [domGridMap]);

  return <>{resetGrid}</>;
}
