import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';
import useResizeObserver from '@/hooks/useResizeObserver.js';
const Sketch = dynamic(() => import('./Sketch'), {
  ssr: false,
});
export default function SketchWrapper({ containerRef, imageUrls }) {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: containerRef?.current?.offsetWidth,
    height: containerRef?.current?.offsetHeight,
  });

  const width = dimensions?.width;
  const height = dimensions?.height;
  const [isUserActive, setIsUserActive] = useState(false);
  const handleUserActivity = useCallback(() => {
    setIsUserActive(true);
  }, []);
  useEffect(() => {
    setIsClient(true);
    setDimensions({
      width: containerRef?.current?.offsetWidth,
      height: containerRef?.current?.offsetHeight,
    });
  }, [containerRef]);

  useResizeObserver(
    containerRef,
    setDimensions,
    handleUserActivity,
    setIsUserActive
  );
  return (
    <>
      <div
        style={{
          width: width,
          height: height,
          backgroundColor: 'transparent',
        }}
      >
        {isClient && (
          <Sketch
            imageUrls={imageUrls}
            width={width}
            height={height}
            mainObjColor={' #f6e8ea'}
            backgroundColor={'#2a324b'}
          />
        )}
      </div>
    </>
  );
}
