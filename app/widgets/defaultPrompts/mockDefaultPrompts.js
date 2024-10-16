import { v4 as uuidv4 } from 'uuid';
export const defaultPrompts = [
  {
    id: uuidv4(),
    title: 'develop user stories for this digital product',
    description:
      "lets talk about scrum management and user stories. Here is a layout for a digital product: 'product_name: Mushroom App, product_description: Users of the app can mark locations of where they found a mushroom. Users can shoot an image, upload it to gemini and ask for the according wikipedia article'. Please return the three most common user stories for such a product. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these user stories. Return the three user stories I asked for as an array of json objects. The data structure of these user stories/ for the json objects you shall return is as follows (find further instructions in parenthese such as 'generate uniqueUUID'):  [{id: 'generate a unique UUiD', userStory_name: 'generate a meaningful name', userStory_short:'generate the story similar to: 'As a user, I … '', acceptanceCriteria: [{acceptanceCriteria_id: 'generate a Unique UUID for each criteria',acceptanceCriteria_description: 'generate meaningful criteria description',}, ],writtenByTeamMember_id: 'ignore',wireFrame_uri:'ignore', },  ",
    source_collection: 'productBackLogs',
    target_collection: 'userStories',
  },
  {
    id: uuidv4(),
    title: 'develop product backlog for this user story',
    description:
      'lets talk about scrum management and product backlogs. Here is a layout for a user story. Please return the three most common product backlogs for such a user story. Please keep in mind that I will later share my scrum team and ask you to develop sprints for these product backlogs. Return the three product backlogs I asked for as a json object. ',
    source_collection: 'userStories',
    target_collection: 'productBackLogs',
  },
];
