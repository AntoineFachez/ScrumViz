import React, { memo, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/context/AppContext';
// import DataContext from '../context/DataContext';
// import UIContext from '@/context/UIContext';

import Draggable from '../components/dragDrop/Index';
import NavBarButton from '../components/navBar/navBarButton/NavBarButton';
import { themeSettings } from '../theme/ThemeContext';

// import { styled } from "../themes/styled";

const WidgetIndexTemplate = ({
  widgetProps,
  menu,
  newItem,
  soloWidget,
  table,
  singleItem,
  chip,
  tree,
  flexList,
}) => {
  const { palette, styled } = themeSettings('dark');
  const { appContext } = useContext(AppContext);
  // const { dataContext } = useContext(DataContext);
  // const { navBarHeight, showNewItem, mainPaneHeight, setMainPaneHeight } =
  //   useContext(UIContext);
  const {
    collection,
    itemContext,
    dropWidgetName,
    selectedWidgetContext,
    orderedBy,
    // menu,
    // newItem,
    // soloWidget,
    // table,
    // singleItem,
    // chip,
    // tree,
    // flexList,
    horizontal,
    vertical,
    selector,
    drawer,
    card,
    media,
    inputField,
    contextToolBar,
    iconButton,
    onClick,
    uiContext,
    widgetContext,
    // styled,
  } = widgetProps;
  return (
    <>
      {contextToolBar === 'navBar' ? (
        <>
          <Draggable
            keyToPass={uuidv4()}
            // item={uiContext}
            item={widgetProps?.dropWidgetName}
            context="draggable"
            htmlItem={
              <NavBarButton
                appContext={appContext}
                // dataContext={dataContext}
                widgetProps={widgetProps}
                widgetContext={widgetContext}
                onClick={onClick}
                iconButton={iconButton}
                styled={styled}
              />
            }
            styled={styled}
          />{' '}
        </>
      ) : (
        <>
          {uiContext === 'home' ? (
            <>
              <Box className="widgetContainer" sx={styled?.widget}>
                {menu && (
                  <>
                    <Box
                      className="widgetMenuCollapse"
                      sx={styled?.widgetMenuCollapse}
                    >
                      {menu}
                    </Box>
                  </>
                )}
                {table}
                {soloWidget}
              </Box>
            </>
          ) : (
            <>
              <>
                <Box className="widgetContainer" sx={styled.widgetContainer}>
                  {menu && (
                    <Box className="widgetMenu" sx={styled?.widgetMenu}>
                      {menu}
                    </Box>
                  )}{' '}
                  {/* {uiContext === "horizontal" ? ( */}
                  {widgetContext === 'horizontal' ? (
                    <>{horizontal}</>
                  ) : widgetContext === 'vertical' ? (
                    <>{vertical}</>
                  ) : widgetContext === 'flexList' ? (
                    <>{flexList}</>
                  ) : widgetContext === 'card' ? (
                    <>{flexList}</>
                  ) : widgetContext === 'table' ? (
                    <>
                      {table}
                      {/* <Box sx={styled?.tableContainer}>{table}</Box> */}
                    </>
                  ) : widgetContext === 'chip' ? (
                    <>{chip}</>
                  ) : widgetContext === 'tree' ? (
                    <>{tree}</>
                  ) : widgetContext === 'singleItem' ? (
                    <>{singleItem}</>
                  ) : widgetContext === 'selector' ? (
                    <>{selector}</>
                  ) : widgetContext === 'drawer' ? (
                    <>{drawer}</>
                  ) : widgetContext === 'card' ? (
                    <>{card}</>
                  ) : widgetContext === 'media' ? (
                    <>{media}</>
                  ) : widgetContext === 'soloWidget' ? (
                    <>{soloWidget}</>
                  ) : widgetContext === 'newItem' ? (
                    <>{newItem}</>
                  ) : widgetContext === 'processFile' ? (
                    <>{newItem}</>
                  ) : widgetContext === 'inputField' ? (
                    <>{inputField}</>
                  ) : (
                    <>{soloWidget}</>
                  )}
                  {/* ) : null} */}
                  {/* </Box> */}
                </Box>
              </>
            </>
          )}{' '}
        </>
      )}
    </>
  );
};
export default WidgetIndexTemplate;
