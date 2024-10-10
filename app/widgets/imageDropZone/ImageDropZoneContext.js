'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';

const ImageDropZoneContext = createContext();

export const ImageDropZoneProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [selectedWidgetContext, setSelectedWidgetContext] = useState(null);

  return (
    <ImageDropZoneContext.Provider
      value={{
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        selectedWidgetContext,
        setSelectedWidgetContext,
      }}
    >
      {children}
    </ImageDropZoneContext.Provider>
  );
};
export default ImageDropZoneContext;
export const ImageDropZoneState = () => {
  return useContext(ImageDropZoneContext);
};
