import { v4 as uuidv4 } from 'uuid';
export const defaultPrompts = [
  {
    id: uuidv4(),
    title: 'develop product backlog for this product',
    content:
      "lets talk about scrum management, product backlogs and user stories. Here is a layout for a digital product: <standInForProduct>. Please return the three most common product backlogs for such a digital product. Please keep in mind that I will later share my scrum team and ask you to develop specific user stories with their proper acceptance_criterias for these product backlogs. Return the three product backlogs I asked for as a json object.  The data structure of these product backlogs / for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'): <standInForDataScheme>",
    dataScheme:
      "[{productBackLog_item_id: 'generate a unique productBackLog_item UUiD', userStory_id: 'generate a unique userStory UUiD', userStory_name: 'generate a meaningful name',priority: 'select from: High||Medium||Low',estimatedEffort: calculateAmount,description:'generate a meaningful descrition',userStory:'generate a meaningful userStory short.',writtenByTeamMember_id: 'ignore',}],",
    source_collection: 'products',
    target_collection: 'productBackLogs',
  },
  {
    id: uuidv4(),
    title: 'develop user stories for this digital product',
    content:
      "lets talk about scrum management, product backlogs and user stories. Here is a layout for a digital product: <standInForProduct>. Please return product backlogs of the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop for each product backlogs a proper user story with its own accfeptence_criterias. Return the three product backlogs I asked for as an array of json objects. The data structure of these product backlogs / for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'): <standInForDataScheme>",
    dataScheme:
      "[{id: 'generate a unique UUiD', userStory_name: 'generate a meaningful name', userStory_short:'generate the story similar to: 'As a user, I … '', acceptanceCriteria: [{acceptanceCriteria_id: 'generate a Unique UUID for each criteria',acceptanceCriteria_description: 'generate meaningful criteria description',}, ],writtenByTeamMember_id: 'ignore',wireFrame_uri:'ignore', },",
    source_collection: 'products',
    target_collection: 'userStories',
  },
];
