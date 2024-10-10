import { v4 as uuidv4 } from 'uuid';
import { submitToFirestore } from '@/firebase/helperFunctions';

export const handleNewUserStory = async (setShowDialog) => {
  setShowDialog(true);

  // submitToFirestore({
  //   //firestoreContext, data, setItemInFocus, setter, setSetter
  //   dataPack: {
  //     firestoreContext: widgetProps.collection,
  //     data: userStoryInFocus,
  //     setItemInFocus: setUserStoryInFocus,
  //     arrayToPushOnTo: displayUserStories,
  //     // setDisplayChats,
  //     // uploadFileUrl: data.uploadFileUrl || "",
  //   },
  // }).then((tempArray) => {
  //   setDisplayUserStories(tempArray);
  // });
};

export const handleStoreUserStrory = async (data) => {
  const parentCollectionName = collection;
  let queryField;

  let searchString;
  searchString = data?.id;
  queryField = 'id';

  const parentDoc = await getDocIdSByValueSearch(
    parentCollectionName,
    queryField,
    searchString
  );
  if (parentDoc?.parentId) {
    handleUpdateDoc(parentCollectionName, parentDoc?.parentId, data);
  } else {
    submitToFirestore({
      //firestoreContext, data, setItemInFocus, setter, setSetter
      dataPack: {
        firestoreContext: widgetProps.collection,
        data: data,
        setItemInFocus: setChatInFocus,
        arrayToPushOnTo: displayChats,
      },
    }).then((tempArray) => {
      setDisplayChats(tempArray);
    });
  }
};
