import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';

import UIContext from '@/context/UIContext';

import { props, draggableCancel, resizeHandle } from './gridProps';
import {
  generateDOM,
  handleSetMapOnLayoutChange,
  onLayoutChange,
  onResize,
} from './helperFunctions';

import './grid-styles.css';

const ReactGridLayout = WidthProvider(RGL);

const ScaledLayout = ({
  gridRef,
  userRole,
  appContext,
  domGridMap,
  className = 'gridLayout',
  cols = 36,
  styled,
}) => {
  const { latestGridValues, setLatestGridValues } = useContext(UIContext);
  const [rowHeight, setRowHeight] = useState();
  const [layout, setLayout] = useState();
  const [prevAppContext, setPrevAppContext] = useState();

  const [newDomGridMap, setNewDomGridMap] = useState(domGridMap);
  useEffect(() => {
    handleSetMapOnLayoutChange(
      appContext,
      gridRef,
      setNewDomGridMap,
      domGridMap,
      latestGridValues,
      layout,
      setLayout,
      prevAppContext,
      setPrevAppContext
    );
    return handleSetMapOnLayoutChange;
  }, [domGridMap, userRole, appContext]);

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
        layout={layout}
        // onDrag={(layout) => handleLayoutChange(layout, setGridDOMMap)}
        // onDrop={onDrop}
        // onLayoutChange={(layout) => handleLayoutChange(layout, setGridDOMMap)}
        onLayoutChange={(layout) => onLayoutChange(layout)}
        onResize={(layout, oldLayoutItem, layoutItem, placeholder) =>
          onResize(layout, oldLayoutItem, layoutItem, placeholder)
        }
        draggableCancel={draggableCancel}
        preventCollision={false}
        allowOverlap={false}
        autoSize={true}
        measureBeforeMount={false} //If `true`, `WidthProvider` will measure the container's width before mounting children.
        containerPadding={[10, 10]}
        margin={[10, 10]}
        useCSSTransforms={true}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        rowHeight={rowHeight}
        cols={cols}
      >
        {generateDOM(newDomGridMap, styled)}
      </ReactGridLayout>
    </Box>
  );
};

export default ScaledLayout;
