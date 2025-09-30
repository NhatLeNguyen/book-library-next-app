import { Book } from "@app-types/bookStore.types";
import StatsChart from "@components/client/StatsChart";
import axios from "axios";

async function getBookStats() {
  const res = await axios.get("http://localhost:3000/api/books");
  const books = res.data;
  const statsByYear = books.reduce(
    (acc: { [key: string]: number }, book: Book) => {
      acc[book.year] = (acc[book.year] || 0) + 1;
      return acc;
    },
    {}
  );
  return { statsByYear };
}

export default async function StatsPage() {
  const { statsByYear } = await getBookStats();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Book Statistics</h1>
      <StatsChart initialData={statsByYear} />
    </div>
  );
}
