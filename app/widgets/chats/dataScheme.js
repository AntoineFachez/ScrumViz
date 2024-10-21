import { v4 as uuidv4 } from 'uuid';

// export const scheme = {
//   chatId: uuidv4(),
//   title: '',
//   createdAt: new Date(),
//   summary: '',
//   history: [
//     {
//       role: 'user',
//       parts: [{ text: '' }],
//     },
//     {
//       role: 'model',
//       parts: [{ text: '' }],
//     },
//   ],
// };
export const scheme = [
  { key: 'chatId', required: true, content: uuidv4() },
  { key: 'title', required: true, content: '' },
  { key: 'createdAt', required: true, content: new Date() },
  { key: 'summary', required: true, content: '' },
  {
    key: 'history',
    required: true,
    content: [
      {
        role: 'user',
        parts: [{ text: '' }],
      },
      {
        role: 'model',
        parts: [{ text: '' }],
      },
    ],
  },
];
export const fieldsAccordion = {
  heading: 'name',
  subHeading: 'date.start',
  content: 'description',
  imageUrl: 'imageurl',
  imageDescr: 'imageDescription',
};

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'title',
  subTitle: 'summary',
  description: 'summary',
  customArray: 'history',
  customArrayKey: 'role',
  itemInFocusIdKey: 'id',
  filterArrayByIdKey: 'parts',
};

export const singleItemSchemeP = {
  id: 'id',
  title: 'title',
  subTitle: 'text',
  description: 'text',
};

export const sliderMarksToken = [
  // {
  //   value: 0,
  //   label: '0°C',
  // },
  // {
  //   value: 20,
  //   label: '20°C',
  // },
  // {
  //   value: 37,
  //   label: '37°C',
  // },
  // {
  //   value: 1000,
  //   label: '100°C',
  // },
];

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
