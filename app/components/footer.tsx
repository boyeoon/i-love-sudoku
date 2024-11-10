import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full mt-10">
      <p>&copy; {new Date().getFullYear()}. I Love Sudoku. All rights reserved.</p>
      <div>
        <Link 
          href={"https://github.com/boyeoon/i-love-sudoku"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-[#255AB4]"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}