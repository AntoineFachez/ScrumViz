export const sprintPlannings = [
  {
    id: 'a3f2b1c4-d5e4-4f5a-b4eb-d0e8c0091fa3', // Replace with a real UUID if needed
    sprint_id: '173e5a28-c9e9-4848-9499-e42a8a65f267', // Replace with the actual sprint ID this planning is for
    date: '2024-07-13', // Adjust the date as needed
    duration: 120, // Example duration in minutes
    attendees: [
      '858d8477-4b06-4cf2-b335-d66bbb37a559', // Alice (Product Owner)
      '734b78ef-b5cb-427c-b52c-6a6801296a26', // Bob (Scrum Master)
      '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie (Developer)
      '9c5544be-d622-451f-8b2b-578f0436d36c', // David (Developer)
      'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7', // Grace (Tester)
    ],
    selected_product_backlog_items: [1, 2, 3], // Assuming the first 3 items are selected for this sprint
    sprint_backlog: [
      {
        id: '39dca5bf-5929-4638-a4ab-b18f1432bcc5',
        backLog_item_id: 'ee540fdd-bfcb-4b89-97ad-d981e6c6c6f0',
        userStory_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Design user registration form',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 8,
      },
      {
        id: 'e8d50d60-1fb3-4ff0-bea4-78f8f3586363',
        backLog_item_id: 'ee540fdd-bfcb-4b89-97ad-d981e6c6c6f0',
        userStory_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Implement user registration backend',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 12,
      },
      {
        id: '04205206-a7a8-4cb3-a2c2-f575493809a3',
        backLog_item_id: 'ee540fdd-bfcb-4b89-97ad-d981e6c6c6f0',
        userStory_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Write unit tests for user registration',
        assignee: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7', // Grace
        estimated_hours: 5,
      },
      {
        id: '1fd001de-77f3-4c26-a904-e80c89b04e9c',
        backLog_item_id: 'cfc77257-96df-4005-9257-4347a7eb5899',
        userStory_id: '873a5f7a-cd47-4102-ad73-84f51ef934ed',
        description: 'Design product catalog layout',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 10,
      },
      {
        id: '162b1d94-5d3d-40e8-9ac3-090a43e1fe91',
        backLog_item_id: 'cfc77257-96df-4005-9257-4347a7eb5899',
        userStory_id: '873a5f7a-cd47-4102-ad73-84f51ef934ed',
        description: 'Fetch product data from database',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 15,
      },
      {
        id: 'b6730063-27ac-4c9d-a52b-7391266b3ea6',
        userStory_id: 'bd37e325-52f9-48f4-ae61-5d6c107e161e',
        description: 'Implement add to cart functionality',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 6,
      },
      {
        id: 'fdaa5432-67c5-4f42-8f7d-1b993a220b95',
        userStory_id: 'bd37e325-52f9-48f4-ae61-5d6c107e161e',
        description: 'Design shopping cart UI',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 4,
      },
    ],
  },
  {
    id: 'd0e8c0091fa3-4f5a-d5e4-b4eb-a3f2b1c4', // Replace with a real UUID if needed
    sprint_id: 'some_sprint_id', // Replace with the actual sprint ID this planning is for
    date: '2024-11-13', // Adjust the date as needed
    duration: 120, // Example duration in minutes
    attendees: [
      '734b78ef-b5cb-427c-b52c-6a6801296a26', // Bob (Scrum Master)
      'a62a535f-9361-4dce-b216-da61ceaed60a', // Eve (Developer)
      '9c5544be-d622-451f-8b2b-578f0436d36c', // David (Developer)
      'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7', // Grace (Tester)
      '85797044-954f-4704-9e0b-ad7797c0be1f', // Frank (Developer)
      '997ea4ea-de46-4a46-9fc8-9f74ef5a4b75', // Henry (Designer)
    ],
    selected_product_backlog_items: [1],
    sprint_backlog: [
      {
        id: '2a9f94af-2c6d-4fc5-93c1-1f767237bf02',
        userStory_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Design task creation UI',
        assignee: '997ea4ea-de46-4a46-9fc8-9f74ef5a4b75',
        estimated_hours: 2,
      },
      {
        id: '06d0b6b0-934c-4d35-b0c7-67d484be3568',
        userStory_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Implement task creation logic',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c',
        estimated_hours: 3,
      },
      {
        id: '477d577a-e951-4bfc-8235-3caac4d02cc3',
        userStory_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Implement task assignment functionality',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e',
        estimated_hours: 2,
      },
      {
        id: 'e982d476-fdc7-4cb8-b7b6-476059af7469',
        userStory_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Write unit tests for task creation and assignment',
        assignee: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7',
        estimated_hours: 1,
      },
      {
        id: '8ea6b9ee-7d72-4e26-a0d1-bbf1a7d87d18',
        userStory_id: '755d041f-a4fb-48e2-8f14-315a51b58f9a',
        description: 'Design first MoodBoard',
        assignee: '997ea4ea-de46-4a46-9fc8-9f74ef5a4b75',
        estimated_hours: 1,
      },
    ],
  },
];
