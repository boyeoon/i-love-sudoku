import Image from "next/image";
import Sudoku from "./_components/Sudoku";
import DropdownButton from "./_components/dropdownButton"
import Button from "./_components/Button"

export default function Home() {
  return (
    <div className="">
      <header className="bg-[#1D1E27] flex items-center justify-between grid-cols-2 px-24 py-8">
        <div className="">
          <p className="text-2xl font-bold">I LOVE SUDOKU</p>
        </div>
        {/* <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Level</button> */}
        {/* <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Language</button> */}
      </header>
      <main className="px-24">
        {/* top */}
        <div className="my-10" />
        {/* <div className="flex items-end justify-between my-3.5">
          <a>Easy 01</a>
          <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Reset</button>
        </div> */}
        {/* <DropdownButton menuName="내 메뉴" options={['옵션 1', '옵션 2', '옵션 3']} /> */}
        <div className="">
          <Sudoku />
          {/* <div className="content-between grid w-80">
            <p>
              <span className="block text-2xl font-bold">About</span>
              <span>This app is one of my side projects. You can view the source code here on <a className="font-bold underline underline-offset-1" href="https://github.com/BoYeonJang/i-love-sudoku" target="_blank">GitHub</a>. Created by Boyeon Jang</span>
            </p>
          </div> */}
        </div>
      </main>
      <footer className="px-24 py-8">
      </footer>
    </div>
  );
}
