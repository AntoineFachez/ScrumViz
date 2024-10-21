import { v4 as uuidv4 } from 'uuid';

export const context = 'university';
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
//   scrumTeam_name: '',
//   members: '',
// };

export const scheme = [
  { key: 'id', required: true, content: uuidv4() },
  { key: 'createdAt', required: true, content: new Date() },
  { key: 'scrumTeam_name', required: true, content: '' },
  { key: 'members', required: true, content: '' },
];

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'scrumTeam_name',
  subTitle: 'goal',
  description: 'end_date',
  customArray: 'members',
  customArrayKey: 'role',
  customArrayKey_2: 'name',
  itemInFocusIdKey: 'id',
  filterArrayByIdKey: 'id',
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Sprint Name',
    field: 'name',
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
