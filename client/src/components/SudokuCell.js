import React from 'react';

const SudokuCell = ({ 
  value, 
  row, 
  col, 
  isOriginal, 
  isSelected, 
  hasConflict, 
  isHighlighted,
  isSameNumber,
  isPaused,
  onClick 
}) => {
  // Determine cell classes
  const getCellClasses = () => {
    let classes = ['sudoku-cell'];
    
    if (isOriginal) classes.push('original');
    if (!isPaused && isSelected) classes.push('selected');
    if (!isPaused && hasConflict) classes.push('conflict');
    if (!isPaused && isHighlighted) classes.push('highlighted');
    if (!isPaused && isSameNumber) classes.push('same-number');
    if (isPaused) classes.push('paused');
    
    // Add border classes for 3x3 box separation
    if (row % 3 === 0) classes.push('top-border');
    if (row % 3 === 2) classes.push('bottom-border');
    if (col % 3 === 0) classes.push('left-border');
    if (col % 3 === 2) classes.push('right-border');
    
    return classes.join(' ');
  };

  return (
    <div 
      className={getCellClasses()}
      onClick={onClick}
      data-row={row}
      data-col={col}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};

export default SudokuCell;