import { v4 as uuidv4 } from 'uuid';
export const defaultPrompts = [
  {
    id: uuidv4(),
    title: 'develop user stories for this digital product',
    content:
      "lets talk about scrum management,product backlogs and user stories. Here is a layout for a digital product: <standInForProduct>. Please return product backlogs of the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop for each product backlogs a proper user story with its own accfeptence_criterias. Return the three product backlogs I asked for as an array of json objects. The data structure of these product backlogs / for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'): <standInForDataScheme>",
    source_collection: 'products',
    target_collection: 'productBackLogs',
  },
  {
    id: uuidv4(),
    title: 'develop product backlog for this user story',
    content:
      'lets talk about scrum management and product backlogs. Here is a layout for a user story. Please return the three most common product backlogs for such a user story. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these product backlogs. Return the three product backlogs I asked for as a json object. ',
    source_collection: 'userStories',
    target_collection: 'productBackLogs',
  },
];
