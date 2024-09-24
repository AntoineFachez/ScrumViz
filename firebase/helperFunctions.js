// import React, { useContext } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  arrayUnion,
  query,
  updateDoc,
  where,
  getDoc,
} from 'firebase/firestore';
import { writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './firebase';
import { getAuth } from 'firebase/auth';

import { v4 as uuidv4 } from 'uuid';

export const submitToFirestore = async ({ dataPack }) => {
  const { firestoreContext, data, setItemInFocus, arrayToPushOnTo } = dataPack;

  try {
    const docRef = await addDoc(collection(db, firestoreContext), data);
    //    console.log("Document written with ID: ", firestoreContext, docRef.id);

    const docSnap = await getDoc(doc(db, firestoreContext, docRef.id));

    if (docSnap.exists()) {
      const docData = docSnap.data();
      // console.log(docData);
      if (setItemInFocus) {
        setItemInFocus(docData, docRef.id);
        arrayToPushOnTo.push(docData);
      }
    } else {
      //    console.log("No such document!");
    }
  } catch (error) {
    console.error('Error writing document: ', error);
    // Handle error as needed
  }
};

export async function upLoadFilesToFireStore({
  file,
  setReturnUrl,
  returnUrl,
  setProgress,
  tempURL,
}) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!file) return;

  const storageRef = ref(storage, `/${user.uid}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const createURl = (downloadURL) => {
    tempURL = downloadURL;
    setReturnUrl(downloadURL);
  };

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      //    console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error('Error uploading file:', error);
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        createURl(downloadURL);
      });
    }
  );
}

export const getDocIdSByValueSearch = async (
  parentCollectionName,
  queryField,
  searchString,
  foundParents
) => {
  if (!searchString) return;
  // const handleGet = async () => {
  const q = query(
    collection(db, parentCollectionName),
    where(queryField, '==', searchString)
  );
  try {
    const querySnapshot = await getDocs(q);
    let uid;
    let tempDoc;
    querySnapshot?.forEach((doc) => {
      tempDoc = doc.data();
      uid = doc.id;
    });
    const parentDocId = uid;

    return { parentDoc: tempDoc, parentId: parentDocId };
  } catch (error) {
    console.error('Error updating documents:', error);
  }
  // };
  // await handleGet();
};
// export const getSingleDocByValueSearch = async (
//   parentCollectionName,
//   queryField,
//   searchString,
// ) => {
//   const q = query(
//     collection(db, parentCollectionName),
//     where(queryField, "==", searchString),
//   );
//   const querySnapshot = await getDoc(q);
//   let uid;
//   const tempDoc = querySnapshot?.data();
//   const parentDocId = uid;
//   // foundParents.push(doc);
//   return { parentDoc: tempDoc, parentId: parentDocId };
// };
export const handleUpdateDoc = async (firebaseContext, docId, data) => {
  const docRef = doc(db, firebaseContext, docId);
  await updateDoc(docRef, data)
    .then(() => {
      //    console.log("successful");
    })
    .catch(() => {
      //    console.log("error");
    })
    .finally(() => {});
};
export const updateArray = async ({ dataPack }) => {
  const {
    firestoreContext,
    queryField,
    searchString,
    data,
    setItemInFocus,
    arrayToPushOnTo,
  } = dataPack;
  // console.log("dataPack", dataPack);
  const handleUpdateArray = async () => {
    if (!searchString) return;
    const q = query(
      collection(db, firestoreContext),
      where(queryField, '==', searchString)
    );
    try {
      const querySnapshot = await getDocs(q);

      let uid;
      let docRef;
      const collectionRef = collection(db, firestoreContext);
      const batch = writeBatch(db);
      querySnapshot?.forEach((doc) => {
        if (doc.data()[queryField] === searchString) {
          // doc.data() is never undefined for query doc snapshots
          //    console.log("arrayUpdated", doc.id, " => ", doc.data());
          uid = doc.id;
        }
      });
      docRef = doc(collectionRef, uid);
      batch.update(docRef, data);
      await batch.commit();

      setItemInFocus(doc.data());

      // Commit the batched updates
    } catch (error) {
      console.error('Error updating documents:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };

  // Wait for the asynchronous function to complete
  await handleUpdateArray();
};

export const handleAddDocToSubCollection = async (
  parentCollectionName,
  parentDocId,
  subCollectionName,
  data,
  setItemInFocus,
  setError
) => {
  try {
    const docRef = doc(db, parentCollectionName, parentDocId);
    const subCollectionRef = collection(docRef, subCollectionName);

    // Add a new document to the subcollection
    const newSubDocRef = await addDoc(subCollectionRef, data);
    const newSubDocId = newSubDocRef.id;
    const subcollectionQuery = query(subCollectionRef);
    // const docSnap = await getDoc(doc(db, firestoreContext, newSubDocId));
    const subcollectionQuerySnapshot = await getDocs(subcollectionQuery);

    subcollectionQuerySnapshot.forEach((subDocSnapshot) => {
      if (subDocSnapshot.exists()) {
        const subDocData = subDocSnapshot.data();
        // console.log("Subdocument Data:", subDocData);

        setItemInFocus(subDocData);
      } else {
        //    console.log("No such document!");
      }
    });
  } catch (error) {
    setError(error);
    // setAlert({
    //   open: true,
    //   message: error.message,
    //   type: "error",
    // });
    return;
  }
};
export const getAllDocs = async (
  collectionToPushOnTo,
  setSetter,
  dataContext
) => {
  // console.log("persons", collectionToPushOnTo, dataContext);
  const querySnapshot = await getDocs(collection(db, dataContext));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // collectionToPushOnTo.push(doc.data()[key]);
    collectionToPushOnTo.push(doc.data());
  });
}; //events:"{"collectionToPushOnTo":[{"eventId":"
export const getVisitedItems = async (
  tempArray,
  parentCollectionName,
  queryField,
  foundParents,
  history,
  setArray
) => {
  // Make the loop async
  await Promise?.all(
    history?.map(async (item) => {
      const searchString = item?.basics?.[queryField];

      const parentDoc = async () => {
        const tempObj = await getDocIdSByValueSearch(
          parentCollectionName,
          queryField,
          searchString,
          foundParents
        );
        tempArray.push(tempObj?.parentDoc);
      };
      await parentDoc();
    })
  );
};
