# I LOVE SUDOKU

![main-page](https://i.imgur.com/izazpAU.png)

The website is currently hosted at [**i-love-sudoku**](http://i-love-sudoku.vercel.app).

This app is a side project that implements a Sudoku game, designed to provide an engaging experience for users of all skill levels. It helps users solve Sudoku puzzles and discover solutions.

|                           |                                  |                                    |
| ------------------------- | -------------------------------- | ---------------------------------- |
| [**English**](/README.md) | [**Korean**](/docs/README_ko.md) | [**Japanese**](/docs/README_jp.md) |

## Features

- **Sudoku Board**: A playable Sudoku board where you can fill in the numbers.
- **Number Buttons**: Easily select numbers using the provided buttons.
- **Solution Assistance**: If you encounter difficulties while solving, press the solution button for guidance.

## How to Use

1. **Select a Number**: Click on any of the number buttons (1-9) to input that number into the selected Sudoku cell.
2. **Click on a Cell**: Click on any empty cell in the Sudoku grid to select it. This allows you to input a number into that specific cell.
3. **Input Numbers**: Type a number (1-9) directly into the selected cell. Press "Enter" to confirm the input. If you want to erase the number, simply leave the cell empty.
4. **Check for Validity**: As you input numbers, the game will automatically check for any duplicate values in rows, columns, or subgrids. Cells with duplicates will be highlighted in red.
5. **Solve the Puzzle**: Click the "Solution" button to automatically solve the current puzzle. The completed Sudoku board will be displayed.
6. **Reset the Puzzle**: If you want to start a new game, the app will automatically load a new random puzzle when you close the solution modal.

## Tech Stack

- [**React**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**React canvas confetti**](https://ulitcos.github.io/react-canvas-confetti/)

## Folder Structure

```
/i-love-sudoku
├── /app
│   ├── /components
│   │   ├── Sudoku.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── /data
│   │   └── SudokuPuzzles.ts
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── README.md
└── ...
```

## License

This project is licensed under the [MIT License](https://mit-license.org/).
