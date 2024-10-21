import { v4 as uuidv4 } from 'uuid';

export const chats = [
  {
    id: uuidv4(),
    title: 'Edible Fungus App',
    createdAt: new Date(),
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'In the next prompt you will receive further instructions to generate product backLogs of user stories for a webApp',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'I am ready.',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'Camera with Pose Estimation App',
    createdAt: new Date(),
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'do you know the concept discussed in https://www.youtube.com/watch?v=T99fNXTUUaQ ?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: "Yes, the concept discussed in the video is Pose Estimation using ml5.js. Specifically, the video explains how to use the ml5.js library to detect and track human poses in images and video streams. It covers the following:   Body Pose Model: The video introduces the concept of a body pose model, which is a machine learning model that can identify key points on a person's body, such as the nose, shoulders, and wrists. ml5.js: This is a JavaScript library that makes it easier to use machine learning models in web applications. The video shows how to use ml5.js to load and use a body pose model. MoveNet and BlazePose: These are two different body pose models that are available in ml5.js. The video discusses the differences between these models, such as the number of key points they detect and their accuracy. Coco Dataset: This is a large dataset of images that is often used to train machine learning models for pose estimation. The video briefly mentions the Coco dataset and its importance in the field. Code Examples: The video provides several code examples that demonstrate how to use ml5.js to detect poses in real time. The code examples cover topics such as loading the model, detecting poses, and drawing key points on the canvas. Overall, the video provides a comprehensive introduction to pose estimation using ml5.js. It covers the basic concepts, different models, and code examples, making it a valuable resource for anyone interested in learning about this topic.",
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'assume i wanted to write a prompt that asks for the basic layout of an smartphone camera app that uses contains this concept… how would you write such a prompt?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Design the basic layout for a smartphone camera app that utilizes pose estimation. The app should allow users to: Capture photos and videos with real-time pose detection overlaid on the screen. Choose between different pose visualization options (e.g., skeleton, stick figure, dots). Toggle pose estimation on/off. Access standard camera features like zoom, flash, and switching between front/rear cameras.',
          },
        ],
      },
    ],
  },

  {
    id: 'a1b2c3d-456e-789f-0123-456789abcdef',
    title: 'Brainstorming session',
    createdAt: '2024-10-02T21:05:00.123Z',
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'Hey, can you help me come up with some creative ideas for a short story?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Sure, I can definitely help with that! What kind of themes or genres are you interested in exploring?',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Hmm, maybe something with a bit of mystery and a touch of sci-fi?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Okay, how about this: A detective in a futuristic city investigates a series of strange disappearances that seem to be linked to a new virtual reality technology...',
          },
        ],
      },
    ],
  },
  {
    id: 'f0e9d8c-7b6a-5432-1098-76543210fedc',
    title: 'Travel planning',
    createdAt: '2024-10-02T21:10:00.456Z',
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: "I'm planning a trip to Japan next spring. Can you give me some recommendations for places to visit?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Of course! Japan is a beautiful country with so much to offer. What are your interests? Do you prefer bustling cities, tranquil nature, or a mix of both?',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "I'd love to see a bit of both. Definitely want to experience the cherry blossoms in Kyoto!",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Excellent choice! Kyoto in spring is magical. You could also consider visiting Nara with its friendly deer, hiking in the Japanese Alps, or exploring the vibrant city of Osaka...',
          },
        ],
      },
    ],
  },
  {
    id: 'b3c4d5e-6f7a-8910-2345-678901234567',
    title: 'Learning to code',
    createdAt: '2024-10-02T21:15:00.789Z',
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: "I'm trying to learn JavaScript, but I'm having trouble understanding loops. Can you explain them in a simple way?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: "Sure, loops are a fundamental concept in programming. Imagine them as a set of instructions that you want to repeat multiple times. There are different types of loops, like 'for' loops and 'while' loops...",
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "Can you give me an example of a 'for' loop?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'This loop will print the numbers from 0 to 4.',
          },
          {
            text: '```javascript\nfor (let i = 0; i <= 4; i++) {  console.log(i);}\n```',
          },
        ],
      },
    ],
  },
];
