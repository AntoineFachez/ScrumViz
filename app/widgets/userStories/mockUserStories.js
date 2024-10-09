import { v4 as uuidv4 } from 'uuid';
export const userStories = [
  {
    id: '9a138bf7-0cdb-4e7d-92fe-f14c3897140b',
    userStory_name: 'Task Management',
    userStory_short:
      'As a user, I want to manage my tasks so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],
    writtenByTeamMember_id: '858d8477-4b06-4cf2-b335-d66bbb37a559',
    wireFrame_uri:
      'https://www.justinmind.com/wp-content/webp-express/webp-images/uploads/2020/04/mood-board-example-digital.png.webp',
  },
  {
    id: '8a09830f-8e46-438c-b4cc-7432aa8de12b',
    userStory_name: 'User Registration',
    userStory_short:
      'As a user, I want a user registration so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '602e1fd1-5e89-45c0-a799-a701e9352c5c',
    wireFrame_uri:
      'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*n0IqHn_5XYR6MhLflrYtSg.jpeg',
  },
  {
    id: 'a311cd75-8722-487c-9ad4-7b6395a5ad41',
    userStory_name: 'Social Media Integration',
    userStory_short:
      'As a user, I want a social media integration so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7',
    wireFrame_uri:
      'https://img.uxcel.com/practices/social-media-app-wireframing-1627992483228/a-1627992483228-2x.jpg',
  },
  {
    id: '755d041f-a4fb-48e2-8f14-315a51b58f9a',
    userStory_name: 'Kanban Board',
    userStory_short:
      'As a user, I want a Kanban Board so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '858d8477-4b06-4cf2-b335-d66bbb37a559',
    wireFrame_uri:
      'https://cdn.web.clickup.com/templates/images/6aaee1b6-cb02-432f-aa34-4d16b0bf3926/mood-board-1200.webp',
  },
  {
    id: '3207d0b9-730d-4282-b09c-8c42c55b918f',
    userStory_name: 'Gantt Chart',
    userStory_short:
      'As a user, I want a Gantt Chart so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '858d8477-4b06-4cf2-b335-d66bbb37a559',
    wireFrame_uri:
      'https://media.licdn.com/dms/image/v2/D4E12AQH1rYhLK7tfjg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705098821124?e=2147483647&v=beta&t=BI9AknkB9S_NsVjpZ2vqcbFjDmb2ce-34K1P4VlqkYY',
  },
  {
    id: '24054d06-3f60-4f1e-ba7c-644ee8c566a3',
    userStory_name: 'Time Tracking',
    userStory_short:
      'As a user, I want a Time Tracking so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: 'N/A',
    wireFrame_uri:
      'https://cdn.dribbble.com/userupload/9548087/file/original-055c029022a087f0aa95c6aac25ebae0.png?resize=1024x768',
  },
  {
    id: '41a39e0f-7726-4499-b649-7e60a928b99d',
    userStory_name: 'Reporting and Analytics',
    userStory_short:
      'As a user, I want Reporting and Analytics so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '858d8477-4b06-4cf2-b335-d66bbb37a559',
    wireFrame_uri:
      'https://cdn.dribbble.com/userupload/13591663/file/original-faa2b6361b895a9d5b294ec635305d96.png?resize=1600x1200',
  },
  {
    id: '9b950fa9-27a1-4f26-b338-a817abf3e3b3',
    userStory_name: 'Payment Gateway Integration',
    userStory_short:
      'As a customer, I want a payment gateway integration so that I can purchase products easily.',
    acceptanceCriteria: [
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The checkout process should be straightforward and user-friendly.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Users should be able to choose from multiple payment methods (credit card, debit card, PayPal, etc.).',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The checkout page should be secure and protect sensitive information.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Users should be able to review their order details before completing the purchase.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The checkout process should confirm the purchase and provide a receipt.',
      },
    ],
    writtenByTeamMember_id: '479fb554-4526-4ac0-8831-fbea5201f52e',
    wireFrame_uri:
      'https://cdn.dribbble.com/userupload/4062648/file/original-4b57f9cf2afdc08efb63a94d22d1dba4.png?resize=1024x768',
  },
  {
    id: 'bd37e325-52f9-48f4-ae61-5d6c107e161e',
    userStory_name: 'Shopping Cart',
    userStory_short:
      'As a customer, I want a shopping cart so that I can manage my purchases.',
    acceptanceCriteria: [
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The cart should be easily accessible and allow adding/removing products.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The cart should display the total cost of all items in the cart.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Users should be able to update the quantity of items in the cart.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The cart should clearly display the price of each item and any applicable discounts or taxes.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Users should be able to clear their cart or remove specific items.',
      },
    ],
    writtenByTeamMember_id: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7',
    wireFrame_uri:
      'https://stacydesmond.com/wp-content/uploads/2020/04/bendsoap-cart-wireframes-flow.001smb.jpg',
  },
  {
    id: 'e072f3a1-c28c-40e5-a7de-0b97a2e416f7',
    userStory_name: 'User Profiles',
    userStory:
      'As a user, I want a user registration so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '602e1fd1-5e89-45c0-a799-a701e9352c5c',
    wireFrame_uri:
      'https://as2.ftcdn.net/v2/jpg/02/30/99/61/1000_F_230996188_qIzbM15iz5BRtJCpl1Ax9ZF5yaSWOGu5.jpg',
  },
  {
    id: '68a531dd-eaaf-4b55-a7b3-9577fd3975b7',
    userStory_name: 'Search Functionality',
    userStory_short:
      "As a customer, I want a search functionality so that I can find what I'm looking for.",
    acceptanceCriteria: [
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The search bar should be prominently displayed and easily accessible.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Search results should be relevant to the entered keywords.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Users should be able to filter results by category, price range, brand, etc.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'Search suggestions should be provided as the user types.',
      },
      {
        id: uuidv4(),
        acceptanceCriteria_description:
          'The search functionality should be responsive and provide quick results.',
      },
    ],
    writtenByTeamMember_id: 'cb1f431d-a83e-45b9-b6ae-b66b7ecbf4e7',
    wireFrame_uri:
      'https://www.researchgate.net/profile/Jesus-Sanchez-Cuadrado/publication/283526120/figure/fig12/AS:307259440680968@1450267767530/Figure-A29-Wireframe-for-the-search-screen.png',
  },
  {
    id: 'ccd29397-8de7-4a5a-beba-54e5fc6dabba',
    userStory_name: 'Order Tracking',
    userStory_short:
      'As a customer, I want an order tracking so that I can manage my purchases.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: 'cb98255d-5e19-45bc-bcec-f5e4d2d8e9a8',
    wireFrame_uri:
      'https://cdn.dribbble.com/users/1518948/screenshots/9012011/media/e292d5e7d80f07b15e2a26fcf2968245.jpg?resize=1200x900&vertical=center',
  },
  {
    id: 'bf27910d-1cbf-4679-931b-ea3908df2b7c',
    userStory_name: 'New Website Design',
    userStory_short:
      'As a user, I want a new website design so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '997ea4ea-de46-4a46-9fc8-9f74ef5a4b75',
    wireFrame_uri:
      'https://techindustan.com/wp-content/uploads/2018/05/10241-1.jpg',
  },
  {
    id: '3415f65e-a2ca-401d-954b-0e8df88dddf6',
    userStory_name: 'Login Functionality',
    userStory_short:
      'As a user, I want a login functionality so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '9c5544be-d622-451f-8b2b-578f0436d36c',
    wireFrame_uri:
      'https://selftaughtcoders.com/wp-content/uploads/2014/10/login-wireframe.jpg',
  },
  {
    id: '3eaef6a1-73e4-4df1-8899-79c4f04788a5',
    userStory_name: 'User Feedback Collection',
    userStory_short:
      'As a user, I want a user feedback collection so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '602e1fd1-5e89-45c0-a799-a701e9352c5c',
    wireFrame_uri:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/194684641/original/8c775bb90189273a524829937d9cdee614c0d2db/create-a-user-flow-diagram-and-wireframes.png',
  },
  {
    id: 'af7750fd-a771-4ef4-b5f6-e9396b47e7e5',
    userStory_name: 'Admin Dashboard',
    userStory_short:
      'As a administrator, I want a admin dashboard so that I can achieve my goals.',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: 'd8caa9c9-5981-4f57-98a0-f548928ee314',
    wireFrame_uri:
      'https://wrapbootstrap.com/assets/items/full/8465aec9998fda3ceb5621b69f10ae5d9cdba792528dd142645996d96c2a4474.webp?v=1710580878',
  },
  {
    id: '873a5f7a-cd47-4102-ad73-84f51ef934ed',
    userStory_name: 'Product Catalog',
    userStory_short:
      "As a customer, I want a product catalog so that I can find what I'm looking for.",
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    writtenByTeamMember_id: '602e1fd1-5e89-45c0-a799-a701e9352c5c',
    wireFrame_uri:
      'https://www.newmanix.com/mike/sccc.premiumdw.com/home-to-procuct-800x469.png',
  },
  {
    id: 'f6ae82a0-6588-4675-b209-742da8cc4f71',
    userStory_name: 'User Profiles',
    userStory_short: 'Allow users to create profiles and share information.',
    writtenByTeamMember_id: 'ab8ac605-7ac5-49fd-a0d9-4b8ce11f7da5',
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    wireFrame_uri: null,
  },
  {
    id: '62f05723-171c-4df2-9067-e332f94dba43',
    userStory_name: 'News Feed',
    userStory_short: 'Display posts from friends and followed accounts.',
    writtenByTeamMember_id: null,
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    wireFrame_uri: null,
  },
  {
    id: '277a9d28-9ef3-403e-8f89-aae931492c29',
    userStory_name: 'Messaging',
    userStory_short: 'Enable users to send private messages to each other.',
    writtenByTeamMember_id: null,
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    wireFrame_uri: null,
  },
  {
    id: 'fb65e361-032f-470a-8f3c-e9390861b5a5',
    userStory_name: 'Groups and Communities',
    userStory_short:
      'Allow users to create and join groups based on interests.',
    writtenByTeamMember_id: null,
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    wireFrame_uri: null,
  },
  {
    id: '538d899e-2673-4b53-b50c-5ae065d6ba1c',
    userStory_name: 'Live Streaming',
    userStory_short: 'Implement live video streaming functionality.',
    writtenByTeamMember_id: null,
    acceptanceCriteria: [{ id: uuidv4(), acceptanceCriteria_description: '' }],

    wireFrame_uri: null,
  },
];
