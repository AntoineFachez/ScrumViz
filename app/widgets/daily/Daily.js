'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { DateRange, StoreMallDirectoryOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import SearchContext from '@/context/SearchContext';
import DailiesContext from './DailiesContext';
import { singleItemScheme } from './dataScheme';
import MultiItems from '@/app/pages/MultiItems';
import SingleItem from '@/app/pages/SingleItem';

export default function Daily({
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
  const {
    displayDailies,
    setDisplayDailies,
    selectedDailies,
    setSelectedDailies,
    dailiesInFocus,
    setDailiesInFocus,
    searchTerm,
    setSearchTerm,
  } = useContext(DailiesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = 'dailies';
  const widgetProps = {
    iconButton: <DateRange />,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: '',
    orderedBy: '',

    onClick: () => {
      // window.location.href = `/userStory`;
      setAppContext(collection);
      return;
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

  const handleSetDailiesInFocus = (dailies) => {
    setDailiesInFocus(dailies);

    // setActiveSearchTerm(userStory?.universityName);
    // setLastInFocusItem({
    //   context: widgetProps?.itemContext,
    //   item: universityInFocus,
    // });
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
  const CardSubHeaderElement = (data) => (
    <Typography
      onClick={() => handleSetDailiesInFocus(data)}
      sx={styled?.textBody}
      variant={styled?.textBody?.variant}
    ></Typography>
  );
  const menu = (
    <Menu
      widgetProps={widgetProps}
      handleSelectWidgetContext={handleSelectWidgetContext}
      handleSearchTermChange={handleSearchTermChange}
      searchTerm={searchTerm}
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
      Daily New Item
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
      Daily SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={dailiesInFocus}
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
      Daily Chip
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
      Daily Tree
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
      {/* UserStory MultiItems */}
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        data={selectedDailies}
        selectedData={selectedDailies}
        setSelectedItem={setSelectedDailies}
        selector={{
          selector: 'dailiesSelector',
          selected: 'selectedDailies',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={dailiesInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetDailiesInFocus}
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
