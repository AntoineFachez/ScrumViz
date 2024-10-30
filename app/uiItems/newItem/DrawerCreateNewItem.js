'use client';
import React, { useContext, useEffect } from 'react';
import { ArrowBack, Close, Menu } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';

import UIContext from '@/context/UIContext';

import QuickMenu from '../widgetItems/QuickMenu';
import DrawerChat from './DrawerChat';
// import DrawerNewItem from './DrawerNewItem';

import { useMode } from '../../theme/ThemeContext';
import DrawerNewItem from './DrawerNewItem';
import TemporaryDrawer from '@/app/components/drawer/Index';

export default function DrawerCreateNewItem({}) {
  const {
    drawerMenu,
    setDrawerMenu,
    drawerFloorElement,
    setDrawerFloorElement,
    handleGoBack,
    orientationDrawer,
    handleToggleDrawer,
  } = useContext(UIContext);

  const [theme, colorMode, palette, styled] = useMode();

  const drawerMenuProps = {
    quickMenuButtonArray: [
      {
        tooltip_title: 'Create new User Story',
        onClickHandler: handleToggleDrawer('right', false),
        icon: <Menu />,
      },
      {
        tooltip_title: 'Create new User Story',
        onClickHandler: () => handleGoBack(''),
        icon: <ArrowBack />,
      },
    ],
  };

  // const dialogCustomComponent = (
  //   <Box
  //     className="drawer-content-container"
  //     sx={{
  //       ...styled.widget,
  //       width: '100%',
  //       height: '100%',
  //       display: 'flex',
  //       flexFlow: 'row',
  //     }}
  //   >
  //     {' '}
  //     <Box
  //       className="newItem"
  //       sx={{
  //         width: '60ch',
  //         height: '100%',
  //         display: 'flex',
  //         flexFlow: 'column',
  //       }}
  //     >
  //       {newItem}
  //       {/* <DrawerNewItem widgetProps={widgetProps} /> */}
  //     </Box>
  //     <DrawerChat />
  //   </Box>
  // );

  useEffect(() => {
    setDrawerMenu(
      <QuickMenu
        widgetProps={drawerMenuProps}
        styled={{
          ...styled,

          ...styled.spacesMenu, // Spread the existing spacesMenu styles
          justifyContent: 'flex-start', // Override justifyContent
          // },
        }}
      />
    );
    setDrawerFloorElement(
      <Box
        className="drawer-content-container"
        sx={{
          ...styled.widget,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'row',
        }}
      >
        {' '}
        <Box
          className="newItem"
          sx={{
            width: '60ch',
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <DrawerNewItem />
        </Box>
        <DrawerChat />
      </Box>
    );
    return () => {};
  }, [orientationDrawer]);
  return (
    <TemporaryDrawer
      drawerMenu={drawerMenu}
      handleGoBack={handleGoBack}
      drawerFloorElement={drawerFloorElement}
      styled={styled}
    />
  );
}
