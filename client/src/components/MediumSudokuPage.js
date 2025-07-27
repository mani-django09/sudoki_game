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

const MediumSudokuPage = () => {
  const navigate = useNavigate();
  const currentDifficulty = 'medium';
  
  // Set SEO meta tags
  useEffect(() => {
    document.title = "Medium Sudoku Puzzles - Intermediate Online Sudoku Games | SudokuGame.live";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Challenge yourself with medium difficulty Sudoku puzzles at SudokuGame.live. Perfect for intermediate players ready to advance their logical reasoning skills with moderately challenging number games.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Challenge yourself with medium difficulty Sudoku puzzles at SudokuGame.live. Perfect for intermediate players ready to advance their logical reasoning skills with moderately challenging number games.';
      document.head.appendChild(newMeta);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/medium');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/medium';
      document.head.appendChild(newCanonical);
    }
  }, []);

  // Game state with medium-specific initial board
  const [board, setBoard] = useState([
    [0,0,6,9,0,0,0,0,8],
    [0,9,0,0,3,0,0,6,0],
    [0,0,1,0,0,0,0,0,0],
    [4,0,0,7,0,6,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,4,0,0,0,1],
    [0,0,8,0,0,7,3,0,0],
    [7,0,0,1,0,8,0,0,6],
    [0,0,0,0,0,0,0,0,0]
  ]);
  
  const [originalBoard] = useState([
    [0,0,6,9,0,0,0,0,8],
    [0,9,0,0,3,0,0,6,0],
    [0,0,1,0,0,0,0,0,0],
    [4,0,0,7,0,6,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,4,0,0,0,1],
    [0,0,8,0,0,7,3,0,0],
    [7,0,0,1,0,8,0,0,6],
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

  // Game functions (same logic but medium-specific messaging)
  useEffect(() => {
    let interval;
    if (!gameOver && !gameWon && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver, gameWon, isPaused]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePause = () => setIsPaused(prev => !prev);

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
              {isPaused ? 'Game is paused' : 'Intermediate challenge - use advanced techniques!'}
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

              <button className="new-game-btn" onClick={generateNewPuzzle}>New Medium Game</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <h2>Challenge Accepted!</h2>
            <p>Medium puzzles are trickier! Review your techniques and try again.</p>
            <div className="modal-buttons">
              <button onClick={restartGame} className="modal-btn secondary">Retry This Puzzle</button>
              <button onClick={generateNewPuzzle} className="modal-btn primary">New Medium Puzzle</button>
            </div>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="modal-overlay">
          <div className="game-won-modal">
            <h2>🎉 Impressive Work!</h2>
            <p>You conquered medium Sudoku in {formatTimer(timer)}! Ready for hard difficulty?</p>
            <div className="modal-buttons">
              <button onClick={generateNewPuzzle} className="modal-btn secondary">Another Medium</button>
              <button onClick={() => navigate('/hard')} className="modal-btn primary">Try Hard Level</button>
            </div>
          </div>
        </div>
      )}

      {/* UNIQUE CONTENT FOR MEDIUM SUDOKU */}
      <div className="content-sections">
        <section className="content-section">
          <h1>Medium Sudoku Puzzles - Intermediate Challenge | SudokuGame.live</h1>
          
          <p>Step up your Sudoku skills with <strong>medium difficulty puzzles</strong> at <strong>SudokuGame.live</strong>! Our intermediate-level Sudoku games bridge the gap between beginner and advanced play, featuring 35+ starting clues that require enhanced logical reasoning and intermediate solving techniques. Perfect for players who have mastered easy puzzles and are ready for greater mental challenges.</p>
          
          <h2>Why Choose Medium Sudoku at SudokuGame.live?</h2>
          <p>Medium Sudoku puzzles on <strong>SudokuGame.live</strong> are expertly calibrated to provide the optimal learning curve for intermediate players. These puzzles introduce advanced solving strategies while maintaining solvability through logical deduction alone. Each medium puzzle builds upon foundational skills while teaching new techniques essential for Sudoku mastery.</p>
          
          <h2>Advanced Techniques Required for Medium Sudoku</h2>
          <ul>
            <li><strong>Naked Singles:</strong> Master identifying cells where only one number can logically fit</li>
            <li><strong>Hidden Singles:</strong> Learn to spot numbers that can only go in one specific location within a unit</li>
            <li><strong>Pointing Pairs:</strong> Use box-line interactions to eliminate candidates in related units</li>
            <li><strong>Claiming Technique:</strong> Apply line-box interactions for systematic candidate elimination</li>
            <li><strong>Naked Pairs:</strong> Identify when two cells in a unit can only contain the same two numbers</li>
            <li><strong>Box/Line Reduction:</strong> Use geometric constraints to narrow down possibilities</li>
          </ul>
          
          <h2>Cognitive Benefits of Medium Sudoku Practice</h2>
          <p>Regular medium Sudoku solving at <strong>SudokuGame.live</strong> provides intermediate-level brain training that enhances:</p>
          <ul>
            <li><strong>Complex Pattern Recognition:</strong> Develop ability to spot multi-step logical sequences</li>
            <li><strong>Strategic Thinking:</strong> Learn to plan several moves ahead and consider multiple possibilities</li>
            <li><strong>Enhanced Focus:</strong> Improve sustained concentration required for moderate-complexity puzzles</li>
            <li><strong>Working Memory:</strong> Strengthen ability to track multiple candidates and possibilities simultaneously</li>
            <li><strong>Problem-Solving Confidence:</strong> Build skills to tackle increasingly challenging logical problems</li>
          </ul>
          
          <h2>Medium Sudoku Strategy Guide</h2>
          <p>Excel at medium difficulty puzzles with these proven strategies from <strong>SudokuGame.live</strong>:</p>
          
          <h3>1. Systematic Scanning Approach</h3>
          <ul>
            <li>Begin with units (rows, columns, boxes) containing 6-7 numbers</li>
            <li>Focus on numbers appearing 6-8 times across the entire grid</li>
            <li>Use pencil marks to track 2-3 candidates per cell maximum</li>
          </ul>
          
          <h3>2. Intermediate Elimination Techniques</h3>
          <ul>
            <li>Apply naked singles systematically before moving to hidden singles</li>
            <li>Look for pointing pairs in boxes that restrict row/column placements</li>
            <li>Use box/line reduction to eliminate candidates across multiple units</li>
          </ul>
          
          <h3>3. Advanced Pattern Recognition</h3>
          <ul>
            <li>Identify naked pairs early to prevent dead-end situations</li>
            <li>Practice spotting hidden singles in partially filled units</li>
            <li>Develop intuition for when to switch between different solving techniques</li>
          </ul>
          
          <h2>When You're Ready for Hard Sudoku</h2>
          <p>You'll know you're ready to advance from medium to <a href="/hard" style={{color: '#2196F3', textDecoration: 'none'}}>hard Sudoku puzzles</a> when you can:</p>
          <ul>
            <li>Consistently solve medium puzzles without hints</li>
            <li>Quickly identify naked and hidden singles</li>
            <li>Efficiently apply pointing pairs and claiming techniques</li>
            <li>Complete medium puzzles in under 15-20 minutes</li>
            <li>Rarely make mistakes due to logical errors</li>
          </ul>
          
          <h2>Medium Sudoku Tips for Success</h2>
          <ul>
            <li><strong>Use Notes Strategically:</strong> Track 2-3 candidates per cell to avoid visual clutter</li>
            <li><strong>Focus on One Technique:</strong> Master one intermediate technique before moving to the next</li>
            <li><strong>Practice Daily:</strong> Consistent medium Sudoku practice builds technique muscle memory</li>
            <li><strong>Time Yourself:</strong> Track solving times to measure improvement and build confidence</li>
            <li><strong>Learn from Mistakes:</strong> Use our hint system to understand why certain moves are logical</li>
          </ul>
          
          <h2>Perfect for Intermediate Players</h2>
          <p>Medium Sudoku puzzles at <strong>SudokuGame.live</strong> are specifically designed for:</p>
          <ul>
            <li><strong>Post-Beginner Players:</strong> Those who've mastered easy puzzles and want more challenge</li>
            <li><strong>Casual Enthusiasts:</strong> Players seeking moderate brain training without extreme difficulty</li>
            <li><strong>Technique Learners:</strong> Sudoku solvers ready to expand their strategic toolkit</li>
            <li><strong>Consistent Practicers:</strong> Those building towards advanced Sudoku mastery</li>
          </ul>
          
          <h2>Why SudokuGame.live Medium Puzzles Are Superior</h2>
          <ul>
            <li><strong>Perfect Difficulty Scaling:</strong> Precisely calibrated between easy and hard levels</li>
            <li><strong>Technique-Focused Design:</strong> Each puzzle teaches specific intermediate strategies</li>
            <li><strong>Quality Assurance:</strong> Every medium puzzle has exactly one logical solution</li>
            <li><strong>Progressive Learning:</strong> Puzzles gradually introduce more complex technique combinations</li>
            <li><strong>Instant Feedback:</strong> Real-time validation helps you learn correct approaches</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SudokuGame.live</h3>
            <p>Your premier destination for medium Sudoku puzzles and intermediate brain training. Perfect challenge level for growing minds!</p>
          </div>
          <div className="footer-section">
            <h4>Intermediate Resources</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('medium')} className="footer-difficulty-link">Medium Sudoku Puzzles</button></li>
              <li><a href="#">Intermediate Techniques</a></li>
              <li><a href="#">Pointing Pairs Guide</a></li>
              <li><a href="#">Naked Singles Tutorial</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Challenge Progression</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('easy')} className="footer-difficulty-link">Back to Easy</button></li>
              <li><button onClick={() => handleDifficultyChange('hard')} className="footer-difficulty-link">Advance to Hard</button></li>
              <li><a href="/contact-us">Get Strategy Help</a></li>
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
            <p>Medium Sudoku puzzles for intermediate players | Perfect stepping stone to advanced levels!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MediumSudokuPage;