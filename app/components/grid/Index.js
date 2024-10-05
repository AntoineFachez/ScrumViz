import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import { Box } from '@mui/material';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import { generateDOM } from './helperFunctions';
import { themeSettings, useMode } from '@/app/theme/ThemeContext';
export default function Index({ gridRef }) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext } =
    useContext(AppContext);

  const { defaultWidgetMap } = useContext(UIContext);

  const [resetGrid, setResetGrid] = useState();

  useEffect(() => {
    setResetGrid(
      <Grid
        appContext={appContext}
        gridRef={gridRef}
        uiGridMapContext={uiGridMapContext}
        defaultWidgetMap={defaultWidgetMap}
        styled={styled}
      />
    );

    return () => {};
  }, [defaultWidgetMap]);

  return <>{resetGrid}</>;
}
