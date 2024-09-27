import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import RGL, { WidthProvider } from 'react-grid-layout';

import { props, draggableCancel } from './gridProps';
import {
  generateDOM,
  generateLayout,
  getFromLS,
  handleOnDragStop,
  handleSetMapOnLayoutChange,
  onLayoutChange,
  onResize,
  saveToLS,
} from './helperFunctions';

import './grid-styles.css';

const ReactGridLayout = WidthProvider(RGL);

const ScaledLayout = ({
  gridRef,
  userRole,
  appContext,
  defaultGridMap,
  className = 'gridLayout',
  cols = 36,
  styled,
}) => {
  const [rowHeight, setRowHeight] = useState();
  const [currentLayout, setCurrentLayout] = useState();
  const [prevAppContext, setPrevAppContext] = useState(null);

  useEffect(() => {
    return handleSetMapOnLayoutChange(
      appContext,
      gridRef,
      defaultGridMap,
      // getFromLS(appContext),
      setCurrentLayout
    );
  }, [defaultGridMap, userRole, appContext]);

  useEffect(() => {
    const handleResize = () => {
      const parentHeight = gridRef?.current?.clientHeight;
      const desiredRowHeight = parentHeight / 36;
      setRowHeight(desiredRowHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const delayLayout = (layoutOnLayoutChange) => {
    const mergedLayout = onLayoutChange(
      layoutOnLayoutChange,
      currentLayout,
      setCurrentLayout,
      appContext,
      gridRef
    );
    return mergedLayout;
  };
  useEffect(() => {
    return () => {};
  }, [currentLayout]);

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
        onDragStop={handleOnDragStop}
        onResize={(currentLayout, oldLayoutItem, layoutItem, placeholder) => {
          onResize(
            currentLayout,
            oldLayoutItem,
            layoutItem,
            placeholder,
            appContext,
            currentLayout
          );
        }}
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
        {generateDOM(defaultGridMap, styled)}
      </ReactGridLayout>
    </Box>
  );
};

export default ScaledLayout;
