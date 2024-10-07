import { v4 as uuidv4 } from 'uuid';
export const defaultPrompts = [
  {
    id: uuidv4(),
    title: 'develop user stories for this digital product',
    description:
      'lets talk about scrum management and user stories. Here is a layout for a digital product. Please return the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these user stories. Return the three user stories I asked for as a json object. ',
  },
  {
    id: uuidv4(),
    title: 'develop product backlog for this user story',
    description:
      'lets talk about scrum management and product backlogs. Here is a layout for a user story. Please return the three most common product backlogs for such a user story. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these product backlogs. Return the three product backlogs I asked for as a json object. ',
  },
];
