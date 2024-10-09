import React, { memo, useContext, useEffect } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/context/AppContext';
// import DataContext from '../context/DataContext';
import UIContext from '@/context/UIContext';

import Draggable from '../components/dragDrop/Index';
import NavBarButton from '../components/navBar/navBarButton/NavBarButton';
import { themeSettings, useMode } from '../theme/ThemeContext';
import ToolTipComponent from '../components/tooltip/ToolTipComponent';
import SimpleDialog from '../components/dialog/Dialog';
import WidgetMenu from './WidgetMenu';

// import { styled } from "../themes/styled";

const WidgetIndexTemplate = ({
  widget,
  widgetProps,
  quickMenu,
  menu,
  newItem,
  soloWidget,
  table,
  singleItem,
  chip,
  tree,
  flexList,
  vertical,
  inputField,
  horizontal,
  isFiltered,
  onResetFiltered,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const { appContext } = useContext(AppContext);
  // const { dataContext } = useContext(DataContext);

  const { showDialog, setShowDialog, handleCloseDialog } =
    useContext(UIContext);
  const {
    uiGridMapContext,
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
    selector,
    drawer,
    card,
    media,

    contextToolBar,
    iconButton,
    onClick,
    uiContext,
    widgetContext,
    dialogTitle,
    // styled,
  } = widgetProps;
  return (
    <>
      {contextToolBar === 'navBar' ? (
        <>
          <Tooltip title={collection} placement="bottom" arrow={true}>
            {' '}
            <Draggable
              keyToPass={uuidv4()}
              // item={uiContext}
              item={widgetProps?.dropWidgetName}
              context="draggable"
              htmlItem={
                <NavBarButton
                  uiGridMapContext={uiGridMapContext}
                  // dataContext={dataContext}
                  widgetProps={widgetProps}
                  dropWidgetName={dropWidgetName}
                  onClick={onClick}
                  iconButton={iconButton}
                  styled={styled}
                />
              }
              styled={styled}
            />{' '}
          </Tooltip>{' '}
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
                  {quickMenu}
                  <WidgetMenu widgetProps={widgetProps} />
                  {/* {menu && (
                    <Box className="widgetMenu" sx={styled?.widgetMenu}>
                      {menu}
                    </Box>
                  )}{' '} */}
                  {isFiltered && (
                    <Button
                      className="widgetMenuButton"
                      onClick={onResetFiltered}
                    >
                      Resetter
                    </Button>
                  )}
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
                    <>{flexList}</>
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
