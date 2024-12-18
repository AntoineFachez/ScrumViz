import { v4 as uuidv4 } from 'uuid';

// export const scheme = {
//   id: uuidv4(),
//   createdAt: new Date(),
//   title: '',
//   content: '',
//   source_collection: '',
//   target_collection: '',
// };
export const scheme = [
  { domain: 'backend', key: 'id', required: true, content: uuidv4() },
  {
    domain: 'backend',
    key: 'createdAt',
    required: true,
    content: new Date(),
  },
  {
    domain: 'frontend',
    key: 'title',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'content',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'source_collection',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'target_collection',
    required: true,
    content: '',
  },
];

export const fieldsAccordion = {
  heading: 'name',
  subHeading: 'date.start',
  content: 'content',
  imageUrl: 'imageurl',
  imageDescr: 'imageDescription',
};

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'title',
  subTitle: 'text',
  description: 'content',
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
