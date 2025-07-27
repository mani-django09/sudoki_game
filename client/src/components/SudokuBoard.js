import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuBoard = ({ 
  board, 
  originalBoard, 
  solution, 
  selectedCell, 
  onCellSelect, 
  onCellChange, 
  gameStatus,
  isPaused 
}) => {
  // Handle number input from keyboard
  const handleKeyPress = (event) => {
    if (selectedCell.row === -1 || selectedCell.col === -1 || isPaused) return;
    
    const key = event.key;
    if (key >= '1' && key <= '9') {
      const value = parseInt(key);
      onCellChange(selectedCell.row, selectedCell.col, value);
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      onCellChange(selectedCell.row, selectedCell.col, 0);
    }
    
    // Arrow key navigation
    let newRow = selectedCell.row;
    let newCol = selectedCell.col;
    
    switch (key) {
      case 'ArrowUp':
        newRow = Math.max(0, selectedCell.row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(8, selectedCell.row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, selectedCell.col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(8, selectedCell.col + 1);
        break;
      default:
        return;
    }
    
    if (newRow !== selectedCell.row || newCol !== selectedCell.col) {
      onCellSelect({ row: newRow, col: newCol });
      event.preventDefault();
    }
  };

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (isPaused) return;
    onCellSelect({ row, col });
  };

  // Check if cell has conflict
  const hasConflict = (row, col) => {
    const value = board[row][col];
    if (value === 0) return false;

    // Check row conflicts
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) return true;
    }

    // Check column conflicts
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) return true;
    }

    // Check 3x3 box conflicts
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (r !== row && c !== col && board[r][c] === value) return true;
      }
    }

    return false;
  };

  // Add event listener for keyboard input
  React.useEffect(() => {
    if (!isPaused) {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [selectedCell, isPaused]);

  return (
    <div 
      className={`sudoku-board ${gameStatus === 'won' ? 'solved' : ''} ${isPaused ? 'paused' : ''}`}
      tabIndex="0"
    >
      {board.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={isPaused ? 0 : cellValue} // Hide values when paused
            row={rowIndex}
            col={colIndex}
            isOriginal={originalBoard[rowIndex][colIndex] !== 0}
            isSelected={!isPaused && selectedCell.row === rowIndex && selectedCell.col === colIndex}
            hasConflict={!isPaused && hasConflict(rowIndex, colIndex)}
            isHighlighted={
              !isPaused &&
              selectedCell.row !== -1 && selectedCell.col !== -1 && (
                selectedCell.row === rowIndex ||
                selectedCell.col === colIndex ||
                (Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
                 Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3))
              )
            }
            isSameNumber={
              !isPaused &&
              cellValue !== 0 && 
              selectedCell.row !== -1 && 
              selectedCell.col !== -1 &&
              board[selectedCell.row][selectedCell.col] === cellValue
            }
            isPaused={isPaused}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default SudokuBoard;