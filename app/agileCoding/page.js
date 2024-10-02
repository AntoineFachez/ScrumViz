'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../uiItems/WidgetIndexTemplate';
import {
  listAllBuckets,
  upLoadFilesToFireStore,
} from '@/firebase/helperFunctions';
import ImageDropzone from '../widgets/imageDropZone/Index';
import UserStory from '../widgets/userStories/UserStories';
import Sprint from '../widgets/sprints/Sprints';
import BackLogItem from '../widgets/productBacklogs/ProductBackLogs';
import { themeSettings } from '../theme/ThemeContext';
import GridComponent from './GridComponent';
import AppContext from '@/context/AppContext';
import Image from 'next/image';
import { Code, DeveloperBoard } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function AgileCodingPage({
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const containerRef = useRef(null);
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { homeUiSelected, setHomeUiSelected, defaultWidgetMap } =
    useContext(UIContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const collection = 'agileCoding';
  const widgetProps = {
    appContext: appContext,
    iconButton: <Code />,
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
    onClick: () => {
      setAppContext(collection);
      // window.location.href = '/scrumManager';
      setUiGridMapContext(collection);
      return;
    },
  };
  const handleSetWidget = (e) => {
    // e.preventDefault();
    // window.location.href = '/scrumManager';
    setAppContext(collection);
  };
  const [imageUrlArr, setImageUrlArr] = useState([]);
  const spliceIn = () => {
    listAllBuckets(setImageUrlArr);
  };
  const param = {};
  useEffect(() => {
    spliceIn();
    return () => {};
  }, []);

  const soloWidget = (
    <Box
      ref={containerRef}
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