'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../uiItems/widgetItems/WidgetIndexTemplate';
import { listAllBuckets } from '@/firebase/helperFunctions';
import { useMode } from '../theme/ThemeContext';
import GridComponent from './GridComponent';
import AppContext from '@/context/AppContext';
import { Code } from '@mui/icons-material';

export default function AgileCodingPage({
  uiContext,
  startUpWidgetLayout,
  // contextToolBar,
}) {
  const containerRef = useRef(null);

  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { setImageUrlArr } = useContext(UIContext);

  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const collection = 'agileCoding';
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    iconButton: <Code />,
    collection: collection,
    uiContext: uiContext,
    // contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    onClick: () => {
      setAppContext(collection);
      setUiGridMapContext(collection);
      return;
    },
  };

  const spliceIn = () => {
    listAllBuckets(setImageUrlArr);
  };
  useEffect(() => {
    spliceIn();
    return () => {};
  }, []);

  const soloWidget = (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        marginTop: '3rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <GridComponent styled={styled} />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate widgetProps={widgetProps} soloWidget={soloWidget} />
    </>
  );
}
