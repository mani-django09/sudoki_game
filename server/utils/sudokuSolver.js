// Advanced Sudoku Solver with multiple strategies

class SudokuSolver {
  constructor(board) {
    this.board = board.map(row => [...row]);
    this.candidates = this.initializeCandidates();
  }

  // Initialize candidate numbers for each cell
  initializeCandidates() {
    const candidates = Array(9).fill().map(() => 
      Array(9).fill().map(() => new Set([1,2,3,4,5,6,7,8,9]))
    );

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] !== 0) {
          candidates[row][col] = new Set();
          this.updateCandidates(row, col, this.board[row][col], candidates);
        }
      }
    }

    return candidates;
  }

  // Update candidates when a number is placed
  updateCandidates(row, col, num, candidates = this.candidates) {
    // Remove from row
    for (let c = 0; c < 9; c++) {
      candidates[row][c].delete(num);
    }

    // Remove from column
    for (let r = 0; r < 9; r++) {
      candidates[r][col].delete(num);
    }

    // Remove from 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        candidates[r][c].delete(num);
      }
    }
  }

  // Solve using constraint propagation and search
  solve() {
    return this.constraintPropagation() && this.search();
  }

  // Apply constraint propagation techniques
  constraintPropagation() {
    let changed = true;
    while (changed) {
      changed = false;

      // Naked singles
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (this.board[row][col] === 0 && this.candidates[row][col].size === 1) {
            const num = [...this.candidates[row][col]][0];
            this.board[row][col] = num;
            this.candidates[row][col] = new Set();
            this.updateCandidates(row, col, num);
            changed = true;
          }
        }
      }

      // Hidden singles in rows
      for (let row = 0; row < 9; row++) {
        for (let num = 1; num <= 9; num++) {
          const possibleCols = [];
          for (let col = 0; col < 9; col++) {
            if (this.candidates[row][col].has(num)) {
              possibleCols.push(col);
            }
          }
          if (possibleCols.length === 1 && this.board[row][possibleCols[0]] === 0) {
            const col = possibleCols[0];
            this.board[row][col] = num;
            this.candidates[row][col] = new Set();
            this.updateCandidates(row, col, num);
            changed = true;
          }
        }
      }

      // Hidden singles in columns
      for (let col = 0; col < 9; col++) {
        for (let num = 1; num <= 9; num++) {
          const possibleRows = [];
          for (let row = 0; row < 9; row++) {
            if (this.candidates[row][col].has(num)) {
              possibleRows.push(row);
            }
          }
          if (possibleRows.length === 1 && this.board[possibleRows[0]][col] === 0) {
            const row = possibleRows[0];
            this.board[row][col] = num;
            this.candidates[row][col] = new Set();
            this.updateCandidates(row, col, num);
            changed = true;
          }
        }
      }

      // Hidden singles in boxes
      for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
          for (let num = 1; num <= 9; num++) {
            const possibleCells = [];
            for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
              for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
                if (this.candidates[r][c].has(num)) {
                  possibleCells.push([r, c]);
                }
              }
            }
            if (possibleCells.length === 1) {
              const [row, col] = possibleCells[0];
              if (this.board[row][col] === 0) {
                this.board[row][col] = num;
                this.candidates[row][col] = new Set();
                this.updateCandidates(row, col, num);
                changed = true;
              }
            }
          }
        }
      }
    }

    return this.isValid();
  }

  // Backtracking search
  search() {
    const emptyCell = this.findBestCell();
    if (!emptyCell) return true; // Solved

    const [row, col] = emptyCell;
    const candidates = [...this.candidates[row][col]];

    for (const num of candidates) {
      if (this.isValidMove(row, col, num)) {
        // Save state
        const oldBoard = this.board.map(row => [...row]);
        const oldCandidates = this.candidates.map(row => 
          row.map(cell => new Set(cell))
        );

        // Make move
        this.board[row][col] = num;
        this.candidates[row][col] = new Set();
        this.updateCandidates(row, col, num);

        // Apply constraint propagation
        if (this.constraintPropagation() && this.search()) {
          return true;
        }

        // Restore state
        this.board = oldBoard;
        this.candidates = oldCandidates;
      }
    }

    return false;
  }

  // Find the empty cell with fewest candidates (MRV heuristic)
  findBestCell() {
    let bestCell = null;
    let minCandidates = 10;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          const candidateCount = this.candidates[row][col].size;
          if (candidateCount === 0) return null; // Invalid state
          if (candidateCount < minCandidates) {
            minCandidates = candidateCount;
            bestCell = [row, col];
          }
        }
      }
    }

    return bestCell;
  }

  // Check if a move is valid
  isValidMove(row, col, num) {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (this.board[row][c] === num) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (this.board[r][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (this.board[r][c] === num) return false;
      }
    }

    return true;
  }

  // Check if current state is valid
  isValid() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0 && this.candidates[row][col].size === 0) {
          return false;
        }
      }
    }
    return true;
  }

  // Get the solved board
  getSolution() {
    return this.board;
  }

  // Get difficulty rating based on techniques needed
  getDifficultyRating() {
    // This could be enhanced to return difficulty based on
    // which solving techniques were required
    const filledCells = this.board.flat().filter(cell => cell !== 0).length;
    if (filledCells >= 50) return 'easy';
    if (filledCells >= 40) return 'medium';
    if (filledCells >= 30) return 'hard';
    return 'expert';
  }
}

// Export functions for compatibility with existing code
function solveSudokuAdvanced(board) {
  const solver = new SudokuSolver(board);
  if (solver.solve()) {
    return solver.getSolution();
  }
  return null;
}

function getDifficultyRating(board) {
  const solver = new SudokuSolver(board);
  return solver.getDifficultyRating();
}

module.exports = {
  SudokuSolver,
  solveSudokuAdvanced,
  getDifficultyRating
};