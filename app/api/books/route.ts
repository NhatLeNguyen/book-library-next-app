import { BOOKS } from "app/constants/books";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const newBook = await req.json();
  newBook.id = uuidv4();
  BOOKS.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

export async function GET() {
  return NextResponse.json(BOOKS);
}
