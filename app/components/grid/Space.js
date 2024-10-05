import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Draggable from '../dragDrop/Index';
import DropZone from '../dragDrop/Index';

// import { handleDropWidgetIntoSpace } from "./helperFunctions";

export default function Space({
  widget,
  generated,
  uiContext,
  startUpWidgetLayout,
  widgetContext,
  contextSpaces,
  viewerGridMap,
  selectedWidget,
  dropWidgetName,
  showPaneMenu,
  menuSpace,
  dynamicComponent,
  styled,
}) {
  const [droppedWidgetName, setDroppedWidgetName] = useState(dropWidgetName);
  const [passWidgetContext, setPassWidgetContext] =
    useState(startUpWidgetLayout);
  const SelectedWidget = selectedWidget;
  const [droppedWidget, setDroppedWidget] = useState(
    <SelectedWidget
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
      viewerGridMap={viewerGridMap}
      // contextSpaces="top-left-top"
      selectedWidget={selectedWidget}
      dropWidgetName={widget.collection}
      setPassWidgetContext=""
      dynamicComponent={null}
      styled={styled}
    />
  );
  const handleDropWidgetIntoSpace = (droppedItemName) => {
    console.log('droppedItemName', viewerGridMap, dropWidgetName);
    const tempWidget = viewerGridMap?.filter((item) => {
      return JSON.stringify(item?.collection) === droppedItemName;
    });
    const TempWidget = tempWidget[0]?.widget;
    console.log('droppedItemName', TempWidget);
    if (TempWidget)
      setDroppedWidget(
        <TempWidget
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
          viewerGridMap={viewerGridMap}
          // contextSpaces="top-left-top"
          selectedWidget={selectedWidget}
          dropWidgetName={widget.collection}
          setPassWidgetContext=""
          dynamicComponent={null}
          styled={styled}
        />
      );
  };

  useEffect(() => {
    setDroppedWidget(
      <SelectedWidget
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
        viewerGridMap={viewerGridMap}
        // contextSpaces="top-left-top"
        selectedWidget={selectedWidget}
        dropWidgetName={widget.collection}
        setPassWidgetContext=""
        dynamicComponent={null}
        styled={styled}
      />
    );

    return () => {};
  }, [startUpWidgetLayout]);

  return (
    <>
      <>
        {showPaneMenu && (
          <Draggable
            key={uuidv4()}
            styled={styled}
            item={dropWidgetName}
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
      </>
    </>
  );
}
