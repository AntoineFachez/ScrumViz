'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { AddToQueue, BackupOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';
import SearchContext from '@/context/SearchContext';
import TimeStampsContext from './TimeStampsContext';

import WidgetIndexTemplate from '../../uiItems/widgetItems/WidgetIndexTemplate';
import { useMode } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SingleItem from '@/app/uiItems/widgetItems/singleItem/SingleItem';
import MultiItems from '@/app/uiItems/widgetItems/MultiItems';
import { singleItemScheme } from './dataScheme';

import { handleSelectWidgetContext, handleSetItemInFocus } from '../actions';
import WidgetMenu from '@/app/uiItems/widgetItems/WidgetMenu';
import ScrumManagerContext from '@/app/scrumManager/ScrumManagerContext';
import InFocusContext from '@/context/InFocusContext';

export default function TimeStamps({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showBackLogItemMenu, setShowBackLogItemMenu } = useContext(UIContext);
  const { setLatestItemInFocus } = useContext(InFocusContext);
  const { setActiveSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const handleSetTimeStampInFocus = (item) => {
    handleSetItemInFocus(setTimeStampInFocus, item, setLatestItemInFocus);

    // setActiveSearchTerm(userStory?.universityName);
    // setLastInFocusItem({
    //   context: widgetProps?.itemContext,
    //   item: universityInFocus,
    // });
  };
  const {
    showWidgetUIMenu,
    setShowWidgetUIMenu,
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
    widget: widget,
    appContext: appContext,
    uiContext: uiContext,
    uiGridMapContext: uiGridMapContext,
    setUiGridMapContext: setUiGridMapContext,
    widgetContext: selectedWidgetContext,
    contextToolBar: contextToolBar,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    itemContext: '',
    collection: collection,
    handleSetItemInFocus: handleSetTimeStampInFocus,
    data: displayTimeStamps,
    selectedData: selectedTimeStamps,
    setSelectedItem: setSelectedTimeStamps,
    selector: {
      selector: 'timeStampSelector',
      selected: 'selectedTimeStamps}',
    },
    singleItemScheme: singleItemScheme,
    dropWidgetName: collection,
    orderedBy: '',
    itemInFocus: timeStampInFocus,
    orderedBy: '',
    onClick: () => {
      setUiGridMapContext(collection);
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
    selectedWidgetContext: selectedWidgetContext,
    setSelectedWidgetContext: setSelectedWidgetContext,
    handleSelectWidgetContext: handleSelectWidgetContext,
    searchTerm: searchTerm,
    handleSearchTermChange: (e) =>
      handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  const handleSearchTermChange = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
    setIsFiltered(true);
  };

  const handleResetFiltered = () => {
    setSelectedUserStories(displayUserStories);
    setIsFiltered(false);
  };
  const CardSubHeaderElement = (data) => (
    <Typography
      onClick={() => handleSetTimeStampInFocus(data)}
      sx={styled?.textBody}
      variant={styled?.textBody?.variant}
    ></Typography>
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
  // const singleItem = (
  //   <SingleItem
  //     singleItemScheme={singleItemScheme}
  //     itemContext={widgetProps?.itemContext}
  //     itemInFocus={timeStampInFocus}
  //     styled={styled}
  //   />
  // );
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
        itemContext={widgetProps?.itemContext}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={widgetProps?.handleSetItemInFocus}
        customElement={null}
        alertElement={null}
        data={widgetProps?.data}
        selectedData={widgetProps?.selectedData}
        setSelectedItem={widgetProps?.setSelectedItem}
        selector={widgetProps?.selector}
        itemInFocus={widgetProps?.itemInFocus}
        styled={styled}
      />
    </Box>
  );

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        newItem={newItem}
        soloWidget={soloWidget}
        table={table}
        // singleItem={singleItem}
        chip={chip}
        tree={tree}
        // flexList={flexList}
        isFiltered={isFiltered}
        onResetFiltered={handleResetFiltered}
      />
    </>
  );
}
