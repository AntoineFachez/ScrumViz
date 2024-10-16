import { v4 as uuidv4 } from 'uuid';
import { submitToFirestore } from '@/firebase/helperFunctions';

export const handleNewProductBackLog = async (
  widgetProps,
  setProductBackLogInFocus,
  data,
  displayProductBackLogs,
  setDisplayProductBackLogs
) => {
  console.log(
    widgetProps.collection,
    setProductBackLogInFocus,
    data,
    displayProductBackLogs,
    setDisplayProductBackLogs
  );

  submitToFirestore({
    //firestoreContext, data, setItemInFocus, setter, setSetter
    dataPack: {
      firestoreContext: widgetProps.collection,
      data: data,
      setItemInFocus: setProductBackLogInFocus,
      arrayToPushOnTo: displayProductBackLogs,
    },
  }).then((tempArray) => {
    displayProductBackLogs.push(tempArray);
  });
};
export const handleProductBackLog = async (data) => {
  const parentCollectionName = collection;
  let queryField;

  let searchString;
  searchString = data?.product_id;
  queryField = 'product_id';

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
