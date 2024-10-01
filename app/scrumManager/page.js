'use client';
import { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { DeveloperBoard } from '@mui/icons-material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../uiItems/WidgetIndexTemplate';
import GridComponent from './GridComponent';

import { themeSettings } from '../theme/ThemeContext';

export default function ScrumManagerPage({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const image =
    'https://firebasestorage.googleapis.com/v0/b/scrum-viz.appspot.com/o/images%2FScrum__MainView.png?alt=media&token=91f8b1c7-d38c-4e28-b0f2-eae4ee163841';

  const collection = 'scrumManager';
  const widgetProps = {
    appContext: appContext,
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
        // ...styled.centerFullAvailableSpace,
        position: 'relative',
        width: '100%',
        height: '100%',
        marginTop: '3rem',
        overflow: 'hidden',
        // gap: '1rem',
        position: 'relative',
        // background: appContext === 'scrumManager' && `url(${image})`,
        // backgroundRepeat: appContext === 'scrumManager' && 'no-repeat',
        // backgroundPosition: appContext === 'scrumManager' && 'center',
        // backgroundSize: appContext === 'scrumManager' && 'cover',
      }}
    >
      {' '}
      <GridComponent styled={styled} />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate widgetProps={widgetProps} soloWidget={soloWidget} />
    </>
  );
}
