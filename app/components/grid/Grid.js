import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import RGL, { WidthProvider } from 'react-grid-layout';
import { debounce } from 'lodash'; // Or use your preferred debounce implementation

import { props, draggableCancel } from './gridProps';
import {
  generateDOM,
  handleSetMapOnLayoutChange,
  handleOnLayoutChange,
  handleOnResize,
  handleOnResizeStop,
  handleOnDragStop,
} from './helperFunctions';

import './grid-styles.css';

const ReactGridLayout = WidthProvider(RGL);

const ScaledLayout = ({
  appContext,
  // gridRef,
  uiGridMapContext,
  defaultWidgetMap,
  className = 'gridLayout',
  cols = 36,
  styled,
}) => {
  const gridRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(50);
  const [currentLayout, setCurrentLayout] = useState();

  useEffect(() => {
    return handleSetMapOnLayoutChange(
      uiGridMapContext,
      gridRef,
      defaultWidgetMap,
      setCurrentLayout
    );
  }, [appContext, defaultWidgetMap, gridRef, uiGridMapContext]);

  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     const parentHeight = gridRef?.current?.clientHeight;
  //     const desiredRowHeight = parentHeight / 32;
  //     setRowHeight(desiredRowHeight);
  //   }, 100); // Adjust the delay (100ms here) as needed

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const delayLayout = (layoutOnLayoutChange) => {
    const mergedLayout = handleOnLayoutChange(
      layoutOnLayoutChange,
      currentLayout,
      setCurrentLayout,
      uiGridMapContext,
      gridRef,
      defaultWidgetMap
    );
    return mergedLayout;
  };

  return (
    <Box
      ref={gridRef}
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        // overflow: "visible",
        // display: "flex",
        // justifyContent: "space-between",
        // margin: '0 0.4rem 0 0.4rem',
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
          handleOnDragStop(currentLayout, uiGridMapContext, defaultWidgetMap)
        }
        onResize={(currentLayout, oldLayoutItem, layoutItem, placeholder) =>
          handleOnResize(currentLayout, oldLayoutItem, layoutItem, placeholder)
        }
        onResizeStop={(currentLayout) =>
          handleOnResizeStop(currentLayout, uiGridMapContext, defaultWidgetMap)
        }
        draggableCancel={draggableCancel}
        preventCollision={false}
        allowOverlap={false}
        autoSize={true}
        measureBeforeMount={false}
        containerPadding={[5, 5]}
        margin={[5, 5]}
        useCSSTransforms={true}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        rowHeight={rowHeight}
        cols={cols}
      >
        {generateDOM(uiGridMapContext, defaultWidgetMap, styled)}
      </ReactGridLayout>
    </Box>
  );
};

export default ScaledLayout;
