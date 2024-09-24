"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import getSudokuPuzzles from '../_data/SudokuPuzzles';

// 전체 보드 9x9x 크기
const SIZE = 9;
// 서브 그리드의 3x3 크기
const SUBGRID_SIZE = 3;

// 빈 스도쿠 보드 생성
const generateEmptyBoard = () => Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

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

// 스도쿠 퍼즐을 생성하는 함수
const generateSudoku = () => {
  const board = generateEmptyBoard();
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const num = Math.floor(Math.random() * SIZE) + 1;
      if (isSafe(board, i, j, num)) {
        board[i][j] = num;
      }
    }
  }
  solveSudoku(board);
  return board;
};

// 스도쿠 보드의 유효성을 검사
const isValidBoard = (board: number[][]): boolean => {
  const checkSet = (arr: number[]) => {
    const seen = new Set();
    for (const num of arr) {
      if (num !== 0) { // 0은 무시
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
    const column = board.map(row => row[col]);
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
  const [board, setBoard] = useState<number[][]>(Array(SIZE).fill(null).map(() => Array(SIZE).fill(0)));  // 현재 스도쿠 보드 상태
  const [originalBoard, setOriginalBoard] = useState<number[][]>(Array(SIZE).fill(null).map(() => Array(SIZE).fill(0)));  // 원본 스도쿠 보드 상태
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);  // 현재 선택된 셀 정보
  const [isSolved, setIsSolved] = useState(false);  // 스도쿠 퍼즐이 해결되었는지 여부

  useEffect(() => {
    // 스도쿠 퍼즐 목록 가져오기
    const puzzles = getSudokuPuzzles();
    // 랜덤 퍼즐 인덱스 선택
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    const newBoard = puzzles[randomIndex]; // 랜덤 문제 선택
    setBoard(newBoard);
    setOriginalBoard(newBoard.map(row => [...row])); // 원본 보드 저장
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r) => [...r]);
    
    // 빈 문자열일 경우 0으로 설정
    if (value === '') {
      // 입력한 숫자가 0일 경우에만 해당 셀의 값을 0으로 설정
      if (originalBoard[row][col] === 0) {
        newBoard[row][col] = 0;
      }
    } else {
      const num = Number(value);
      if (num >= 1 && num <= 9) {
        newBoard[row][col] = num;
      }
    }
  
    setBoard(newBoard);
    checkIfSolved(newBoard);
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
    const newBoard = originalBoard.map(row => [...row]);
    solveSudoku(newBoard);
    setBoard(newBoard);
    checkIfSolved(newBoard);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => {
          const isDuplicate = (cell !== 0 && row.filter(n => n === cell).length > 1) ||
                              (cell !== 0 && board.map(r => r[colIndex]).filter(n => n === cell).length > 1) ||
                              (cell !== 0 && board.slice(Math.floor(rowIndex / SUBGRID_SIZE) * SUBGRID_SIZE, Math.floor(rowIndex / SUBGRID_SIZE) * SUBGRID_SIZE + SUBGRID_SIZE)
                                  .flat().slice(Math.floor(colIndex / SUBGRID_SIZE) * SUBGRID_SIZE, Math.floor(colIndex / SUBGRID_SIZE) * SUBGRID_SIZE + SUBGRID_SIZE)
                                  .filter(n => n === cell).length > 1);
          
          const isUserInput = originalBoard[rowIndex][colIndex] === 0 && cell !== 0;  // 사용자가 입력한 숫자 확인
  
          return (
            <input
              key={colIndex}
              type="text"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              className={`grid-cell border cursor-pointer caret-transparent border-black hover:border-blue-700 w-[4.17rem] h-[4.17rem] text-center text-lg ${isDuplicate ? 'border-red-500' : 'border-gray-300'} ${rowIndex % SUBGRID_SIZE === 0 && colIndex % SUBGRID_SIZE === 0 ? 'border-t-2 border-l-2' : ''} ${rowIndex % SUBGRID_SIZE === 2 ? 'border-b-2' : ''} ${colIndex % SUBGRID_SIZE === 2 ? 'border-r-2' : ''} ${cell === 0 ? 'bg-white' : (isUserInput ? 'bg-gray-300' : 'bg-white')} hover:bg-blue-500`} // hover 시 배경색 파란색
              style={{
                outline: 'none', // 포커스 시 outline 제거
                color: isDuplicate ? 'red' : 'black', // 틀린 부분은 빨강, 나머지는 검정
              }}
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
    const newBoard = generateSudoku();
    setBoard(newBoard);
    setOriginalBoard(newBoard.map(row => [...row])); // 새 원본 보드 저장
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">스도쿠 게임</h1>
      {renderBoard()}
      {renderNumberButtons()}
      <button onClick={solveCurrentPuzzle} className="m-2 px-3 py-1 border border-gray-300 rounded">
        해결하기
      </button>
      {isSolved && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-black z-50 text-center">
          <h2 className="text-xl">정답입니다!</h2>
          <button onClick={handleCloseModal} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
            새 게임 시작
          </button>
        </div>
      )}
      {isSolved && <div className="fixed inset-0 bg-black opacity-50 z-40" />}
    </div>
  );
}