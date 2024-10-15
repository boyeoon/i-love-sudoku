import type { Metadata } from "next";
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
      <body>
        {children}
      </body>
    </html>
  );
}
