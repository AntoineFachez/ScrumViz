import { v4 as uuidv4 } from 'uuid';

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
//   person_id: '',
//   name: '',
//   scrumRole: '',
//   profession: '',
// };
export const scheme = [
  { key: 'id', required: true, content: uuidv4() },
  { key: 'createdAt', required: true, content: new Date() },
  { key: 'person_id', required: true, content: '' },
  { key: 'name', required: true, content: '' },
  { key: 'scrumRole', required: true, content: '' },
  { key: 'profession', required: true, content: '' },
];

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'name',
  subTitle: 'scrumRole',
  description: 'profession',
  // customField: 'userStory_author',
  // img_uri: 'wireFrame_uri',
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
