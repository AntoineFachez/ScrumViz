'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { AddToQueue, BackupOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import SearchContext from '@/context/SearchContext';
import TimeStampsContext from './TimeStampsContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import Menu from './Menu';
import SingleItem from '@/app/pages/SingleItem';
import MultiItems from '@/app/pages/MultiItems';
import { singleItemScheme } from './dataScheme';

export default function TimeStamps({
  uiContext,
  startUpWidgetLayout,
  url,
  setUrl,
  targetUrl,
  contextToolBar,
}) {
  const { palette, styled } = themeSettings('dark');
  const { appContext, setAppContext } = useContext(AppContext);
  const { homeUiSelected, setHomeUiSelected } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const {
    displayTimeStamps,
    setDisplayTimeStamps,
    selectedTimeStamps,
    setSelectedTimeStamps,
    timeStampInFocus,
    setTimeStampInFocus,
  } = useContext(TimeStampsContext);
  const collection = 'timeStamps';
  const widgetProps = {
    iconButton: <AddToQueue />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',
    // menu: menu,
    // soloWidget: soloWidget,
    // table: table,
    // singleItem: singleItem,
    // chip: chip,
    // tree: tree,
    // flexList: flexList,
    onClick: () => {
      // window.location.href = '/sprint';
      setAppContext(collection);
    },
  };

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

  const handleSetTimeStampInFocus = (timeStamp) => {
    setTimeStampInFocus(timeStamp);

    // setActiveSearchTerm(userStory?.universityName);
    // setLastInFocusItem({
    //   context: widgetProps?.itemContext,
    //   item: universityInFocus,
    // });
  };
  const CardSubHeaderElement = (data) => (
    <Typography
      onClick={() => handleSetTimeStampInFocus(data)}
      sx={styled?.textBody}
      variant={styled?.textBody?.variant}
    ></Typography>
  );
  const menu = (
    <Menu
      widgetProps={widgetProps}
      handleSelectWidgetContext={handleSelectWidgetContext}
      //   searchString={searchString}
      // handleSearch={handleSearch}
      // handleFilterEntities={handleFilterEntities}
      // loading={loading}
      // getAllentitiesTypes={getAllentitiesTypes}
      // handlePaste={handlePaste}
      // handleSubmit={handleSubmit}
      //   styled={styled}
    />
  );
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TimeStamps New Item
    </Box>
  );
  const soloWidget = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TimeStamps SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={timeStampInFocus}
      styled={styled}
    />
  );
  const chip = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      TimeStamps Chip
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
      TimeStamps Tree
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
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        data={displayTimeStamps}
        selectedData={selectedTimeStamps}
        setSelectedItem={setSelectedTimeStamps}
        selector={{
          selector: 'timeStampSelector',
          selected: 'selectedTimeStamps}',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={timeStampInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetTimeStampInFocus}
        customElement={null}
        alertElement={null}
        cardSubHeaderElement={CardSubHeaderElement}
        styled={styled}
      />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widgetProps={widgetProps}
        menu={menu}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        singleItem={singleItem}
        chip={chip}
        tree={tree}
        flexList={flexList}
      />
    </>
  );
}
