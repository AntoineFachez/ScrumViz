import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Draggable from '../../components/dragDrop/Index';
import DropZone from '../../components/dragDrop/Index';

// import { handleDropWidgetIntoSpace } from "./helperFunctions";

export default function Space({
  generated,
  uiContext,
  startUpWidgetLayout,
  widgetContext,
  contextSpaces,
  viewerGridMap,
  selectedWidget,
  selectedWidgetName,
  showPaneMenu,
  menuSpace,
  dynamicComponent,
  styled,
}) {
  const [droppedWidgetName, setDroppedWidgetName] =
    useState(selectedWidgetName);
  const [passWidgetContext, setPassWidgetContext] =
    useState(startUpWidgetLayout);
  const SelectedWidget = selectedWidget;
  const [droppedWidget, setDroppedWidget] = useState(
    <SelectedWidget
      uiContext={uiContext}
      widgetContext={widgetContext}
      generated={generated}
      startUpWidgetLayout={passWidgetContext}
      contextSpaces={contextSpaces}
      setPassWidgetContext={setPassWidgetContext}
      dynamicComponent={dynamicComponent}
      styled={styled}
    />
  );
  const handleDropWidgetIntoSpace = (droppedItemName) => {
    // console.log(
    //   "droppedWidget",
    //   droppedItemName,
    //   setDroppedWidget,
    //   viewerGridMap,
    // );
    const tempWidget = viewerGridMap?.filter((item) => {
      return JSON.stringify(item?.widgetName) === droppedItemName;
    });
    const TempWidget = tempWidget[0]?.widget;
    if (TempWidget)
      setDroppedWidget(
        <TempWidget
          uiContext={uiContext}
          widgetContext={widgetContext}
          generated={generated}
          startUpWidgetLayout={passWidgetContext}
          contextSpaces={contextSpaces}
          setPassWidgetContext={setPassWidgetContext}
          dynamicComponent={dynamicComponent}
          styled={styled}
        />
      );
  };
  //   const handleDropWidgetIntoSpace = (droppedItemsArray) => {
  //     const tempWidget = widgetsArray?.filter((item) => {
  // return JSON.stringify(item.componentName) === droppedItemsArray;
  //     });
  //     setDroppedWidgetName(tempWidget[0]?.component);
  //   };
  // console.log("startUpWidgetLayout", startUpWidgetLayout);
  useEffect(() => {
    setDroppedWidget(
      <SelectedWidget
        uiContext={uiContext}
        widgetContext={widgetContext}
        generated={generated}
        startUpWidgetLayout={startUpWidgetLayout}
        contextSpaces={contextSpaces}
        setPassWidgetContext={setPassWidgetContext}
        dynamicComponent={dynamicComponent}
        styled={styled}
      />
    );

    return () => {};
  }, [startUpWidgetLayout]);

  return (
    <>
      {/* <Box className="spaceWithDropZone" sx={styled?.widget}> */}
      {/* {startUpWidgetLayout} */}
      {/* {selectedWidgetName} */}
      <>
        {showPaneMenu && (
          <Draggable
            key={uuidv4()}
            styled={styled}
            item={selectedWidgetName}
            context="draggable"
            htmlItem={
              <>
                <Box className="draggedWidgetMenu" sx={styled?.menu}>
                  {menuSpace}
                </Box>
              </>
            }
          />
        )}{' '}
      </>{' '}
      <>
        <DropZone
          droppedItemsArray={droppedWidget}
          // setDroppedItemsArray={setDroppedWidget}
          dataTransfer={droppedWidgetName}
          // setDataTransfer={setDroppedWidgetName}
          handleDrop={handleDropWidgetIntoSpace}
          styled={styled}
        />
      </>{' '}
      {/* </Box>{" "} */}
    </>
  );
}
