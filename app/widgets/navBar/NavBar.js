'use client';
import { useContext, useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Typography } from '@mui/material';

import UIContext from '@/context/UIContext';

import WidgetIndexTemplate from '../../uiItems/WidgetIndexTemplate';
import AppContext from '@/context/AppContext';
import { useMode } from '@/app/theme/ThemeContext';
import NavBarContext, { NavBarProvider } from './NavBarContext';
import SearchContext from '@/context/SearchContext';

import NavBar from '@/app/components/navBar/Index';

export default function NavBarWidget({
  widget,
  uiContext,
  startUpWidgetLayout,
  contextToolBar,
}) {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext, setAppContext, uiGridMapContext, setUiGridMapContext } =
    useContext(AppContext);
  const { showNavBarMenu, setShowNavBarMenu } = useContext(UIContext);
  const { setActiveSearchTerm } = useContext(SearchContext);

  const {} = useContext(NavBarContext);
  const [selectedWidgetContext, setSelectedWidgetContext] =
    useState(startUpWidgetLayout);
  const collection = '';
  const widgetProps = {
    appContext: appContext,
    hasWidgetMenu: true,
    hasQuickMenu: true,
    uiGridMapContext: uiGridMapContext,
    collection: collection,
    uiContext: uiContext,
    contextToolBar: contextToolBar,
    widgetContext: selectedWidgetContext,
    itemContext: '',
    dropWidgetName: collection,
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
    // selectedWidgetContext: selectedWidgetContext,
    // setSelectedWidgetContext: setSelectedWidgetContext,
    // handleSelectWidgetContext: handleSelectWidgetContext,
    // searchTerm: searchTerm,
    // handleSearchTermChange: (e) =>
    //   handleSearchTermChange(e, setSearchTerm, setActiveSearchTerm),
  };

  const newItem = (
    <Box
      className="widget"
      sx={{
        ...styled.widget,
        // backgroundColor: '#555',
      }}
    >
      NavBar New Item
    </Box>
  );
  const soloWidget = <NavBar />;

  return (
    <>
      <WidgetIndexTemplate
        widget={widget}
        widgetProps={widgetProps}
        // newItem={newItem}
        soloWidget={soloWidget}
      />
    </>
  );
}
