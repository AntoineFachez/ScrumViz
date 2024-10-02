import { v4 as uuidv4 } from 'uuid';
export const chats = [
  {
    id: 'a7c38bf7-b37b-4e7d-92fe-d1f8e0092f0e',
    chatId: uuidv4(),
    title: 'latest chat',
    createdAt: new Date(),
    summary: '',
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'In the next prompt you will recieve instructions. The aim for you is to return a response that contains only the json. You will be provided furthermore with data.',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'hi.' }],
      },
    ],
  },
];
