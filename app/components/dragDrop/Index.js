import React from 'react';
import Draggable from './Draggable';
import DropZone from './DropZone';
import DropzoneTextField from './DropTextField';

export default function Index({
  listItemRef,
  dataSlug,
  context,
  item,
  keyToPass,
  htmlItem,
  handleDrop,
  dataTransfer,
  setDataTransfer,
  droppedItemsArray,
  width,
  onItemsUpdated,
  zoneType,
  styled,
}) {
  return (
    <>
      {context === 'draggable' ? (
        <>
          <Draggable
            listItemRef={listItemRef}
            dataSlug={dataSlug}
            item={item}
            keyToPass={keyToPass}
            htmlItem={htmlItem}
            width={width}
            styled={styled}
          />
        </>
      ) : (
        <>
          {zoneType === 'textField' ? (
            <DropzoneTextField
              onItemsUpdated={onItemsUpdated}
              styled={styled}
            />
          ) : (
            <DropZone
              droppedItemsArray={droppedItemsArray}
              dataTransfer={dataTransfer}
              setDataTransfer={setDataTransfer}
              handleDrop={handleDrop} //when drop into Space: components/grid/Space
              styled={styled}
            />
          )}
        </>
      )}
    </>
  );
}
