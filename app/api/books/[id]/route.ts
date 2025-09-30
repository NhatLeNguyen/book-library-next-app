import { BOOKS } from "app/constants/books";
import { Book } from "../../../../types/bookStore.types";
import { NextRequest, NextResponse } from "next/server";

let books: Book[] = [];

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedBook = await req.json();
  books = books.map((b) => (b.id === params.id ? { ...b, ...updatedBook } : b));
  return NextResponse.json(updatedBook);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  books = books.filter((b) => b.id !== params.id);
  return NextResponse.json({ message: "Deleted" });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(BOOKS.filter((b) => b.id === params.id)[0]);
}
