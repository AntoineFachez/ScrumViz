import { Box } from '@mui/material';
import _ from 'lodash';
// import { styled } from "../../themes/styled";
import Space from './Space';

export const generateLayout = (widgetMap, gridRef) => {
  return widgetMap?.map((widget, i) => {
    const y = _.result({}, 'y') || Math.ceil(Math.random() * 4) + 1;
    return {
      x: widget?.x,
      y: widget?.y,
      w: widget?.w,
      h: widget?.h,
      i: i.toString(),
      component: widget?.widgetName,
      id: widget?.id,
      context: widget?.context,
      active: widget?.active,
      uiContext: widget?.uiContext,
      widgetContext: widget?.widgetContext,
    };
  });
};

export const generateDOM = (gridMap, styled) => {
  // console.log("gridMap", gridMap);
  return gridMap?.map((widget, i) => {
    const selectedWidget = widget?.widget;
    if (selectedWidget !== undefined) {
      return (
        <Box
          className="spaceWithDropZone"
          key={i}
          sx={{
            position: 'relative',
            display: 'flex',

            '& .react-grid': styled?.reactGrid,
            '& .react-grid-widget-placeholder': styled?.reactGridItem,
            '& .react-resizable-handle': styled?.resizeHandlesNESW,
            '& .react-resizable-handle-w': styled?.resizeHandlesNESW?.handleW,
            '& .react-resizable-handle-e': styled?.resizeHandlesNESW?.handleE,
          }}
          // onMouseEnter={(e) => console.log("mouseenter", e)}
        >
          <Space
            // uiContext={uiContext}
            uiContext={widget?.uiContext}
            startUpWidgetLayout={widget?.startUpWidgetLayout}
            widgetContext={widget?.widgetContext}
            generated={true} // contextSpaces={contextSpaces}
            // selectedWidget={selectedWidget}
            // dynamicComponent={dynamicComponent}
            // showPaneMenu={showPaneMenu}
            // menuSpace={menuSpace}
            viewerGridMap={gridMap}
            contextSpaces="top-left-top"
            selectedWidget={selectedWidget}
            // selectedWidgetName={selectedWidgetName}

            setPassWidgetContext=""
            dynamicComponent={null}
            styled={styled}
          />
        </Box>
      );
    } else return null;
  });
};
// export const onLayoutChange = (
//   activeGridLayout,
//   setActiveGridLayout,
//   setParentHeight,
//   gridRef,
// ) => {
//   // setActiveGridLayout(activeGridLayout);
//   //TODO ROW_HEIGHT
//   //* setParentHeight(gridRef?.current?.offsetHeight);
// };
// export const handleLayoutChange = (newLayout, setActiveGridLayout) => {
//   // setActiveGridLayout(generateLayout(newLayout));
//   // console.log("newLayout", newLayout);
//   //TODO ROW_HEIGHT
//   //* setRowHeight(height / 100);
//   //  onLayoutChange(newLayout, setActiveGridLayout);
// };
export const handleDeleteSpace = () => {};
// export const resetLayout = (viewerGridMap) => {
//   // generateLayout(viewerGridMap);
// };
//TODO:! not in use:
export const handleCloseSpace = (e, direction, activeSpaces) => {
  e.preventDefault();
  const tempSpaces = activeSpaces.filter((space) => {
    return (
      space?.spaceId === activeSpaces[0][0].props.children.props.data.spaceId
    );
  });
};
export function getFromLS(key) {
  // console.log("domGridMap", key);
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || newDomGridMap;
    } catch (e) {
      /*Ignore*/
    }
  }
  if (ls) {
    return ls;
  } else {
    return newDomGridMap;
  }
}
export function saveToLS(uiGridMapContext, newMapValues) {
  if (global.localStorage) {
    const stringifiedMap = JSON.stringify(newMapValues);
    global.localStorage.setItem(uiGridMapContext + 'UiContext', stringifiedMap);
  }
}
export const onLayoutChange = (
  appContext,
  gridRef,
  setNewDomGridMap,
  domGridMap,
  latestGridValues,
  layout,
  setLayout,
  prevAppContext,
  setPrevAppContext
) => {
  /*eslint no-console: 0*/

  if (latestGridValues) latestGridValues[prevAppContext + 'UiContext'] = layout;

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
  saveToLS(prevAppContext, layout);
};
export const handleSetMapOnLayoutChange = (
  appContext,
  gridRef,
  setNewDomGridMap,
  domGridMap,
  latestGridValues,
  layout,
  setLayout,
  prevAppContext,
  setPrevAppContext
) => {
  if (setNewDomGridMap)
    setNewDomGridMap(
      updateLayoutWithNewValues(
        appContext,
        gridRef,
        setNewDomGridMap,
        domGridMap,
        latestGridValues,
        layout,
        setLayout,
        prevAppContext,
        setPrevAppContext
      )
    );
};
export function updateLayoutWithNewValues(
  appContext,
  gridRef,
  setNewDomGridMap,
  domGridMap,
  latestGridValues,
  layout,
  setLayout,
  prevAppContext,
  setPrevAppContext
) {
  if (!latestGridValues) return domGridMap;

  // Map over the original readMap and update values based on latestGridValues
  const updatedReadMap = domGridMap?.map((item, i) => {
    const matchingValue = latestGridValues?.[
      prevAppContext + 'UiContext'
    ]?.find((value) => {
      return +value.i === i;
    }); // Find matching value by ID

    if (matchingValue) {
      // If a match is found, update the properties
      return {
        ...item, // Keep all other properties
        w: matchingValue.w,
        h: matchingValue.h,
        x: matchingValue.x,
        y: matchingValue.y,
      };
    } else {
      // If no match is found, return the original item unchanged
      return item;
    }
  });
  setLayout(generateLayout(updatedReadMap, gridRef));
  setPrevAppContext(appContext);
  return updatedReadMap; // Return the updated layout
}
export const onResize = (
  domContext,
  oldLayoutItem,
  layoutItem,
  placeholder
) => {
  // `oldLayoutItem` contains the state of the item before the resize.
  // You can modify `layoutItem` to enforce constraints.
  // console.log("triggered resize");
  if (layoutItem.h < 3 && layoutItem.w > 2) {
    layoutItem.w = 2;
    placeholder.w = 2;
  }

  if (layoutItem.h >= 3 && layoutItem.w < 2) {
    layoutItem.w = 2;
    placeholder.w = 2;
  }
};
