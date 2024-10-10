import ImageDropzone from '@/app/widgets/imageDropZone/ImageDropZone';
import React from 'react';
import QuickMenu from '../QuickMenu';

export default function Media({
  widgetProps,

  styled,
}) {
  const { itemInFocus, singleItemScheme } = widgetProps;
  return (
    <>
      <QuickMenu widgetProps={widgetProps} styled={styled} />
      {itemInFocus[singleItemScheme.img_uri] ? (
        <img
          style={{
            zIndex: 1,
            // bottom: 0,
            // position: 'absolute',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
          src={itemInFocus[singleItemScheme.img_uri]}
          alt=""
        />
      ) : (
        <ImageDropzone />
      )}
    </>
  );
}
