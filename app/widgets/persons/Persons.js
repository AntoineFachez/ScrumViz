'use client';
import { useContext, useState } from 'react';
import { Group, StoreMallDirectoryOutlined } from '@mui/icons-material';

import { Box } from '@mui/material';

import { themeSettings } from '@/app/theme/ThemeContext';
import AppContext from '@/context/AppContext';
import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../pages/WidgetIndexTemplate';
import Menu from './Menu';
import StandInTable from '@/app/components/table/StandInTable';

export default function Persons({
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
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
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
  const collection = 'persons';
  const widgetProps = {
    iconButton: <Group />,
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
      // window.location.href = `/teamMembers`;
      setAppContext(collection);
      return;
    },
  };
  const handleSearchTermChange = (e) => {
    e.preventDefault();
    // setResetData();
    console.log(e.target.value);

    setSearchTerm(e.target.value);
    setActiveSearchTerm(e.target.value);
  };
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
      UserStory New Item
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
      TeamMembers SoloWidget
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
      TeamMembers SingleItem
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
      TeamMembers Chip
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
      TeamMembers Tree
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
      TeamMembers
      {/* <MultiItems
        uiContext={uiContext}
        selectedWidgetContext={selectedWidgetContext}
        data={displayUserStories}
        selectedData={selectedUserStories}
        setSelectedItem={setSelectedUserStories}
        selector={{
          selector: 'userStorySelector',
          selected: 'selectedUserStories',
        }}
        itemContext={widgetProps?.itemContext}
        itemInFocus={userStoryInFocus}
        setActiveSearchTerm={setActiveSearchTerm}
        handleSetItemInFocus={handleSetUserStoryInFocus}
        customElement={null}
        alertElement={null}
        cardSubHeaderElement={CardSubHeaderElement}
        styled={styled}
      /> */}
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
