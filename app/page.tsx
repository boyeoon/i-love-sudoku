import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <header className="bg-[#1D1E27] flex items-center justify-between grid-cols-2 px-24 py-8">
        <div className="">
          <a className="text-2xl font-bold">I LOVE SUDOKU</a>
        </div>
        <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Language</button>
      </header>
      <main className="px-24">
        <div className="">
          본문
        </div>
      </main>
    </div>
  );
}
