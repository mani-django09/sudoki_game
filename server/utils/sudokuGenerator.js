// Sudoku Generator and Solver Utilities

// Check if a number is valid at a given position
function isValidMove(board, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

// Solve Sudoku using backtracking
function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return board;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return board;
}

// Generate a complete Sudoku board
function generateCompleteBoard() {
  const board = Array(9).fill().map(() => Array(9).fill(0));
  
  // Fill the diagonal 3x3 boxes first
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }
  
  // Solve the rest
  solveSudoku(board);
  return board;
}

// Fill a 3x3 box with random numbers
function fillBox(board, row, col) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(nums);
  
  let idx = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = nums[idx++];
    }
  }
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Remove numbers from complete board to create puzzle
function createPuzzle(completeBoard, difficulty) {
  const puzzle = completeBoard.map(row => [...row]);
  
  // Define number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55,
    expert: 64
  };

  const toRemove = cellsToRemove[difficulty] || cellsToRemove.medium;
  
  // Randomly remove cells
  const positions = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }
  
  shuffleArray(positions);
  
  for (let i = 0; i < toRemove && i < positions.length; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = 0;
  }
  
  return puzzle;
}

// Main function to generate Sudoku puzzle
function generateSudoku(difficulty = 'medium') {
  const completeBoard = generateCompleteBoard();
  const puzzle = createPuzzle(completeBoard, difficulty);
  
  return {
    puzzle,
    solution: completeBoard
  };
}

// Validate a move
function validateSudoku(board, row, col, value) {
  if (value < 1 || value > 9) return false;
  return isValidMove(board, row, col, value);
}

// Check if puzzle is complete
function isPuzzleComplete(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
}

// Check if current board state is valid
function isBoardValid(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        const temp = board[i][j];
        board[i][j] = 0;
        if (!isValidMove(board, i, j, temp)) {
          board[i][j] = temp;
          return false;
        }
        board[i][j] = temp;
      }
    }
  }
  return true;
}

module.exports = {
  generateSudoku,
  solveSudoku,
  validateSudoku,
  isPuzzleComplete,
  isBoardValid
};