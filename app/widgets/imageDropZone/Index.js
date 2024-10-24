'use client';
import React from 'react';
import ImageDropzone from './ImageDropZone';

import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import Menu from './Menu';
import { PinDropOutlined, Upload } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import ImageDropZoneContext from './ImageDropZoneContext';

export default function ImageDrop({
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
  onImageUpload,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext } = useContext(AppContext);

  const { homeUiSelected, setHomeUiSelected } = useContext(UIContext);
  const { showWidgetUIMenu, setShowWidgetUIMenu } =
    useContext(ImageDropZoneContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = '';
  const handleSelectWidgetContext = (context) => {
    //  if (generated) {
    //    setPassWidgetContext(context);
    //  }
    setSelectedWidgetContext(context);
    //  if (startUpWidgetLayout !== context) {
    //    //TODO: if widgetContext of former widget is different to the new one's then dialogue:"wanna keep table view or set to default view of component?
    //  } else {
    //  }
  };
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    iconButton: <Upload />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
    orderedBy: '',

    onClick: () => {
      setScrumManagerContext(collection);
      return;
    },
    menuProps: {
      states: {
        showMenu: showWidgetUIMenu,
        // widgetProps: widgetProps,
      },
      functions: {
        handleShowMenu: setShowWidgetUIMenu,
      },
    },
    // searchTerm: searchTerm,
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    handleSelectWidgetContext: handleSelectWidgetContext,
    // handleSearchTermChange: () =>
    //   handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  // const menu = (
  //   <Menu
  //     widgetProps={widgetProps}
  //     handleSelectWidgetContext={handleSelectWidgetContext}
  //     //   searchString={searchString}
  //     // handleSearch={handleSearch}
  //     // handleFilterEntities={handleFilterEntities}
  //     // isLoading={isLoading}
  //     // getAllentitiesTypes={getAllentitiesTypes}
  //     // handlePaste={handlePaste}
  //     // handleSubmit={handleSubmit}
  //     //   styled={styled}
  //   />
  // );
  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      DropZone SoloWidget
    </Box>
  );
  const singleItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      DropZone SingleItem
    </Box>
  );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      DropZone Chip
    </Box>
  );
  const tree = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      DropZone Tree
    </Box>
  );
  const table = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      <StandInTable />
    </Box>
  );
  const flexList = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      DropZone FlexList
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate widgetProps={widgetProps} />
    </>
  );
}
