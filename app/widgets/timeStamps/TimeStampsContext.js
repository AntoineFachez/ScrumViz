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

  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  useEffect(() => {
    // setSelectedTimeStamps(
    //   displayTimeStamps.filter((timeStamp) =>
    //     timeStamp.start.toLowerCase().includes(searchStart.toLowerCase())
    //   )
    // );

    return () => {};
  }, [searchStart]);
  return (
    <TimeStampsContext.Provider
      value={{
        displayTimeStamps,
        setDisplayTimeStamps,
        selectedTimeStamps,
        setSelectedTimeStamps,
        timeStampInFocus,
        setTimeStampInFocus,
        searchStart,
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
