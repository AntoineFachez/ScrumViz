'use client';
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
// import useGeolocation from '../hooks/useGeoLocation';
import {
  getDocIdSByValueSearch,
  getSingleDocByValueSearch,
  // submitToFirestore,
  updateArray,
  updateArrayAlt,
} from '../firebase/helperFunctions';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [userInFocus, setUserInFocus] = useState([null]);

  // const { latitude, longitude } = useGeolocation();
  // const [userLocation, setUserLocation] = useState({
  //   lat: latitude,
  //   lng: longitude,
  // });
  const [storiesHistory, setStoriesHistory] = useState([]);

  const handleSetHistories = async (data) => {
    const firestoreContext = 'users';
    const queryField = 'userId';
    const searchString = user?.uid;
    const setItemInFocus = setUserInFocus;
    // console.log("historyType", data);
    await updateArray({
      // updateArrayAlt({
      dataPack: {
        firestoreContext,
        data,
        queryField,
        searchString,
        setItemInFocus,
        // arrayToPushOnTo,
        // uploadFileUrl: data.uploadFileUrl || "",
      },
    });
    // console.log("eventsHistory", userInFocus);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    const parentCollectionName = 'users';
    const queryField = 'userId';
    const searchString = user?.uid;
    const tempUserInFocus = getDocIdSByValueSearch(
      parentCollectionName,
      queryField,
      searchString
      //  foundParents,
    );
    tempUserInFocus.then(function (result) {
      setUserInFocus(result?.parentDoc);
    });

    return () => {};
  }, [user]);

  useEffect(() => {
    const updateHistory = (historyType, historyData) => {
      const data = {
        [historyType]: arrayUnion(historyData[0]),
      };
      // console.log("historyType", historyType, data);

      handleSetHistories(data);
    };

    const historyTypes = [
      { type: 'storiesHistory', id: 'storyId' },
      // { type: "personsHistory", id: "personId" },
      // { type: "eventsHistory", id: "eventId" },
      // { type: "videosHistory", id: "videoId" },
    ];

    historyTypes.forEach((historyType) => {
      const historyData = eval(historyType.type); // Using eval to access the state variable by name
      // console.log("historyData", historyData, eventsHistory);
      // if (historyData && historyData.length > 0) {
      const isNotVisited = userInFocus?.[historyType.type]?.filter(
        (item) => item?.[historyType?.id] === historyData?.[historyType?.id]
      );
      // console.log("isNotVisited", isNotVisited);
      // if (isNotVisited?.length === 0 || isNotVisited === undefined)
      updateHistory(historyType.type, historyData);
      // }
    });

    return () => {};
  }, [storiesHistory]);

  // console.log("userInFocus", user);
  // console.log("parentCollectionName", userInFocus?.storiesHistory);
  // console.log("userInFocus", userInFocus);
  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        userInFocus,
        setUserInFocus,
        // userLocation,
        // setUserLocation,
        storiesHistory,
        setStoriesHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
export const UserState = () => {
  return useContext(UserContext);
};
