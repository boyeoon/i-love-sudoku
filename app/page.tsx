import Sudoku from "@/components/sudoku";
import Header from "@/components/header/header";
// import DropdownButton from "./_components/dropdownButton"
// import Button from "./_components/Button"

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex justify-center my-10">
        {/* top */}
        {/* <div className="flex items-end justify-between my-3.5">
          <a>Easy 01</a>
          <button className="bg-[#255AB4] px-4 py-2.5 rounded-md">Reset</button>
        </div> */}
        {/* <DropdownButton menuName="내 메뉴" options={['옵션 1', '옵션 2', '옵션 3']} /> */}
        <div>
          <Sudoku />
        </div>
      </main>
    </div>
  );
}
