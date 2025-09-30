"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useBookStore } from "@store/bookStore";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Link from "next/link";
import { Book } from "@app-types/bookStore.types";
import BookForm from "@components/BookForm";

export default function Home() {
  const { books, searchQuery, setBooks, setSearchQuery } = useBookStore();
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    axios.get("/api/books").then((res) => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <header className="book-header mb-6">
        <h1 className="text-3xl font-bold">Book Library</h1>
      </header>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
        <BookForm
          bookToEdit={editingBook}
          onClose={() => setEditingBook(null)}
        />
      </div>
      <Table className="book-card">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow
              key={book.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell>
                <Link href={`/books/${book.id}`}>
                  <Button variant="link">View</Button>
                </Link>
                <Button onClick={() => setEditingBook(book)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteBook(book.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

async function deleteBook(id: string) {
  try {
    await axios.delete(`/api/books/${id}`);
    useBookStore.getState().deleteBook(id);
  } catch (error) {
    console.error("Failed to delete book:", error);
  }
}
