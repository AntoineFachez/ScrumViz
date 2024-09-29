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
      // // index: i.toString(),
      component: widget?.widgetName,
      id: widget?.id,
      context: widget?.context,
      active: widget?.active,
      uiContext: widget?.uiContext,
      widgetContext: widget?.widgetContext,
      startUpWidgetLayout: widget?.startUpWidgetLayout,
      // startUpWidgetLayout: 'singleItem',
    };
  });
};

export const generateDOM = (appContext, widgetMap, styled) => {
  const storedLayout = getFromLS(appContext);

  let mapToRender =
    storedLayout && Object.keys(storedLayout).length > 0
      ? mergeLayouts(widgetMap, storedLayout)
      : widgetMap;

  return mapToRender?.map((widget, i) => {
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
            widget={widget}
            uiContext={widget?.uiContext}
            startUpWidgetLayout={widget?.startUpWidgetLayout}
            // startUpWidgetLayout={'singleItem'}
            widgetContext={widget?.widgetContext}
            generated={true} // contextSpaces={contextSpaces}
            // selectedWidget={selectedWidget}
            // dynamicComponent={dynamicComponent}
            // showPaneMenu={showPaneMenu}
            // menuSpace={menuSpace}
            viewerGridMap={widgetMap}
            // contextSpaces="top-left-top"
            selectedWidget={selectedWidget}
            dropWidgetName={widget.collection}
            setPassWidgetContext=""
            dynamicComponent={null}
            styled={styled}
          />
        </Box>
      );
    } else return null;
  });
};

export const handleOnLayoutChange = (
  layoutOnLayoutChange,
  currentLayout,
  setCurrentLayout,
  appContext,
  gridRef
) => {
  /*eslint no-console: 0*/
  // console.log('currentLayout', currentLayout);

  // const tempLayout = mergeLayouts(currentLayout, layoutOnLayoutChange);

  // saveToLS(appContext, currentLayout);
  setCurrentLayout(currentLayout);
  return currentLayout;
};
export const handleSetMapOnLayoutChange = (
  appContext,
  gridRef,
  defaultWidgetMap,
  setLayout
) => {
  const storedLayout = getFromLS(appContext);

  let layoutToUse =
    storedLayout && Object.keys(storedLayout).length > 0
      ? storedLayout
      : defaultWidgetMap;

  setLayout(generateLayout(layoutToUse, gridRef));
};

export const handleOnResize = (
  currentLayout,
  oldLayoutItem,
  layoutItem,
  placeholder,
  appContext,
  defaultWidgetMap
) => {
  // `oldLayoutItem` contains the state of the item before the resize.
  // You can modify `layoutItem` to enforce constraints.

  if (layoutItem.h < 2 && layoutItem.w > 2) {
    layoutItem.w = 3;
    layoutItem.h = 1;
    placeholder.w = 3;
    placeholder.h = 1;
  }

  if (layoutItem.h >= 1 && layoutItem.w < 2) {
    layoutItem.w = 3;
    layoutItem.h = 1;
    placeholder.w = 3;
    placeholder.h = 1;
  }
};
export const handleOnResizeStop = (
  currentLayout,
  appContext,
  defaultWidgetMap
) => {
  const storedLayout = getFromLS(appContext);
  const tempLayout1 = mergeLayouts(storedLayout, currentLayout);
  const tempLayout2 = mergeLayouts(defaultWidgetMap, tempLayout1);
  saveToLS(appContext, tempLayout2);
};
export const handleOnDragStop = (
  currentLayout,
  appContext,
  defaultWidgetMap
) => {
  const storedLayout = getFromLS(appContext);
  const tempLayout1 = mergeLayouts(storedLayout, currentLayout);
  const tempLayout2 = mergeLayouts(defaultWidgetMap, tempLayout1);
  saveToLS(appContext, tempLayout2);
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
  // console.log("defaultWidgetMap", uiGridMapContext);
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
  const mergedArray = [];

  // Iterate through the arrays using their indices
  for (let i = 0; i < Math.max(firstSet?.length, secondSet?.length); i++) {
    const firstObj = firstSet[i];
    const secondObj = secondSet[i];

    if (firstObj && secondObj) {
      // Merge the objects if both exist at the same index
      mergedArray.push({ ...firstObj, ...secondObj });
    } else if (firstObj) {
      // Include the first object if the second is missing
      mergedArray.push(firstObj);
    } else if (secondObj) {
      // Include the second object if the first is missing
      mergedArray.push(secondObj);
    }
  }

  return mergedArray;
}
export const updateWidgetContext = (widget, widgetProps, context) => {
  const storedLayout = getFromLS(widgetProps.appContext);
  // console.log('updateWidgetContext', widget, widgetProps, context);
  if (Object.keys(storedLayout).length) {
    console.log(storedLayout);

    const widgetIndex = storedLayout?.findIndex(
      (storedWidget) => storedWidget?.id === widget?.id
    );
    const temp = storedLayout[widgetIndex];
    const widgetToUpdate = {
      ...temp,
      startUpWidgetLayout: context,
    };

    if (widgetIndex !== -1) {
      // Replace the widget at the found index
      const updatedLayout = [
        ...storedLayout.slice(0, widgetIndex),
        widgetToUpdate, // Insert the updated widget
        ...storedLayout.slice(widgetIndex + 1),
      ];

      // console.log(widget, updatedLayout);
      saveToLS(widgetProps.appContext, updatedLayout);
    } else {
      console.warn('Widget not found in stored layout. Unable to update.');
    }
  }
};
