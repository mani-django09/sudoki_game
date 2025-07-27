import React from 'react';

const GameControls = ({ 
  selectedCell,
  onCellChange,
  onNewGame, 
  onReset, 
  onHint, 
  disabled
}) => {
  return (
    <div className="game-controls">
      {/* Control Buttons */}
      <div className="control-buttons">
        <button
          className="control-btn"
          onClick={onReset}
          disabled={disabled}
          title="Restart"
        >
          ↻
        </button>
        
        <button
          className="control-btn"
          disabled={true}
          title="Undo"
        >
          ↶
        </button>
        
        <button
          className="control-btn"
          disabled={true}
          title="Notes"
        >
          ✏️
        </button>
        
        <button
          className="control-btn"
          onClick={onHint}
          disabled={disabled}
          title="Hint"
        >
          💡
        </button>
      </div>

      {/* Number Input */}
      <div className="number-input">
        <div className="number-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              className="number-btn"
              onClick={() => {
                if (selectedCell.row !== -1 && selectedCell.col !== -1) {
                  onCellChange(selectedCell.row, selectedCell.col, num);
                }
              }}
              disabled={selectedCell.row === -1 || selectedCell.col === -1}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* New Game Button */}
      <button
        className="new-game-btn"
        onClick={onNewGame}
        disabled={disabled}
      >
        New Game
      </button>
    </div>
  );
};

export default GameControls;