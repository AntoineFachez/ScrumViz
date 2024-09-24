export const sprintPlannings = [
  {
    id: 'a3f2b1c4-d5e4-4f5a-b4eb-d0e8c0091fa3', // Replace with a real UUID if needed
    sprint_id: '173e5a28-c9e9-4848-9499-e42a8a65f267', // Replace with the actual sprint ID this planning is for
    date: '2023-11-13', // Adjust the date as needed
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
        id: 't1',
        product_backlog_item_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Design user registration form',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 8,
      },
      {
        id: 't2',
        product_backlog_item_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Implement user registration backend',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 12,
      },
      {
        id: 't3',
        product_backlog_item_id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
        description: 'Write unit tests for user registration',
        assignee: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7', // Grace
        estimated_hours: 5,
      },
      {
        id: 't4',
        product_backlog_item_id: '873a5f7a-cd47-4102-ad73-84f51ef934ed',
        description: 'Design product catalog layout',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 10,
      },
      {
        id: 't5',
        product_backlog_item_id: '873a5f7a-cd47-4102-ad73-84f51ef934ed',
        description: 'Fetch product data from database',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 15,
      },
      {
        id: 't6',
        product_backlog_item_id: 'bd37e325-52f9-48f4-ae61-5d6c107e161e',
        description: 'Implement add to cart functionality',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e', // Charlie
        estimated_hours: 6,
      },
      {
        id: 't7',
        product_backlog_item_id: 'bd37e325-52f9-48f4-ae61-5d6c107e161e',
        description: 'Design shopping cart UI',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c', // David
        estimated_hours: 4,
      },
    ],
  },
  {
    id: 'd0e8c0091fa3-4f5a-d5e4-b4eb-a3f2b1c4', // Replace with a real UUID if needed
    sprint_id: 'some_sprint_id', // Replace with the actual sprint ID this planning is for
    date: '2024-02-13', // Adjust the date as needed
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
        id: 'task_1',
        product_backlog_item_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Design task creation UI',
        assignee: '997ea4ea-de46-4a46-9fc8-9f74ef5a4b75',
        estimated_hours: 2,
      },
      {
        id: 'task_2',
        product_backlog_item_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Implement task creation logic',
        assignee: '9c5544be-d622-451f-8b2b-578f0436d36c',
        estimated_hours: 3,
      },
      {
        id: 'task_3',
        product_backlog_item_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Implement task assignment functionality',
        assignee: '479fb554-4526-4ac0-8831-fbea5201f52e',
        estimated_hours: 2,
      },
      {
        id: 'task_4',
        product_backlog_item_id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
        description: 'Write unit tests for task creation and assignment',
        assignee: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7',
        estimated_hours: 1,
      },
    ],
  },
];
