import { v4 as uuidv4 } from 'uuid';
export const context = 'productBackLogs';
export const fieldsAccordion = {
  heading: 'name',
  subHeading: 'date.start',
  content: 'description',
  imageUrl: 'imageurl',
  imageDescr: 'imageDescription',
};
// export const scheme = {
//   id: uuidv4(),
//   createdAt: new Date(),
//   userStory_id: '',
//   assignee: '',
//   description: '',
//   estimated_hours: '',
// };
export const scheme = [
  { key: 'id', required: true, content: uuidv4() },
  { key: 'createdAt', required: true, content: new Date() },
  { key: 'userStory_id', required: true, content: '' },
  { key: 'assignee', required: true, content: '' },
  { key: 'description', required: true, content: '' },
  { key: 'estimated_hours', required: true, content: '' },
];

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'product_id',
  title: 'description',
  subTitle: 'description',
  description: 'end_date',
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
