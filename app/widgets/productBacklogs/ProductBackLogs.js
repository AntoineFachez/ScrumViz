'use client';
import { useContext, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import { AddToQueue, BackupOutlined } from '@mui/icons-material';
import AppContext from '@/context/AppContext';
import { themeSettings } from '@/app/theme/ThemeContext';
import StandInTable from '@/app/components/table/StandInTable';
import BackLogsContext from './ProductBackLogsContext';
import SingleItem from '@/app/pages/SingleItem';
import MultiItems from '@/app/pages/MultiItems';
import SearchContext from '@/context/SearchContext';
import { singleItemScheme } from './dataScheme';
import UserStoriesContext from '../userStories/UserStoriesContext';

export default function Products({
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
  const [searchTerm, setSearchTerm] = useState('');

  const { displayUserStories, setSelectedUserStories } =
    useContext(UserStoriesContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);

  const {
    displayProductBackLogs,
    setDisplayProductBackLogs,
    selectedProductBackLogs,
    setSelectedProductBackLogs,
    productBackLogInFocus,
    setProductBackLogInFocus,
  } = useContext(BackLogsContext);
  const collection = 'productBackLogs';
  const widgetProps = {
    iconButton: <AddToQueue />,
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
  const handleSetBackLogInFocus = (backLog) => {
    setProductBackLogInFocus(backLog);
    const found = displayUserStories.filter(
      (story) => story.productBacklog_id === backLog.id
    );
    setSelectedUserStories(found);
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
      onClick={() => handleSetBackLogInFocus(data)}
      sx={styled?.textBody}
      variant={styled?.textBody?.variant}
    ></Typography>
  );
  const menu = (
    <>
      <Menu
        widgetProps={widgetProps}
        handleSelectWidgetContext={handleSelectWidgetContext}
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
        // handleSearch={handleSearch}
        // handleFilterEntities={handleFilterEntities}
        // loading={loading}
        // getAllentitiesTypes={getAllentitiesTypes}
        // handlePaste={handlePaste}
        // handleSubmit={handleSubmit}
        //   styled={styled}
      />
    </>
  );
  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      BackLogItems New Item
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
      BackLogItems SoloWidget
    </Box>
  );
  const singleItem = (
    <SingleItem
      singleItemScheme={singleItemScheme}
      itemContext={widgetProps?.itemContext}
      itemInFocus={productBackLogInFocus}
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
      <MultiItems
        uiContext={uiContext}
        singleItemScheme={singleItemScheme}
        selectedWidgetContext={selectedWidgetContext}
        data={selectedProductBackLogs.filter((product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        selectedData={selectedProductBackLogs}
        setSelectedItem={setSelectedProductBackLogs}
        selector={{
          selector: 'productBackLogsSelector',
          selected: 'selectedProductBackLog',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={productBackLogInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetBackLogInFocus}
        customElement={null}
        alertElement={null}
        cardSubHeaderElement={CardSubHeaderElement}
        styled={styled}
      />
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
      BackLogItems Tree
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
        data={selectedProductBackLogs.filter((product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        selectedData={selectedProductBackLogs}
        setSelectedItem={setSelectedProductBackLogs}
        selector={{
          selector: 'productBackLogsSelector',
          selected: 'selectedProductBackLog',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={productBackLogInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetBackLogInFocus}
        customElement={null}
        alertElement={null}
        cardSubHeaderElement={CardSubHeaderElement}
        styled={styled}
      />
    </Box>
  );

  return (
    <>
      {' '}
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
