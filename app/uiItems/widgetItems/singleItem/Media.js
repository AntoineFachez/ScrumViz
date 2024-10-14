import ImageDropzone from '@/app/widgets/imageDropZone/ImageDropZone';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import QuickMenu from '../QuickMenu';
import SketchWrapper from '@/app/p5/drawing/SketchWrapper';
import { Box } from '@mui/material';
import useResizeObserver from '@/hooks/useResizeObserver';

export default function Media({ widgetProps, styled }) {
  const { itemInFocus, singleItemScheme } = widgetProps;
  const containerRef = useRef();
  const [isClient, setIsClient] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [dimensions, setDimensions] = useState({
    width: containerRef?.current?.offsetWidth,
    height: containerRef?.current?.offsetHeight,
  });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = itemInFocus[singleItemScheme.img_uri];
  }, [itemInFocus, singleItemScheme.img_uri]);
  useEffect(() => {
    setIsClient(true);
    setImageDimensions({
      width: containerRef?.current?.offsetWidth,
      height: containerRef?.current?.offsetHeight,
    });
  }, [containerRef]);
  const handleUserActivity = useCallback(() => {
    setIsUserActive(true);
  }, []);
  useResizeObserver(
    containerRef,
    setDimensions,
    handleUserActivity,
    setIsUserActive
  );
  return (
    <Box
      ref={containerRef}
      sx={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <QuickMenu widgetProps={widgetProps} styled={styled} />
      {itemInFocus[singleItemScheme.img_uri] ? (
        <>
          {' '}
          <img
            style={{
              zIndex: 1,
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
            src={itemInFocus[singleItemScheme.img_uri]}
            alt=""
          />
          <SketchWrapper containerRef={containerRef} />
          {/* <Box
            sx={{
              width: imageDimensions.width, // Set width dynamically
              height: imageDimensions.height, // Set height dynamically
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2, // Ensure overlay is on top
              opacity: 0.4,
            }}
          >
            {' '}
          </Box> */}
        </>
      ) : (
        <ImageDropzone />
      )}
    </Box>
  );
}
