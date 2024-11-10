"use client";

import { useState, useEffect } from "react";
import getSudokuPuzzles from "@/data/sudokuPuzzles";
import Button from "@/components/buttons/button";
import Modal from "@/components/modal";
import Footer from "@/components/footer/footer";

// 전체 보드 9x9 크기
const SIZE = 9;
// 서브 그리드의 3x3 크기
const SUBGRID_SIZE = 3;

// 특정 숫자를 특정 위치에 놓을 수 있는지 검사
const isSafe = (board: number[][], row: number, col: number, num: number) => {
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % SUBGRID_SIZE);
  const startCol = col - (col % SUBGRID_SIZE);
  for (let i = 0; i < SUBGRID_SIZE; i++) {
    for (let j = 0; j < SUBGRID_SIZE; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }
  return true;
};

// 스도쿠 퍼즐을 해결하는 함수
const solveSudoku = (board: number[][]): boolean => {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= SIZE; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = 0; // Backtrack
          }
        }
        return false; // Trigger backtrack
      }
    }
  }
  return true;
};

// 스도쿠 보드의 유효성을 검사
const isValidBoard = (board: number[][]): boolean => {
  const checkSet = (arr: number[]) => {
    const seen = new Set();
    for (const num of arr) {
      if (num !== 0) {
        // 0은 무시
        if (seen.has(num)) {
          return false; // 중복된 숫자 발견
        }
        seen.add(num);
      }
    }
    return true;
  };

  // 행 검사
  for (let row = 0; row < SIZE; row++) {
    if (!checkSet(board[row])) {
      return false;
    }
  }

  // 열 검사
  for (let col = 0; col < SIZE; col++) {
    const column = board.map((row) => row[col]);
    if (!checkSet(column)) {
      return false;
    }
  }

  // 서브그리드 검사
  for (let startRow = 0; startRow < SIZE; startRow += SUBGRID_SIZE) {
    for (let startCol = 0; startCol < SIZE; startCol += SUBGRID_SIZE) {
      const subGrid: number[] = [];
      for (let row = 0; row < SUBGRID_SIZE; row++) {
        for (let col = 0; col < SUBGRID_SIZE; col++) {
          subGrid.push(board[startRow + row][startCol + col]);
        }
      }
      if (!checkSet(subGrid)) {
        return false;
      }
    }
  }

  return true;
};

