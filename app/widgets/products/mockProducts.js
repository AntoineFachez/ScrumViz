export const products = [
  {
    id: '0831e228-ea97-4502-bee4-328647180b05',
    product_name: 'E-commerce Platform',
    status: 'in developement',
    productOwner: 'John Doe',
    productBackLogs: [
      {
        productBackLog_id: '1f4b2e3c-a68d-4c1f-8a4e-0d315a983b6c',
      },
    ],
  },
  {
    id: 'c59174bc-b09c-4d10-aa70-0687d27b2bc5',
    product_name: 'Project Management Tool',
    status: 'in production',
    productOwner: 'John Doe',
    productBackLogs: [
      {
        productBackLog_id: 'a7c5d8e4-25b4-4e35-b37b-d1f8e0092f0e',
      },
    ],
  },
  {
    id: '2a927a24-dc7f-4f1e-8baf-5a2de2d2bba2',
    product_name: 'Social Media App',
    status: 'in developement',
    productOwner: 'John Doe',
    productBackLogs: [
      {
        productBackLog_id: 'e072f3a1-c28c-40e5-a7de-0b97a2e416f7',
      },
    ],
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    product_name: 'PoseCam',
    productDescription:
      'A mobile app that allows users to capture photos and videos with real-time pose estimation.',
    productOwner: 'John Doe',
    teamMembers: [
      {
        memberId: '12345678-90ab-cdef-1234-567890abcdef',
        memberName: 'Jane Smith',
        memberRole: 'Developer',
      },
      {
        memberId: '87654321-0fed-cba9-8765-43210fedcba9',
        memberName: 'Peter Jones',
        memberRole: 'Designer',
      },
    ],
    sprints: [
      {
        sprintId: 'f0e9d8c7-ab12-3456-7890-1234567890ab',
        sprintName: 'Sprint 1',
        sprintGoal: 'Develop core pose estimation functionality',
        startDate: '2024-10-21',
        endDate: '2024-11-04',
      },
    ],
    productBacklog: [
      {
        productBackLog_item_id: 'f527319d-9f43-449c-838b-e0657e8f7956',
        userStory_id: '3e460b9e-0894-4948-88f8-90051c709c90',
        userStory_name: 'Capture Photos and Videos with Pose Estimation',
        priority: 'High',
        estimatedEffort: '4 days',
        description:
          'The app should allow users to capture photos and videos while simultaneously displaying real-time pose detection overlaid on the screen.',
        userStory:
          "As a user, I want to be able to capture photos and videos with pose estimation overlaid on the screen so I can see my body's position and movements in real-time.",
        writtenByTeamMember_id: 'ignore',
      },
      {
        productBackLog_item_id: '07605874-9510-459d-86d2-e338f54e5067',
        userStory_id: 'd2472509-2b28-4556-909b-97565f62223e',
        userStory_name: 'Choose Pose Visualization Options',
        priority: 'Medium',
        estimatedEffort: '2 days',
        description:
          'Users should be able to select different visualization options for the detected poses (e.g., skeleton, stick figure, dots).',
        userStory:
          'As a user, I want to be able to choose how the pose estimation is visualized (e.g., skeleton, stick figure, dots) so I can customize the experience to my preference.',
        writtenByTeamMember_id: 'ignore',
      },
      {
        productBackLog_item_id: '8b872e62-867c-4c66-a0d6-38425d38c1bd',
        userStory_id: '25384c7c-7c9b-4953-9b7f-2f7d47097b6e',
        userStory_name: 'Standard Camera Features',
        priority: 'Low',
        estimatedEffort: '1 day',
        description:
          'The app should include common camera features like zoom, flash, and the ability to switch between front and rear cameras.',
        userStory:
          'As a user, I want to be able to use standard camera features like zoom, flash, and switch between front and rear cameras while using the pose estimation feature.',
        writtenByTeamMember_id: 'ignore',
      },
    ],
  },
];
