import React, { useEffect } from "react";

const useResizeObserver = (
  nestedRef,
  setDimensions,
  handleUserActivity,
  setIsUserActive
) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === nestedRef.current) {
          // Get the new dimensions of the parent element
          const { width, height } = entry.contentRect;

          // Set the dimensions of the globe component
          setDimensions({ width, height });
        }
      }
    });

    resizeObserver.observe(nestedRef.current);
    const timeoutId = setTimeout(() => {
      setIsUserActive(false);
    }, 10);

    document.addEventListener("mousemove", handleUserActivity);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      document.removeEventListener("mousemove", handleUserActivity);
    };
  }, [handleUserActivity, nestedRef, setDimensions, setIsUserActive]);
};

export default useResizeObserver;
