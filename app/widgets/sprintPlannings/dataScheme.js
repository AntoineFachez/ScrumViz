import { v4 as uuidv4 } from 'uuid';

// export const scheme = {
//   id: uuidv4(),
//   createdAt: new Date(),
//   sprint_id: '',
//   date: '',
//   duration: '',
//   attendees: '',
//   selected_product_backlog_items: '',
//   sprintBackLog_items: '',
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
    domain: 'backend',
    key: 'sprint_id',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'date',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'duration',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'attendees',
    type: 'objects',
    required: false,
    content: [],
  },
  {
    domain: 'frontend',
    key: 'selected_product_backlog_items',
    type: 'objects',
    required: false,
    content: [],
  },
  {
    domain: 'frontend',
    key: 'sprintBackLog_items',
    type: 'objects',
    required: false,
    content: [],
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
  title: 'date',
  subTitle: 'date',
  description: 'user_story',
  img_uri: 'wireFrame_uri',
  customArray: 'sprintBackLog_items',
  customArrayKey: 'description',
  itemInFocusIdKey: 'sprintBackLog_item_id',
  filterArrayByIdKey: 'sprintBackLog_item_id',
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
  {
    id: 'item_name',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
    field: 'item_name',
    headerName: 'Item Name',
    // type: "number",
    width: 200,
    editable: false,
  },
  {
    id: 'user_story',
    numeric: false,
    disablePadding: false,
    label: 'User Story',
    field: 'user_story',
    headerName: 'User Story',
    // type: "number",
    width: 200,
    editable: false,
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author',
    field: 'author',
    headerName: 'Author',
    // type: "number",
    width: 200,
    editable: false,
  },
];
