import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "I LOVE SUDOKU",
  description: "My Sudoku Side Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${intelone.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
