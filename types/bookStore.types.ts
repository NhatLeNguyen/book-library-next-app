export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};

export type BookStore = {
  books: Book[];
  searchQuery: string;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updatedBook: Book) => void;
  deleteBook: (id: string) => void;
  setSearchQuery: (query: string) => void;
};
