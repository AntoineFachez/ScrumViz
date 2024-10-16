'use client';
import { useContext, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { DeveloperBoard } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../uiItems/widgetItems/WidgetIndexTemplate';
import GridComponent from './GridComponent';

import { useMode } from '@/app/theme/ThemeContext';
import { ToastContainer } from 'react-toastify';
export default function ScrumManagerPage({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
  gridRef,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { toggleBG, imageUrlArr } = useContext(UIContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const collection = 'scrumManager';
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: false,
    uiGridMapContext: uiGridMapContext,
    iconButton: <DeveloperBoard />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: collection,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    onClick: () => {
      setAppContext(collection);
      // window.location.href = '/scrumManager';
      setUiGridMapContext(collection);
      return;
    },
  };

  const soloWidget = (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {toggleBG && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <img
            src={imageUrlArr[16]}
            alt=""
            style={{
              zIndex: 0,
              position: 'absolute',
              width: '100%',
              height: 'auto',
              filter: 'brightness(0.8)',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
      {/* ) : ( */}
      <GridComponent gridRef={gridRef} />
      <ToastContainer />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate widgetProps={widgetProps} soloWidget={soloWidget} />
    </>
  );
}
