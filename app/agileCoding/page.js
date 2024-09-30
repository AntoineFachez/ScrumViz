'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../pages/WidgetIndexTemplate';
import { upLoadFilesToFireStore } from '@/firebase/helperFunctions';
import ImageDropzone from '../widgets/imageDropZone/Index';
import UserStory from '../widgets/userStories/UserStories';
import Sprint from '../widgets/sprints/Sprints';
import BackLogItem from '../widgets/productBacklogs/ProductBackLogs';
import { themeSettings } from '../theme/ThemeContext';
import GridComponent from './GridComponent';
import AppContext from '@/context/AppContext';
import Image from 'next/image';
import { DeveloperBoard } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function AgileCodingPage({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { homeUiSelected, setHomeUiSelected } = useContext(UIContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const image =
    'https://firebasestorage.googleapis.com/v0/b/scrum-viz.appspot.com/o/images%2FScrum__MainView.png?alt=media&token=91f8b1c7-d38c-4e28-b0f2-eae4ee163841';

  const collection = 'agileCoding';
  const widgetProps = {
    appContext: appContext,
    iconButton: <DeveloperBoard />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',
    // soloWidget: soloWidget,
    // chip:chip,
    // widgetRight:flexList,
    onClick: () => setAppContext(collection),
  };
  const handleSetWidget = (e) => {
    // e.preventDefault();
    // window.location.href = '/scrumManager';
    setAppContext(collection);
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
      <WidgetIndexTemplate
        widgetProps={widgetProps}
        // menu={menu}
        // newItem={newItem}
        soloWidget={soloWidget}
        // table={table}
        // singleItem={singleItem}
        // chip={chip}
        // tree={tree}
        // flexList={flexList}
      />
    </>
  );
}
