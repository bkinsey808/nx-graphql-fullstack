export interface Book {
  id: string;
  title: string;
  authorId: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Awakening',
    authorId: '1',
  },
  {
    id: '2',
    title: 'City of Glass',
    authorId: '2',
  },
];
