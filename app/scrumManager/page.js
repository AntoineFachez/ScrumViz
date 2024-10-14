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
  const image =
    'https://firebasestorage.googleapis.com/v0/b/scrum-viz.appspot.com/o/images%2FScrum__MainView.png?alt=media&token=91f8b1c7-d38c-4e28-b0f2-eae4ee163841';

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
        // ...styled.widget,
        position: 'relative',
        width: '100%',
        height: '100%',

        // overflow: 'hidden',
        // gap: '1rem',
        // position: 'relative',
        // background: appContext === 'scrumManager' && `url(${image})`,
        // backgroundRepeat: appContext === 'scrumManager' && 'no-repeat',
        // backgroundPosition: appContext === 'scrumManager' && 'center',
        // backgroundSize: appContext === 'scrumManager' && 'cover',
      }}
    >
      {toggleBG ? (
        <img
          src={imageUrlArr[16]} // Assuming the image is in public/images
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            padding: '2rem',
            filter: 'brightness(0.8)',
          }}
          // width={'100%'} // Set width and height explicitly or use fill
          // height={300}
        />
      ) : (
        <GridComponent gridRef={gridRef} />
      )}
      <ToastContainer />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate widgetProps={widgetProps} soloWidget={soloWidget} />
    </>
  );
}
