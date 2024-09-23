import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <header className="bg-[#1D1E27] flex items-center justify-between grid-cols-2 px-24 py-8">
        <div className="">
          <p className="text-2xl font-bold">I LOVE SUDOKU</p>
        </div>
        <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Language</button>
      </header>
      <main className="px-24">
        {/* top */}
        <div className="flex items-end justify-between my-3.5">
          <a>Easy 01</a>
          <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Reset</button>
        </div>
        <div className="flex justify-between">
          {/* left */}
          <div className="bg-[#ffffff] w-[37.5rem] h-[37.5rem] rounded-md">
            <div>

            </div>
          </div>
          <div className="w-16">

          </div>
          {/* right */}
          <div className="content-between grid w-80">
            {/* button */}
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">1</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">2</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">3</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">4</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">5</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">6</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">7</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">8</button>
              <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">9</button>
            </div>
            {/* description */}
            <p>
              <span className="block text-2xl font-bold">About</span>
              <span>This app is one of my side projects. You can view the source code here on <a className="font-bold underline underline-offset-1" href="https://github.com/BoYeonJang/i-love-sudoku" target="_blank">GitHub</a>. Created by Boyeon Jang</span>
            </p>
          </div>
        </div>
      </main>
      <footer className="px-24 py-8">
      </footer>
    </div>
  );
}
