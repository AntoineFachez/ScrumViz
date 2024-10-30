import { Box, Button, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Draggable from '../../components/dragDrop/Index';
import NavBarButton from '../../components/navBar/navBarButton/NavBarButton';
import WidgetMenu from './WidgetMenu';
import QuickMenu from './QuickMenu';

import { themeSettings, useMode } from '../../theme/ThemeContext';
import SingleItem from './singleItem/SingleItem';
import MultiItems from './MultiItems';
import SimpleDialog from '@/app/components/dialog/Dialog';
import NewItem from '../newItem/NewItem';
import StandInTable from '@/app/components/table/StandInTable';
import DrawerCreateNewItem from '../newItem/DrawerCreateNewItem';
import DrawerChat from '../newItem/DrawerChat';
import TemporaryDrawer from '@/app/components/drawer/Index';
import { useContext } from 'react';
import UIContext from '@/context/UIContext';

const WidgetIndexTemplate = ({
  widgetProps,
  // newItem,
  soloWidget,
  // table,
  // singleItem,
  tree,
  // multiItems,
  vertical,
  inputField,
  horizontal,
  menu,
  isFiltered,
  onResetFiltered,
}) => {
  const [theme, colorMode, palette, styled] = useMode();
  const {
    showDialog,
    setShowDialog,
    handleToggleDrawer,
    drawerMenu,
    drawerFloorElement,
    handleGoBack,
    orientationDrawer,
    setOrientationDrawer,
  } = useContext(UIContext);
  const {
    uiGridMapContext,
    collection,
    dropWidgetName,
    selector,
    drawer,
    card,
    media,
    contextToolBar,
    iconButton,
    onClick,
    uiContext,
    widgetContext,
  } = widgetProps;

  const multiItems = <MultiItems widgetProps={widgetProps} styled={styled} />;
  const singleItem = <SingleItem widgetProps={widgetProps} styled={styled} />;
  const newItem = (
    <NewItem
      widgetProps={widgetProps}
      styled={styled}
      handleOnChangeAdoptPrompt={null}
    />
  );
  console.log(widgetProps.collection);

  const newItemDialogue = (
    <>
      {/* <DrawerCreateNewItem
        widgetProps={{
          ...widgetProps,
          dialogCustomComponent: (
            <Box sx={{ display: 'flex', flexFlow: 'row' }} className="widget">
              <Box sx={{ width: '30%', maxWidth: '25ch' }}>{multiItems}</Box>
              {newItem}
            </Box>
          ),
        }}
      /> */}
      <SimpleDialog
        widgetProps={{
          ...widgetProps,
          dialogCustomComponent: (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'row',
                backgroundColor: 'black',
              }}
              className="widget"
            >
              <Box sx={{ width: '30%', maxWidth: '25ch' }}>{multiItems}</Box>
              {newItem} <DrawerChat />
            </Box>
          ),
        }}
      />{' '}
      {/* <SimpleDialog
        drawerMenu={drawerMenu}
        drawerFloorElement={newItem}
        handleToggleDrawer={handleToggleDrawer}
        orientationDrawer={orientationDrawer}
        styled={styled}
      />{' '} */}
      {/* <TemporaryDrawer
        // drawerMenu={drawerMenu}
        // handleGoBack={handleGoBack}
        drawerFloorElement={newItem}
        styled={styled}
      /> */}
    </>
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
              // item={widgetProps?.widget}
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
              {/* <Box className="widgetContainer" sx={styled?.widget}>
                {widgetProps.hasWidgetMenu && (
                  <WidgetMenu widgetProps={widgetProps} />
                )}
                {table}
                {soloWidget}
              </Box> */}
            </>
          ) : (
            <>
              <>
                <Box className="widgetContainer" sx={styled.widgetContainer}>
                  {widgetProps.hasQuickMenu && (
                    <>
                      {/* <Box className="quickMenu" sx={styled.quickMenu}> */}
                      <QuickMenu widgetProps={widgetProps} styled={styled} />
                      {/* </Box> */}
                    </>
                  )}
                  {widgetProps.hasWidgetMenu && (
                    <WidgetMenu widgetProps={widgetProps} />
                  )}
                  {/* <Typography
                    sx={{ paddingLeft: '2rem', backgroundColor: 'black' }}
                  >
                    {widgetProps.collection}
                  </Typography> */}
                  {newItemDialogue}
                  {isFiltered && (
                    <Button
                      className="widgetMenuButton"
                      onClick={onResetFiltered}
                    >
                      Resetter
                    </Button>
                  )}{' '}
                  {widgetContext === 'horizontal' ? (
                    <>{horizontal}</>
                  ) : widgetContext === 'vertical' ? (
                    <>{vertical}</>
                  ) : widgetContext === 'flexList' ? (
                    <>{multiItems}</>
                  ) : widgetContext === 'card' ? (
                    <>{multiItems}</>
                  ) : widgetContext === 'table' ? (
                    <>{table}</>
                  ) : widgetContext === 'chip' ? (
                    <>{multiItems}</>
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
