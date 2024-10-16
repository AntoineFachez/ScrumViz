'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import { timeStamps } from './mockTimeStamps';

const TimeStampsContext = createContext();

export const TimeStampsProvider = ({ children }) => {
  const [showWidgetUIMenu, setShowWidgetUIMenu] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [displayTimeStamps, setDisplayTimeStamps] = useState(timeStamps);

  const [selectedTimeStamps, setSelectedTimeStamps] = useState(false);
  const [timeStampInFocus, setTimeStampInFocus] = useState(false);

  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  const handleOpenNewItem = async () => {
    console.log('handleNewTimeStamps');
    // setSelectedWidgetContext('newItem');
    setShowNewItem(true);
  };
  const handleCloseNewItem = () => {
    console.log('handleCloseNewTimeStamps');

    setShowNewItem(false);
  };
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
        showWidgetUIMenu,
        setShowWidgetUIMenu,
        showNewItem,
        setShowNewItem,
        displayTimeStamps,
        setDisplayTimeStamps,
        selectedTimeStamps,
        setSelectedTimeStamps,
        timeStampInFocus,
        setTimeStampInFocus,
        searchStart,
        handleOpenNewItem,
        handleCloseNewItem,
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
