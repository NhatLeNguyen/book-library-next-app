import { BookStore } from "@app-types/bookStore.types";
import { create } from "zustand";

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  searchQuery: "",
  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  updateBook: (id, updatedBook) =>
    set((state) => ({
      books: state.books.map((b) => (b.id === id ? updatedBook : b)),
    })),
  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
