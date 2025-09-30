import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Library App",
  description: "Manage your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-primary p-4 text-white flex justify-between">
          <div>
            <Link href="/" className="mr-4 hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
