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
//   scrum_id: '',
//   team_id: '',
//   sprint_name: '',
//   goal: '',
//   start_date: '',
//   end_date: '',
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
    key: 'scrum_id',
    required: true,
    content: '',
  },
  {
    domain: 'backend',
    key: 'team_id',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'sprint_name',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'goal',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'start_date',
    required: true,
    content: '',
  },
  {
    domain: 'frontend',
    key: 'end_date',
    required: true,
    content: '',
  },
];

export const keysTable = ['id', 'item_name', 'user_story', 'author'];

export const singleItemScheme = {
  id: 'id',
  title: 'sprint_name',
  subTitle: 'goal',
  description: 'end_date',
  start_date: 'start_date',
  end_date: 'end_date',
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
