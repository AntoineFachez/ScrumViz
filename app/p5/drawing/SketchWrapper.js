import React, { useState, useEffect, useCallback } from 'react';

import dynamic from 'next/dynamic';
import useResizeObserver from '@/hooks/useResizeObserver.js';
const Sketch = dynamic(() => import('./Sketch'), {
  ssr: false,
});
export default function SketchWrapper({ containerRef }) {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: containerRef?.current?.offsetWidth,
    height: containerRef?.current?.offsetHeight,
  });

  const width = dimensions?.width;
  const height = dimensions?.height;

  useEffect(() => {
    setIsClient(true);
    setDimensions({
      width: containerRef?.current?.offsetWidth,
      height: containerRef?.current?.offsetHeight,
    });
  }, [containerRef]);
  const [isUserActive, setIsUserActive] = useState(false);
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
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 'auto',
          // backgroundColor: 'transparent',
          top: 0,
          left: 0,
          zIndex: 2, // Ensure overlay is on top
          // opacity: 0.4,
        }}
      >
        {isClient && (
          <Sketch
            width={width}
            height={height}
            mainObjColor={'white'}
            backgroundColor={'#2a324b'}
          />
        )}
      </div>
    </>
  );
}