export default function Sudoku() {
  const [board, setBoard] = useState<number[][]>(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(0))
  ); // 현재 스도쿠 보드 상태
  const [originalBoard, setOriginalBoard] = useState<number[][]>(
    Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(0))
  ); // 원본 스도쿠 보드 상태
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null); // 현재 선택된 셀 정보
  const [isSolved, setIsSolved] = useState(false); // 스도쿠 퍼즐이 해결되었는지 여부

  useEffect(() => {
    // 스도쿠 퍼즐 목록 가져오기
    const puzzles = getSudokuPuzzles();
    // 랜덤 퍼즐 인덱스 선택
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    const newBoard = puzzles[randomIndex]; // 랜덤 문제 선택
    setBoard(newBoard);
    setOriginalBoard(newBoard.map((row) => [...row])); // 원본 보드 저장
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r) => [...r]);

    // 입력 값이 숫자 1~9 이외일 경우 처리
    const num = parseInt(value);
    if (value === "" || (num >= 1 && num <= 9)) {
      if (originalBoard[row][col] === 0 || num === 0) {
        newBoard[row][col] = num || 0;
      }
      setBoard(newBoard);
      checkIfSolved(newBoard);
    } else {
      alert("The input value must be a number between 1 and 9.");
    }
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const newBoard = board.map((r) => [...r]);
      newBoard[selectedCell.row][selectedCell.col] = num;
      setBoard(newBoard);
      checkIfSolved(newBoard);
    }
  };

  const checkIfSolved = (currentBoard: number[][]) => {
    const isComplete = currentBoard.flat().every((cell) => cell !== 0);
    if (isComplete && isValidBoard(currentBoard)) {
      setIsSolved(true);
    }
  };

  const solveCurrentPuzzle = () => {
    const newBoard = originalBoard.map((row) => [...row]);
    solveSudoku(newBoard);
    setBoard(newBoard);
    checkIfSolved(newBoard);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => {
          const isDuplicate =
            (cell !== 0 && row.filter((n) => n === cell).length > 1) ||
            (cell !== 0 &&
              board.map((r) => r[colIndex]).filter((n) => n === cell).length >
                1) ||
            (cell !== 0 &&
              board
                .slice(
                  Math.floor(rowIndex / SUBGRID_SIZE) * SUBGRID_SIZE,
                  Math.floor(rowIndex / SUBGRID_SIZE) * SUBGRID_SIZE +
                    SUBGRID_SIZE
                )
                .flat()
                .slice(
                  Math.floor(colIndex / SUBGRID_SIZE) * SUBGRID_SIZE,
                  Math.floor(colIndex / SUBGRID_SIZE) * SUBGRID_SIZE +
                    SUBGRID_SIZE
                )
                .filter((n) => n === cell).length > 1);

          // 사용자가 입력한 숫자 확인
          const isUserInput =
            originalBoard[rowIndex][colIndex] === 0 && cell !== 0;
          // 선택된 셀 확인
          const isSelected =
            selectedCell &&
            selectedCell.row === rowIndex &&
            selectedCell.col === colIndex;

          // 반응형 그리드 및 애니메이션 추가
          const getCellClass = () => {
            const baseClass =
              "grid-cell border-0.5 cursor-pointer caret-transparent focus:outline-none w-[4.17rem] h-[4.17rem] text-center text-lg font-bold transition-all";
            const duplicateClass = isDuplicate
              ? "bg-red-200 border-red-500 text-red-500"
              : "border-gray-300 text-black";
            const borderClass = `
              ${rowIndex % SUBGRID_SIZE === 0 ? "border-t-2" : ""}
              ${
                colIndex % SUBGRID_SIZE === SUBGRID_SIZE - 1 ? "border-r-2" : ""
              }
            `;
            const backgroundClass =
              cell === 0
                ? "bg-white"
                : isUserInput
                ? "bg-slate-200"
                : "bg-white";

            const selectedClass = isSelected ? "bg-blue-200" : "";

            return `${baseClass} ${duplicateClass} ${borderClass} ${backgroundClass} ${selectedClass} hover:bg-blue-200 transition-colors`;
          };

          return (
            <input
              key={colIndex}
              type="text"
              value={cell === 0 ? "" : cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              className={getCellClass()}
            />
          );
        })}
      </div>
    ));
  };

  // 숫자 버튼 입력
  const renderNumberButtons = () => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, index) => (
          <Button
            key={index}
            buttonName={`${index + 1}`}
            onClick={() => handleNumberClick(index + 1)} // 버튼 클릭 시 이벤트 처리
          />
        ))}
      </div>
    );
  };

  const handleCloseModal = () => {
    setIsSolved(false);
    // 스도쿠 퍼즐 목록 가져오기
    const puzzles = getSudokuPuzzles();
    // 랜덤 퍼즐 인덱스 선택
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    const newBoard = puzzles[randomIndex]; // 랜덤 문제 선택
    setBoard(newBoard); // 새 보드 설정
    setOriginalBoard(newBoard.map((row) => [...row])); // 새 원본 보드 저장
  };

  return (
    <div className="flex justify-between">
      <div>{renderBoard()}</div>
      <div className="w-16" />
      <div className="w-80">
        {renderNumberButtons()}
        <div className="mt-2">
          <Button buttonName="Solution" onClick={solveCurrentPuzzle} />
        </div>
        <Footer />
      </div>
      {isSolved && <Modal isVisible={isSolved} onClose={handleCloseModal} />}
    </div>
  );
}
