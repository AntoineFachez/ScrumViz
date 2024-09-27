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

export const onLayoutChange = (
  layoutOnLayoutChange,
  currentLayout,
  setCurrentLayout,
  appContext,
  gridRef
) => {
  /*eslint no-console: 0*/

  const tempLayout = mergeLayouts(layoutOnLayoutChange, currentLayout);

  // saveToLS(appContext, currentLayout);
  setCurrentLayout(tempLayout);
  return tempLayout;
};
export const handleSetMapOnLayoutChange = (
  appContext,
  gridRef,
  defaultGridMap,
  setLayout
) => {
  const storedLayout = getFromLS(appContext);

  let layoutToUse =
    storedLayout && Object.keys(storedLayout).length > 0
      ? storedLayout
      : defaultGridMap;

  setLayout(generateLayout(layoutToUse, gridRef));
};

export const onResize = (
  domContext,
  oldLayoutItem,
  layoutItem,
  placeholder,
  appContext,
  currentLayout
) => {
  // console.log('triggered onResize');

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
  saveToLS(appContext, currentLayout);
};
export const handleOnDragStop = (currentLayout) => {
  console.log('dragStopped', currentLayout);
  saveToLS(appContext, currentLayout);
};
//TODO:! not in use:
export const handleCloseSpace = (e, direction, activeSpaces) => {
  e.preventDefault();
  const tempSpaces = activeSpaces.filter((space) => {
    return (
      space?.spaceId === activeSpaces[0][0].props.children.props.data.spaceId
    );
  });
};
export function getFromLS(uiGridMapContext) {
  // console.log("defaultGridMap", uiGridMapContext);
  let ls = {};
  if (global.localStorage) {
    try {
      ls =
        JSON.parse(
          global.localStorage.getItem('UI Grid ' + uiGridMapContext)
        ) || newdefaultGridMap;
    } catch (e) {
      /*Ignore*/
    }
  }
  if (ls) {
    return ls;
  } else {
    return newdefaultGridMap;
  }
}
export function saveToLS(uiGridMapContext, newMapValues) {
  // console.log('uiGridMapContext', uiGridMapContext, newMapValues);

  if (global.localStorage) {
    const stringifiedMap = JSON.stringify(newMapValues);
    global.localStorage.setItem('UI Grid ' + uiGridMapContext, stringifiedMap);
  }
}
function mergeLayouts(firstSet, secondSet) {
  const mergedObjects = {};

  // Iterate through the first set
  firstSet?.forEach((obj) => {
    const iValue = obj.i;

    // Find the matching object in the second set
    const matchingObj = secondSet.find((o) => o.i === iValue);

    if (matchingObj) {
      // Merge the objects if a match is found
      mergedObjects[iValue] = { ...obj, ...matchingObj };
    } else {
      // Store the original object if no match is found
      mergedObjects[iValue] = obj;
    }
  });

  // Iterate through the second set to add any remaining objects
  secondSet?.forEach((obj) => {
    const iValue = obj.i;
    if (!mergedObjects[iValue]) {
      mergedObjects[iValue] = obj;
    }
  });

  // Convert the dictionary to an array
  return Object.values(mergedObjects);
}
