import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import RGL, { WidthProvider } from 'react-grid-layout';

import { props, draggableCancel } from './gridProps';
import {
  generateDOM,
  generateLayout,
  getFromLS,
  handleSetMapOnLayoutChange,
  handleOnLayoutChange,
  handleOnResize,
  handleOnResizeStop,
  saveToLS,
  handleOnDragStop,
} from './helperFunctions';

import './grid-styles.css';

const ReactGridLayout = WidthProvider(RGL);

const ScaledLayout = ({
  gridRef,
  userRole,
  appContext,
  defaultWidgetMap,
  gridDOMMap,
  setGridDOMMap,
  generateDOM,
  showDev,
  showPaneMenu,
  setShowPaneMenu,
  styled,
  className = 'gridLayout',
  cols = 36,
}) => {
  const [rowHeight, setRowHeight] = useState();
  const [currentLayout, setCurrentLayout] = useState();

  useEffect(() => {
    return handleSetMapOnLayoutChange(
      appContext,
      gridRef,
      defaultWidgetMap,
      // getFromLS(appContext),
      setCurrentLayout
    );
  }, [defaultWidgetMap, userRole, appContext]);

  useEffect(() => {
    const handleResize = () => {
      const parentHeight = gridRef?.current?.clientHeight;
      const desiredRowHeight = parentHeight / 32;
      setRowHeight(desiredRowHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const delayLayout = (layoutOnLayoutChange) => {
    const mergedLayout = handleOnLayoutChange(
      layoutOnLayoutChange,
      currentLayout,
      setCurrentLayout,
      appContext,
      gridRef
    );
    return mergedLayout;
  };

  return (
    <Box
      ref={gridRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ReactGridLayout
        {...props}
        className={className}
        layout={currentLayout}
        onLayoutChange={(layoutOnLayoutChange) =>
          delayLayout(layoutOnLayoutChange)
        }
        onDragStop={(currentLayout) =>
          handleOnDragStop(currentLayout, appContext, defaultWidgetMap)
        }
        onResize={(currentLayout, oldLayoutItem, layoutItem, placeholder) =>
          handleOnResize(currentLayout, oldLayoutItem, layoutItem, placeholder)
        }
        onResizeStop={(currentLayout) =>
          handleOnResizeStop(currentLayout, appContext, defaultWidgetMap)
        }
        draggableCancel={draggableCancel}
        preventCollision={false}
        allowOverlap={false}
        autoSize={true}
        measureBeforeMount={false}
        containerPadding={[10, 10]}
        margin={[10, 10]}
        useCSSTransforms={true}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        rowHeight={rowHeight}
        cols={cols}
      >
        {generateDOM(appContext, defaultWidgetMap, styled)}
      </ReactGridLayout>
    </Box>
  );
};

export default ScaledLayout;
