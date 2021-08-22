export interface Book {
  id: string;
  title: string;
  authorId: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Awakening',
    authorId: 'b949c9d2-30a9-4d49-bd3b-e957aad51552',
  },
  {
    id: '3a9b176f-f688-4008-b786-5e07ce874dc5',
    title: 'City of Glass',
    authorId: '2',
  },
];
