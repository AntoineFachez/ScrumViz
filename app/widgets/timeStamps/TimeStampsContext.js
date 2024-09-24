'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { timeStamps } from './mockTimeStamps';

const TimeStampsContext = createContext();

export const TimeStampsProvider = ({ children }) => {
  const { appContext, selectedStory } = useContext(AppContext);
  const [displayTimeStamps, setDisplayTimeStamps] = useState(timeStamps);

  const [selectedTimeStamps, setSelectedTimeStamps] = useState(false);
  const [timeStampInFocus, setTimeStampInFocus] = useState(false);

  return (
    <TimeStampsContext.Provider
      value={{
        displayTimeStamps,
        setDisplayTimeStamps,
        selectedTimeStamps,
        setSelectedTimeStamps,
        timeStampInFocus,
        setTimeStampInFocus,
      }}
    >
      {children}
    </TimeStampsContext.Provider>
  );
};
export default TimeStampsContext;
export const TimeStampsState = () => {
  return useContext(TimeStampsContext);
};
