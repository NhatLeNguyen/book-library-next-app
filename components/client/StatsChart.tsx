"use client";

import { Book } from "@app-types/bookStore.types";
import { useState } from "react";

export default function StatsChart({
  initialData,
}: {
  initialData: { [key: string]: number };
}) {
  const [data, setData] = useState(initialData);
  const [filterYear, setFilterYear] = useState("");

  const handleFilter = async () => {
    const res = await fetch("/api/books");
    const books = await res.json();
    const filtered = books.reduce(
      (acc: { [key: string]: number }, book: Book) => {
        if (!filterYear || book.year.toString() === filterYear) {
          acc[book.year] = (acc[book.year] || 0) + 1;
        }
        return acc;
      },
      {}
    );
    setData(filtered);
  };

  return (
    <div>
      <input
        type="number"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        placeholder="Filter by year"
        className="mb-4 p-2 border"
      />
      <button
        onClick={handleFilter}
        className="ml-2 p-2 bg-blue-500 text-white"
      >
        Filter
      </button>
      <div>
        {Object.entries(data).map(([year, count]) => (
          <div key={year}>
            Year {year}: {count} books
          </div>
        ))}
      </div>
    </div>
  );
}
