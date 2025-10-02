import { notFound } from "next/navigation";
import axios from "axios";
import BackButton from "@components/client/BackButton";

async function getBook(id: string) {
  const res = await axios.get(`http://localhost:3000/api/books/${id}`);

  return res.data;
}

export default async function BookDetail({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBook(params.id);

  if (!book) notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Book Detail</h1>
      <div className="bg-card p-6 rounded-lg shadow-custom">
        <h2 className="text-2xl font-semibold">{book.title}</h2>
        <p className="text-muted-foreground">Author: {book.author}</p>
        <p className="text-muted-foreground">Year: {book.year}</p>
        <BackButton />
      </div>
    </div>
  );
}
