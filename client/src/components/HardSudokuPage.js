import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuBoard from './SudokuBoard';
import GameControls from './GameControls';

const DIFFICULTY_CONFIG = {
  easy: { name: 'Easy', clues: 45 },
  medium: { name: 'Medium', clues: 35 },
  hard: { name: 'Hard', clues: 28 },
  expert: { name: 'Expert', clues: 22 },
  master: { name: 'Master', clues: 18 },
  extreme: { name: 'Extreme', clues: 15 }
};

const HardSudokuPage = () => {
  const navigate = useNavigate();
  const currentDifficulty = 'hard';
  
  useEffect(() => {
    document.title = "Hard Sudoku Puzzles - Challenging Online Sudoku Games | SudokuGame.live";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master hard Sudoku puzzles at SudokuGame.live. Advanced number logic games for experienced players seeking challenging brain teasers. Test your problem-solving skills with difficult Sudoku variations.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Master hard Sudoku puzzles at SudokuGame.live. Advanced number logic games for experienced players seeking challenging brain teasers. Test your problem-solving skills with difficult Sudoku variations.';
      document.head.appendChild(newMeta);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/hard');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/hard';
      document.head.appendChild(newCanonical);
    }
  }, []);

  // Hard difficulty board with fewer clues
  const [board, setBoard] = useState([
    [0,0,6,0,0,0,0,0,8],
    [0,9,0,0,0,0,0,6,0],
    [0,0,1,0,0,0,0,0,0],
    [4,0,0,7,0,0,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,0,0,0,0,1],
    [0,0,0,0,0,7,3,0,0],
    [7,0,0,1,0,0,0,0,6],
    [0,0,0,0,0,0,0,0,0]
  ]);
  
  const [originalBoard] = useState([
    [0,0,6,0,0,0,0,0,8],
    [0,9,0,0,0,0,0,6,0],
    [0,0,1,0,0,0,0,0,0],
    [4,0,0,7,0,0,0,0,5],
    [0,0,0,0,0,0,0,2,0],
    [0,0,9,0,0,0,0,0,1],
    [0,0,0,0,0,7,3,0,0],
    [7,0,0,1,0,0,0,0,6],
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
  const [hintsLeft, setHintsLeft] = useState(2); // Fewer hints for hard
  const [moves, setMoves] = useState([]);

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
    setHintsLeft(2);
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
    setHintsLeft(2);
    setMoves([]);
  };

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">SudokuGame</span>
            <span className="logo-domain">.live</span>
          </div>
        </div>
      </header>

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
              {isPaused ? 'Game is paused' : 'Hard challenge - advanced techniques required!'}
            </div>
          </div>

          <div className="game-sidebar">
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

              <button className="new-game-btn" onClick={generateNewPuzzle}>New Hard Game</button>
            </div>
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <h2>Tough Challenge!</h2>
            <p>Hard Sudoku tests your advanced skills. Analyze your approach and try again!</p>
            <div className="modal-buttons">
              <button onClick={restartGame} className="modal-btn secondary">Analyze & Retry</button>
              <button onClick={generateNewPuzzle} className="modal-btn primary">New Hard Puzzle</button>
            </div>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="modal-overlay">
          <div className="game-won-modal">
            <h2>🏆 Outstanding!</h2>
            <p>You mastered hard Sudoku in {formatTimer(timer)}! Ready for expert level?</p>
            <div className="modal-buttons">
              <button onClick={generateNewPuzzle} className="modal-btn secondary">Another Hard</button>
              <button onClick={() => navigate('/expert')} className="modal-btn primary">Expert Challenge</button>
            </div>
          </div>
        </div>
      )}

      {/* UNIQUE CONTENT FOR HARD SUDOKU */}
      <div className="content-sections">
        <section className="content-section">
          <h1>Hard Sudoku Puzzles - Advanced Brain Challenge | SudokuGame.live</h1>
          
          <p>Enter the realm of <strong>challenging hard Sudoku puzzles</strong> at <strong>SudokuGame.live</strong>! Our advanced difficulty level features only 28+ starting clues, demanding sophisticated solving techniques and exceptional logical reasoning skills. These puzzles are crafted for experienced players who have mastered intermediate strategies and crave intellectual stimulation.</p>
          
          <h2>Advanced Techniques Essential for Hard Sudoku</h2>
          <ul>
            <li><strong>X-Wing Pattern:</strong> Master this powerful technique for eliminating candidates across multiple rows and columns</li>
            <li><strong>Naked Triples:</strong> Identify when three cells in a unit can only contain the same three numbers</li>
            <li><strong>Box/Line Reduction:</strong> Use geometric constraints to systematically eliminate possibilities</li>
            <li><strong>Intersection Removal:</strong> Apply advanced claiming and pointing pair techniques</li>
            <li><strong>Hidden Pairs/Triples:</strong> Spot when specific numbers can only appear in certain cell combinations</li>
            <li><strong>Simple Coloring:</strong> Use basic coloring techniques to track candidate relationships</li>
          </ul>
          
          <h2>Why Hard Sudoku at SudokuGame.live is Superior</h2>
          <p>Our hard Sudoku puzzles represent the perfect balance between extreme challenge and logical solvability. Each puzzle is guaranteed to have exactly one solution achievable through advanced but fair techniques - no guessing required!</p>
          
          <h2>Mental Benefits of Hard Sudoku Training</h2>
          <ul>
            <li><strong>Enhanced Strategic Planning:</strong> Develop ability to plan complex multi-step solving sequences</li>
            <li><strong>Pattern Mastery:</strong> Build expertise in recognizing sophisticated numerical relationships</li>
            <li><strong>Cognitive Flexibility:</strong> Strengthen ability to switch between different solving approaches dynamically</li>
            <li><strong>Advanced Problem Solving:</strong> Master systematic approaches to complex logical challenges</li>
            <li><strong>Mental Endurance:</strong> Build sustained concentration for extended problem-solving sessions</li>
          </ul>
          
          <h2>Hard Sudoku Mastery Strategy</h2>
          <p>Excel at hard difficulty with these expert-level approaches:</p>
          
          <h3>1. Advanced Scanning Methodology</h3>
          <ul>
            <li>Begin with systematic naked single searches across all units</li>
            <li>Progress to hidden single identification in sparse areas</li>
            <li>Apply intersection techniques before attempting pattern-based methods</li>
          </ul>
          
          <h3>2. Pattern Recognition Excellence</h3>
          <ul>
            <li>Develop intuition for X-Wing patterns in partially filled grids</li>
            <li>Practice identifying naked and hidden subset opportunities</li>
            <li>Master the timing of when to apply advanced versus basic techniques</li>
          </ul>
          
          <h3>3. Strategic Depth</h3>
          <ul>
            <li>Learn to recognize when simpler techniques have been exhausted</li>
            <li>Develop systematic approaches to candidate management</li>
            <li>Build confidence in applying multiple advanced techniques sequentially</li>
          </ul>
          
          <h2>Expert-Level Success Tips</h2>
          <ul>
            <li><strong>Master Pencil Marks:</strong> Maintain clean, organized candidate tracking for complex analysis</li>
            <li><strong>Systematic Progression:</strong> Always exhaust simpler techniques before advancing to complex patterns</li>
            <li><strong>Patient Analysis:</strong> Hard puzzles reward careful analysis over speed-based approaches</li>
            <li><strong>Technique Integration:</strong> Learn to combine multiple advanced techniques in single solving sessions</li>
            <li><strong>Error Prevention:</strong> Double-check critical moves to avoid costly logical mistakes</li>
          </ul>
          
          <h2>Ready for Expert Level?</h2>
          <p>You're prepared to advance to <a href="/expert" style={{color: '#2196F3', textDecoration: 'none'}}>expert Sudoku puzzles</a> when you can:</p>
          <ul>
            <li>Consistently solve hard puzzles without hints</li>
            <li>Efficiently apply X-Wing and advanced subset techniques</li>
            <li>Complete hard puzzles in 25-35 minutes</li>
            <li>Rarely make logical errors or require backtracking</li>
            <li>Recognize when advanced techniques are needed vs. basic methods</li>
          </ul>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SudokuGame.live</h3>
            <p>Your premier destination for hard Sudoku puzzles and advanced brain training. Challenge your limits!</p>
          </div>
          <div className="footer-section">
            <h4>Advanced Resources</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('hard')} className="footer-difficulty-link">Hard Sudoku Puzzles</button></li>
              <li><a href="#">X-Wing Technique Guide</a></li>
              <li><a href="#">Advanced Patterns</a></li>
              <li><a href="#">Expert Strategies</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Challenge Progression</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleDifficultyChange('medium')} className="footer-difficulty-link">Back to Medium</button></li>
              <li><button onClick={() => handleDifficultyChange('expert')} className="footer-difficulty-link">Advance to Expert</button></li>
              <li><a href="/contact-us">Get Expert Help</a></li>
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
            <p>Hard Sudoku puzzles for advanced players | Master complex solving techniques!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HardSudokuPage;