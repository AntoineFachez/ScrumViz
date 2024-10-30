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
//   start: '',
//   end: '',
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
    key: 'start',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'end',
    required: true,
    content: '',
  },
];

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'end',
  subTitle: 'end',
  description: 'start',
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
];
