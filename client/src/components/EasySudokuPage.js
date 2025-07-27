import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuBoard from './SudokuBoard';
import GameControls from './GameControls';

// Difficulty configurations
const DIFFICULTY_CONFIG = {
  easy: { name: 'Easy', clues: 45 },
  medium: { name: 'Medium', clues: 35 },
  hard: { name: 'Hard', clues: 28 },
  expert: { name: 'Expert', clues: 22 },
  master: { name: 'Master', clues: 18 },
  extreme: { name: 'Extreme', clues: 15 }
};

const EasySudokuPage = () => {
  const navigate = useNavigate();
  const currentDifficulty = 'easy';
  
  // Set SEO meta tags
  useEffect(() => {
    document.title = "Easy Sudoku Puzzles - Free Online Sudoku for Beginners | SudokuGame.live";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Play free easy Sudoku puzzles online at SudokuGame.live. Perfect for beginners learning Sudoku rules. Start with simple number puzzles and improve your logical thinking skills.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Play free easy Sudoku puzzles online at SudokuGame.live. Perfect for beginners learning Sudoku rules. Start with simple number puzzles and improve your logical thinking skills.';
      document.head.appendChild(newMeta);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/easy');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/easy';
      document.head.appendChild(newCanonical);
    }
  }, []);

  // Game state
  const [board, setBoard] = useState([
    [0,5,6,9,0,0,0,0,8],
    [0,9,0,0,3,5,0,6,4],
    [0,0,1,0,0,0,0,0,0],
    [4,0,3,7,0,6,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,4,3,0,0,1],
    [0,0,8,6,0,7,3,4,0],
    [7,0,0,1,0,8,2,0,6],
    [0,0,0,0,0,0,0,0,0]
  ]);
  
  const [originalBoard] = useState([
    [0,5,6,9,0,0,0,0,8],
    [0,9,0,0,3,5,0,6,4],
    [0,0,1,0,0,0,0,0,0],
    [4,0,3,7,0,6,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,4,3,0,0,1],
    [0,0,8,6,0,7,3,4,0],
    [7,0,0,1,0,8,2,0,6],
    [0,0,0,0,0,0,0,0,0]
  ]);

  const [solution] = useState([
    [2,5,6,9,1,4,7,3,8],
    [1,9,7,8,3,5,2,6,4],
    [3,4,1,2,6,7,9,8,5],
    [4,8,3,7,2,6,1,9,5],
    [6,1,5,3,9,8,4,2,7],
    [7,2,9,5,4,3,8,1,6],
    [9,6,8,6,5,7,3,4,2],
    [7,3,4,1,7,8,2,5,6],
    [5,7,2,4,8,9,6,7,1]
  ]);
  
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [timer, setTimer] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [notesMode, setNotesMode] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [moves, setMoves] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (!gameOver && !gameWon && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver, gameWon, isPaused]);

  // Game functions (same as GamePage but specifically for easy)
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const isValidMove = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  const handleDifficultyChange = (newDifficulty) => {
    navigate(`/${newDifficulty}`);
  };

  const generateNewPuzzle = () => {
    setBoard(originalBoard.map(row => [...row]));
    setTimer(1);
    setIsPaused(false);
    setSelectedCell({ row: -1, col: -1 });
    setMistakes(0);
    setGameOver(false);
    setGameWon(false);
    setHintsLeft(3);
    setMoves([]);
  };

  const makeMove = (row, col, value) => {
    if (originalBoard[row][col] !== 0 || gameOver || gameWon || isPaused) return;
    
    const previousValue = board[row][col];
    setMoves(prev => [...prev, { row, col, value: previousValue }]);

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    
    if (value !== 0 && !isValidMove(board, row, col, value)) {
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 3) {
          setGameOver(true);
        }
        return newMistakes;
      });
    }
    
    setBoard(newBoard);
    
    if (isPuzzleComplete(newBoard)) {
      setGameWon(true);
    }
  };

  const isPuzzleComplete = (boardToCheck) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (boardToCheck[i][j] === 0) return false;
      }
    }
    return true;
  };

  const getHint = () => {
    if (hintsLeft <= 0 || gameOver || gameWon || isPaused) return;
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0 && originalBoard[i][j] === 0) {
          const newBoard = board.map(r => [...r]);
          newBoard[i][j] = solution[i][j];
          setBoard(newBoard);
          setSelectedCell({ row: i, col: j });
          setHintsLeft(prev => prev - 1);
          setMoves(prev => [...prev, { row: i, col: j, value: 0 }]);
          
          if (isPuzzleComplete(newBoard)) {
            setGameWon(true);
          }
          return;
        }
      }
    }
  };

  const undoMove = () => {
    if (moves.length === 0 || gameOver || isPaused) return;
    
    const lastMove = moves[moves.length - 1];
    const newBoard = board.map(r => [...r]);
    newBoard[lastMove.row][lastMove.col] = lastMove.value;
    
    setBoard(newBoard);
    setMoves(prev => prev.slice(0, -1));
    setSelectedCell({ row: lastMove.row, col: lastMove.col });
  };

  const restartGame = () => {
    setBoard(originalBoard.map(row => [...row]));
    setTimer(1);
    setIsPaused(false);
    setSelectedCell({ row: -1, col: -1 });
    setMistakes(0);
    setGameOver(false);
    setGameWon(false);
    setHintsLeft(3);
    setMoves([]);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">SudokuGame</span>
            <span className="logo-domain">.live</span>
          </div>
        </div>
      </header>

      {/* Difficulty Selection */}
      <div className="difficulty-header">
        <div className="difficulty-content">
          <span className="difficulty-label">Difficulty:</span>
          <div className="difficulty-tabs">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <button 
                key={key}
                className={`diff-tab ${currentDifficulty === key ? 'active' : ''}`}
                onClick={() => handleDifficultyChange(key)}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="game-container">
        <div className="game-content">
          <div className="game-board-section">
            <div className="sudoku-board-container">
              <SudokuBoard
                board={board}
                originalBoard={originalBoard}
                solution={solution}
                selectedCell={selectedCell}
                onCellSelect={setSelectedCell}
                onCellChange={makeMove}
                gameStatus={gameWon ? 'won' : gameOver ? 'lost' : 'playing'}
                isPaused={isPaused}
              />
              {isPaused && (
                <div className="pause-overlay">
                  <div className="pause-message">
                    Game Paused<br />
                    <small>Click play to resume</small>
                  </div>
                </div>
              )}
            </div>
            <div className="game-instruction">
              {isPaused ? 'Game is paused' : 'Perfect for beginners - select a cell and choose a number!'}
            </div>
          </div>

          <div className="game-sidebar">
            {/* Game stats */}
            <div className="game-stats">
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-label">Mistakes</span>
                  <span className="stat-value">{mistakes}/3</span>
                </div>
                <div className="stat-item timer-section">
                  <span className="stat-label">Time</span>
                  <div className="timer-controls">
                    <span className={`stat-value ${isPaused ? 'paused' : ''}`}>
                      {formatTimer(timer)}
                    </span>
                    <button 
                      className={`pause-btn-small ${isPaused ? 'active' : ''}`} 
                      onClick={togglePause}
                      title={isPaused ? "Resume" : "Pause"}
                    >
                      {isPaused ? '▶️' : '⏸️'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="controls-container">
              <div className="control-buttons">
                <button className="control-btn restart-btn" onClick={restartGame} title="Restart">↻</button>
                <button className="control-btn undo-btn" onClick={undoMove} disabled={moves.length === 0 || isPaused} title="Undo">↶</button>
                <button className={`control-btn notes-btn ${notesMode ? 'active' : ''}`} onClick={() => setNotesMode(!notesMode)} disabled={isPaused} title="Notes">
                  ✏️{!notesMode && <span className="off-badge">OFF</span>}
                </button>
                <button className="control-btn hint-btn" onClick={getHint} disabled={hintsLeft <= 0 || isPaused} title={`Hints left: ${hintsLeft}`}>
                  <span className="hint-number">{hintsLeft}</span>
                </button>
                <button className="control-btn bulb-btn" onClick={getHint} disabled={hintsLeft <= 0 || isPaused} title="Get Hint">💡</button>
              </div>

              <div className="number-input-grid">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <button key={num} className="number-btn" onClick={() => {
                    if (selectedCell.row !== -1 && selectedCell.col !== -1) {
                      makeMove(selectedCell.row, selectedCell.col, num);
                    }
                  }} disabled={gameOver || gameWon || isPaused}>{num}</button>
                ))}
              </div>

              <button className="new-game-btn" onClick={generateNewPuzzle}>New Easy Game</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <h2>Game Over</h2>
            <p>Don't worry! Easy Sudoku is perfect for learning. Try again!</p>
            <div className="modal-buttons">
              <button onClick={restartGame} className="modal-btn secondary">Try Again</button>
              <button onClick={generateNewPuzzle} className="modal-btn primary">New Easy Puzzle</button>
            </div>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="modal-overlay">
          <div className="game-won-modal">
            <h2>🎉 Excellent Work!</h2>
            <p>You completed your easy Sudoku in {formatTimer(timer)}! Ready for medium difficulty?</p>
            <div className="modal-buttons">
              <button onClick={generateNewPuzzle} className="modal-btn secondary">Another Easy</button>
              <button onClick={() => navigate('/medium')} className="modal-btn primary">Try Medium</button>
            </div>
          </div>
        </div>
      )}

      {/* UNIQUE CONTENT FOR EASY SUDOKU */}
      <div className="content-sections">
        <section className="content-section">
          <h1>Easy Sudoku Puzzles - Perfect for Beginners | SudokuGame.live</h1>
          
          <p>Welcome to the <strong>beginner-friendly easy Sudoku section</strong> at <strong>SudokuGame.live</strong>! Our easy difficulty puzzles are specifically designed for newcomers to the fascinating world of Sudoku. With 45+ pre-filled numbers, these puzzles provide the perfect foundation for learning fundamental solving techniques while building confidence in logical reasoning.</p>
          
          <h2>Why Start with Easy Sudoku at SudokuGame.live?</h2>
          <p>Easy Sudoku puzzles on <strong>SudokuGame.live</strong> are carefully crafted to introduce beginners to core solving strategies without overwhelming complexity. Each puzzle includes generous clues that guide you through the logical thought process, making them ideal for students, seniors, and anyone new to number puzzles.</p>
          
          <h2>Learn Essential Sudoku Techniques with Easy Puzzles</h2>
          <ul>
            <li><strong>Basic Scanning:</strong> Learn to systematically examine rows, columns, and 3×3 boxes for obvious number placements</li>
            <li><strong>Elimination Method:</strong> Practice identifying cells where only one number can logically fit</li>
            <li><strong>Pattern Recognition:</strong> Develop skills to spot simple numerical patterns and relationships</li>
            <li><strong>Logical Deduction:</strong> Build foundation skills in step-by-step reasoning without complex techniques</li>
            <li><strong>Grid Navigation:</strong> Master efficient scanning methods across the 9×9 grid structure</li>
          </ul>
          
          <h2>Benefits of Playing Easy Sudoku Daily</h2>
          <p>Regular easy Sudoku practice at <strong>SudokuGame.live</strong> offers numerous cognitive benefits perfect for brain training beginners:</p>
          <ul>
            <li><strong>Gentle Brain Exercise:</strong> Low-stress mental stimulation perfect for daily cognitive maintenance</li>
            <li><strong>Confidence Building:</strong> Regular success with easy puzzles builds confidence for harder challenges</li>
            <li><strong>Memory Enhancement:</strong> Improves working memory and number retention abilities</li>
            <li><strong>Focus Training:</strong> Develops sustained attention skills in a relaxed, enjoyable format</li>
            <li><strong>Stress Relief:</strong> Provides calming, meditative puzzle-solving experience</li>
          </ul>
          
          <h2>Easy Sudoku Solving Tips for Success</h2>
          <p>Master these beginner-friendly strategies to excel at easy Sudoku on <strong>SudokuGame.live</strong>:</p>
          <ul>
            <li><strong>Start with Complete Rows/Columns:</strong> Look for rows or columns with 7-8 numbers already filled</li>
            <li><strong>Focus on Common Numbers:</strong> Begin with numbers that appear most frequently across the grid</li>
            <li><strong>Use Our Hint System:</strong> Don't hesitate to use hints when learning - they're designed to teach techniques</li>
            <li><strong>Take Your Time:</strong> Easy puzzles reward patience over speed - enjoy the learning process</li>
            <li><strong>Practice Consistently:</strong> Daily easy Sudoku practice builds muscle memory for solving patterns</li>
          </ul>
          
          <h2>Perfect for Educational Settings</h2>
          <p>Easy Sudoku puzzles from <strong>SudokuGame.live</strong> are ideal for:</p>
          <ul>
            <li><strong>Classroom Learning:</strong> Teachers use our easy puzzles to introduce logic and critical thinking</li>
            <li><strong>Senior Centers:</strong> Perfect cognitive exercise for maintaining mental sharpness</li>
            <li><strong>Family Time:</strong> Parents and children can solve easy puzzles together</li>
            <li><strong>Therapy Sessions:</strong> Occupational therapists recommend easy Sudoku for cognitive rehabilitation</li>
          </ul>
          
          <h2>Ready to Progress? Try Medium Difficulty</h2>
          <p>Once you've mastered easy Sudoku puzzles and can solve them consistently, you're ready to advance to our <a href="/medium" style={{color: '#2196F3', textDecoration: 'none'}}>medium difficulty puzzles</a>. The transition introduces new solving techniques while maintaining the supportive learning environment you've come to love at <strong>SudokuGame.live</strong>.</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SudokuGame.live</h3>
            <p>Your premier destination for easy Sudoku puzzles and beginner brain training. Start your puzzle journey today!</p>
          </div>
          <div className="footer-section">
            <h4>Beginner Resources</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('easy')} className="footer-difficulty-link">Easy Sudoku Puzzles</button></li>
              <li><a href="#">Sudoku Rules for Beginners</a></li>
              <li><a href="#">Basic Solving Techniques</a></li>
              <li><a href="#">Sudoku Tutorial</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Progress to Next Level</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('medium')} className="footer-difficulty-link">Medium Sudoku</button></li>
              <li><button onClick={() => handleDifficultyChange('hard')} className="footer-difficulty-link">Hard Sudoku</button></li>
              <li><a href="/contact-us">Get Solving Help</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 SudokuGame.live. All rights reserved.</p>
            <p>Easy Sudoku puzzles for beginners | Start your brain training journey today!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EasySudokuPage;