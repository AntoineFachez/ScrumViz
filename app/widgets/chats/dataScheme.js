export const context = 'university';
export const fieldsAccordion = {
  heading: 'name',
  subHeading: 'date.start',
  content: 'description',
  imageUrl: 'imageurl',
  imageDescr: 'imageDescription',
};

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemSchemeChat = {
  id: 'id',
  title: 'title',
  subTitle: 'summary',
  description: 'summary',
  customArray: 'history',
  customArrayKey: 'role',
  itemInFocusIdKey: 'id',
  filterArrayByIdKey: 'parts',
};

export const singleItemSchemePrompt = {
  id: 'id',
  title: 'title',
  subTitle: 'text',
  description: 'text',
};

export const headCellsTable = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'UserStory',
    field: 'title',
    headerName: 'UserStory',
    // type: "number",
    width: 200,
    editable: false,
  },
  // {
  //   id: 'name',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Sprint Name',
  //   field: 'name',
  //   headerName: 'Sprint Name',
  //   // type: "number",
  //   width: 200,
  //   editable: false,
  // },
  // {
  //   id: 'goal',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Sprint Goal',
  //   field: 'goal',
  //   headerName: 'Sprint Goal',
  //   // type: "number",
  //   width: 200,
  //   editable: false,
  // },
  // {
  //   id: 'end_date',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'End Date',
  //   field: 'end_date',
  //   headerName: 'End Date',
  //   // type: "number",
  //   width: 200,
  //   editable: false,
  // },
];