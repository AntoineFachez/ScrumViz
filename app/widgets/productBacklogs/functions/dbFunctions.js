import { v4 as uuidv4 } from 'uuid';
import { submitToFirestore } from '@/firebase/helperFunctions';

export const handleNewProductBackLog = async (
  widgetProps,
  setChatInFocus,
  displayChats,
  setDisplayChats
) => {};
export const handleProductBackLog = async (data) => {
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
