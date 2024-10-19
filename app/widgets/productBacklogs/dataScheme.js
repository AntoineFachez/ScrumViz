import { v4 as uuidv4 } from 'uuid';
export const context = 'productBackLogs';
export const fieldsAccordion = {
  heading: 'name',
  subHeading: 'date.start',
  content: 'description',
  imageUrl: 'imageurl',
  imageDescr: 'imageDescription',
};

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

// export const scheme = {
//   id: uuidv4(),
//   product_id: uuidv4(),
//   createdAt: new Date(),
//   product_name: '',
//   status: '',
//   description: '',
//   productBackLog_items: '',
// };
export const scheme = [
  { key: 'id', required: true, content: uuidv4() },
  { key: 'product_id', required: false, content: uuidv4() },
  { key: 'createdAt', required: true, content: new Date() },
  { key: 'product_name', required: true, content: '' },
  { key: 'status', required: false, content: '' },
  { key: 'description', required: false, content: '' },
  { key: 'goal', required: false, content: '' },
  { key: 'target_audience', required: false, content: '' },
  { key: 'primary_actions', required: false, content: '' },
  { key: 'productBackLog_items', required: false, content: '' },
];
export const singleItemScheme = {
  id: 'product_id',
  title: 'product_name',
  subTitle: 'status',
  description: 'description',
  customArray: 'productBackLog_items',
  customArrayKey: 'userStory_name',
  itemInFocusIdKey: 'id',
  filterArrayByIdKey: 'userStory_id',
};

export const headCellsTable = [
  {
    id: 'product_id',
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
    id: 'product_name',
    numeric: false,
    disablePadding: false,
    label: 'Product Name',
    field: 'product_name',
    headerName: 'Sprint Name',
    // type: "number",
    width: 200,
    editable: false,
  },
  {
    id: 'goal',
    numeric: false,
    disablePadding: false,
    label: 'Sprint Goal',
    field: 'goal',
    headerName: 'Sprint Goal',
    // type: "number",
    width: 200,
    editable: false,
  },
  {
    id: 'end_date',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
    field: 'end_date',
    headerName: 'End Date',
    // type: "number",
    width: 200,
    editable: false,
  },
];
