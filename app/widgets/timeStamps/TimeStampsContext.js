'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { timeStamps } from './mockTimeStamps';
import InFocusContext from '@/context/InFocusContext';
import { handleSetItemInFocus } from '../actions';

const TimeStampsContext = createContext();

export const TimeStampsProvider = ({ children }) => {
  const { setLatestSelectedItem } = useContext(InFocusContext);
  const [displayTimeStamps, setDisplayTimeStamps] = useState(timeStamps);

  const [selectedTimeStamps, setSelectedTimeStamps] = useState(false);
  const [timeStampInFocus, setTimeStampInFocus] = useState(false);

  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  // const handleSetTimeStampInFocus = (timeStamp) => {
  //   handleSetItemInFocus(setTimeStampInFocus, timeStamp, setLatestSelectedItem);
  // };

  useEffect(() => {
    // setSelectedTimeStamps(
    //   displayTimeStamps.filter((timeStamp) =>
    //     timeStamp.start.toLowerCase().includes(searchStart.toLowerCase())
    //   )
    // );

    return () => {};
  }, [searchStart]);
  useEffect(() => {
    setSelectedTimeStamps(displayTimeStamps);

    return () => {};
  }, [displayTimeStamps]);
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
        // handleSetTimeStampInFocus,
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
