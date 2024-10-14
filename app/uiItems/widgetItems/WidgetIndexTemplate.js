import { Box, Button, Tooltip, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Draggable from '../../components/dragDrop/Index';
import NavBarButton from '../../components/navBar/navBarButton/NavBarButton';
import WidgetMenu from './WidgetMenu';
import QuickMenu from './QuickMenu';

import { themeSettings, useMode } from '../../theme/ThemeContext';
import SingleItem from './singleItem/SingleItem';
import MultiItems from './MultiItems';

const WidgetIndexTemplate = ({
  widgetProps,
  newItem,
  soloWidget,
  table,
  // singleItem,
  tree,
  flexList,
  vertical,
  inputField,
  horizontal,
  menu,
  isFiltered,
  onResetFiltered,
}) => {
  const [theme, colorMode, palette, styled] = useMode();

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
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'space-around',
                        }}
                      >
                        {widgetProps.collection}
                        <QuickMenu widgetProps={widgetProps} styled={styled} />
                      </Box>
                    </>
                  )}
                  {widgetProps.hasWidgetMenu && (
                    <WidgetMenu widgetProps={widgetProps} />
                  )}
                  {isFiltered && (
                    <Button
                      className="widgetMenuButton"
                      onClick={onResetFiltered}
                    >
                      Resetter
                    </Button>
                  )}
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
