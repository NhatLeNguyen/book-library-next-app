import axios from "axios";

export async function generateStaticParams() {
  const res = await axios.get("/api/books");
  const books = res.data;
  return books.map((book: { id: string }) => ({
    id: book.id,
  }));
}
