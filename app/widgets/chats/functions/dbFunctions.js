import { v4 as uuidv4 } from 'uuid';
import { submitToFirestore } from '@/firebase/helperFunctions';

export const handleNewChat = async (
  widgetProps,
  setChatInFocus,
  displayChats,
  setDisplayChats
) => {
  const data = {
    chat_id: uuidv4(),
    title: 'next chat',
    createdAt: new Date(),
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'I am in development of an AI integration.',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'hi. Tell me more about that.' }],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Please return what ever comes to your mind. By now I only need to receive some kind of response and am wondering what you come up with.',
          },
        ],
      },
    ],
  };
  submitToFirestore({
    //firestoreContext, data, setItemInFocus, setter, setSetter
    dataPack: {
      firestoreContext: widgetProps.collection,
      data: data,
      setItemInFocus: setChatInFocus,
      arrayToPushOnTo: displayChats,
      // setDisplayChats,
      // uploadFileUrl: data.uploadFileUrl || "",
    },
  }).then((tempArray) => {
    setDisplayChats(tempArray);
  });
};
export const handleStoreChat = async (data) => {
  const parentCollectionName = collection;
  let queryField;

  let searchString;
  searchString = data?.chat_id;
  queryField = 'chat_id';

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
