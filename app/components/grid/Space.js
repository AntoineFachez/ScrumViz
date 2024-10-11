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
  mapToRender,
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
      mapToRender={mapToRender}
      // contextSpaces="top-left-top"
      selectedWidget={selectedWidget}
      dropWidgetName={widget.collection}
      setPassWidgetContext=""
      dynamicComponent={null}
      styled={styled}
    />
  );
  const handleDropWidgetIntoSpace = (droppedItemName) => {
    // console.log('droppedItemName', mapToRender, dropWidgetName);
    const tempWidgetArray = mapToRender?.filter((item) => {
      return JSON.stringify(item?.collection) === droppedItemName;
    });
    const tempWidget = tempWidgetArray[0]?.widget;
    const TempWidget = tempWidget;
    // console.log('droppedItemName', tempWidget);
    if (TempWidget)
      setDroppedWidget(
        <TempWidget
          // uiContext={uiContext}
          widget={tempWidget}
          uiContext={tempWidget?.uiContext}
          startUpWidgetLayout={tempWidget?.startUpWidgetLayout}
          // startUpWidgetLayout={'singleItem'}
          widgetContext={tempWidget?.widgetContext}
          generated={true} // contextSpaces={contextSpaces}
          // selectedWidget={selectedWidget}
          // dynamicComponent={dynamicComponent}
          // showPaneMenu={showPaneMenu}
          // menuSpace={menuSpace}
          mapToRender={mapToRender}
          // contextSpaces="top-left-top"
          selectedWidget={selectedWidget}
          dropWidgetName={tempWidget.collection}
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
        mapToRender={mapToRender}
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
