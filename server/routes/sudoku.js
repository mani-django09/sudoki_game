const express = require('express');
const router = express.Router();
const { generateSudoku, solveSudoku, validateSudoku } = require('../utils/sudokuGenerator');

// Generate a new Sudoku puzzle
router.post('/generate', (req, res) => {
  try {
    const { difficulty = 'medium' } = req.body;
    const puzzle = generateSudoku(difficulty);
    
    res.json({
      success: true,
      puzzle: puzzle.puzzle,
      solution: puzzle.solution,
      difficulty,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating puzzle:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate puzzle' 
    });
  }
});

// Validate a move
router.post('/validate', (req, res) => {
  try {
    const { board, row, col, value } = req.body;
    
    if (!board || row === undefined || col === undefined || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    const isValid = validateSudoku(board, row, col, value);
    
    res.json({
      success: true,
      isValid,
      message: isValid ? 'Valid move' : 'Invalid move'
    });
  } catch (error) {
    console.error('Error validating move:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to validate move' 
    });
  }
});

// Solve puzzle
router.post('/solve', (req, res) => {
  try {
    const { board } = req.body;
    
    if (!board) {
      return res.status(400).json({
        success: false,
        error: 'Board is required'
      });
    }

    const solution = solveSudoku([...board.map(row => [...row])]);
    
    res.json({
      success: true,
      solution,
      message: solution ? 'Puzzle solved' : 'No solution found'
    });
  } catch (error) {
    console.error('Error solving puzzle:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to solve puzzle' 
    });
  }
});

// Get hint for a specific cell
router.post('/hint', (req, res) => {
  try {
    const { board, solution } = req.body;
    
    if (!board || !solution) {
      return res.status(400).json({
        success: false,
        error: 'Board and solution are required'
      });
    }

    // Find empty cells
    const emptyCells = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ row: i, col: j, value: solution[i][j] });
        }
      }
    }

    if (emptyCells.length === 0) {
      return res.json({
        success: true,
        hint: null,
        message: 'Puzzle is already complete'
      });
    }

    // Return a random hint
    const randomHint = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    res.json({
      success: true,
      hint: randomHint,
      message: 'Hint provided'
    });
  } catch (error) {
    console.error('Error getting hint:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get hint' 
    });
  }
});

module.exports = router;