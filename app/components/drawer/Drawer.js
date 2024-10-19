import { useorientationDrawer, Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { ArrowBack, ViewSidebar } from '@mui/icons-material';

export default function TemporaryDrawer({
  // showDrawer,
  // setShowDrawer,
  // orientationDrawer,
  // setOrientationDrawer,
  // buttonOpen,
  // selectedWidgetContext,
  // setSelectedWidgetContext,
  handleToggleDrawer,
  orientationDrawer,
  // setOrientationDrawer,
  drawerMenu,
  handleGoBack,
  // list,
  drawerFloorElement,
  styled,
}) {
  const list = (anchor) => {
    // setOrientationDrawer({ ...orientationDrawer, [anchor]: true });
    return (
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 'auto',
          height: '100%',
          overflowY: 'auto',
        }}
        role="presentation"
      >
        {/* <Divider /> */}
        {drawerFloorElement}
        {/* <Divider /> */}
      </Box>
    );
  };
  // useEffect(() => {
  //   if (selectedWidgetContext === "drawer") {
  //     // toggleDrawer("left", true);
  //   }
  //   console.log(
  //     "selectedWidgetContext",
  //     selectedWidgetContext,
  //     orientationDrawer,
  //   );
  //   return () => {};
  // }, [selectedWidgetContext]);

  return (
    <>
      {['right'].map((anchor, i) => {
        return (
          <>
            {/* <IconButton
              onClick={
                // () => {
                //   toggleDrawer("left", true);
                //   return toggleDrawer("left", true);
                // }
                handleToggleDrawer('left', true)
              }
              sx={styled?.iconButton?.action}
              // sx={
              //   selectedWidgetContext === 'drawer'
              //     ? styled?.iconButton?.active
              //     : styled?.iconButton?.inactive
              // }
            >
              <ViewSidebar />
            </IconButton> */}
            <Drawer
              anchor={anchor}
              open={orientationDrawer[anchor]}
              onClose={handleToggleDrawer(anchor, false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: anchor === 'left' ? 'fit-content' : 'fit-content',
                  marginTop: '3rem',
                  paddingBottom: '3rem',
                  height: '100%',
                  // bottom: 0,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  overflowY: 'hidden',
                },
              }}
            >
              {drawerMenu}
              {list(anchor)}
            </Drawer>
          </>
        );
      })}
    </>
  );
}
