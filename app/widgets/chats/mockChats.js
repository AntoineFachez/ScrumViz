import { v4 as uuidv4 } from 'uuid';

export const chats = [
  {
    id: uuidv4(),
    title: 'latest chat',
    createdAt: new Date(),
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            type: 'text',
            content:
              'In the next prompt you will receive instructions. The aim for you is to return a response that contains only the json. You will be provided furthermore with data.',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content: 'hi.',
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
            type: 'text',
            content:
              'Hey, can you help me come up with some creative ideas for a short story?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content:
              'Sure, I can definitely help with that! What kind of themes or genres are you interested in exploring?',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            type: 'text',
            content:
              'Hmm, maybe something with a bit of mystery and a touch of sci-fi?',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content:
              'Okay, how about this: A detective in a futuristic city investigates a series of strange disappearances that seem to be linked to a new virtual reality technology...',
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
            type: 'text',
            content:
              "I'm planning a trip to Japan next spring. Can you give me some recommendations for places to visit?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content:
              'Of course! Japan is a beautiful country with so much to offer. What are your interests? Do you prefer bustling cities, tranquil nature, or a mix of both?',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            type: 'text',
            content:
              "I'd love to see a bit of both. Definitely want to experience the cherry blossoms in Kyoto!",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content:
              'Excellent choice! Kyoto in spring is magical. You could also consider visiting Nara with its friendly deer, hiking in the Japanese Alps, or exploring the vibrant city of Osaka...',
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
            type: 'text',
            content:
              "I'm trying to learn JavaScript, but I'm having trouble understanding loops. Can you explain them in a simple way?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content:
              "Sure, loops are a fundamental concept in programming. Imagine them as a set of instructions that you want to repeat multiple times. There are different types of loops, like 'for' loops and 'while' loops...",
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            type: 'text',
            content: "Can you give me an example of a 'for' loop?",
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            type: 'text',
            content: 'This loop will print the numbers from 0 to 4.',
          },
          {
            type: 'code',
            language: 'javascript',
            content: ' for (let i = 0; i <= 4; i++) {  console.log(i);}',
          },
        ],
      },
    ],
  },
];
