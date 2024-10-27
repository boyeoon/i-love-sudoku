// import Image from "next/image";
import Sudoku from "./components/Sudoku";
// import DropdownButton from "./_components/dropdownButton"
// import Button from "./_components/Button"

export default function Home() {
  return (
    <div>
      <header className="bg-[#1D1E27] flex items-center justify-between px-4 py-8 md:px-24 w-full">
        <div className="flex-grow">
          <p className="text-2xl font-bold">I LOVE SUDOKU</p>
        </div>
        {/* <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Level</button> */}
        {/* <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Language</button> */}
      </header>
      <main className="flex justify-center my-10">
        {/* top */}
        {/* <div className="flex items-end justify-between my-3.5">
          <a>Easy 01</a>
          <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Reset</button>
        </div> */}
        {/* <DropdownButton menuName="내 메뉴" options={['옵션 1', '옵션 2', '옵션 3']} /> */}
        <div className="">
          <Sudoku />
        </div>
      </main>
    </div>
  );
}
