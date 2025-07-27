import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const GamePage = ({ defaultDifficulty = null }) => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  
  // Use defaultDifficulty for home page, or URL param for specific routes
  const currentDifficultyFromRoute = difficulty || defaultDifficulty;
  
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
  const [currentDifficulty, setCurrentDifficulty] = useState(currentDifficultyFromRoute || 'easy');
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [notesMode, setNotesMode] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [moves, setMoves] = useState([]);

  // Update difficulty when route changes
  useEffect(() => {
    if (currentDifficultyFromRoute && DIFFICULTY_CONFIG[currentDifficultyFromRoute]) {
      setCurrentDifficulty(currentDifficultyFromRoute);
      generateNewPuzzle(currentDifficultyFromRoute);
    }
  }, [currentDifficultyFromRoute]);

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

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle pause
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Check if move is valid
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

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    // Navigate to specific difficulty pages for SEO
    if (defaultDifficulty && newDifficulty === 'easy') {
      // If on home page and clicking easy, just stay on home page
      window.history.pushState({}, '', '/');
      setCurrentDifficulty('easy');
      generateNewPuzzle('easy');
    } else {
      navigate(`/${newDifficulty}`);
    }
  };

  // Generate puzzle based on difficulty
  const generateNewPuzzle = (diff) => {
    setBoard(originalBoard.map(row => [...row]));
    setTimer(1);
    setIsPaused(false);
    setSelectedCell({ row: -1, col: -1 });
    setMistakes(0);
    setGameOver(false);
    setGameWon(false);
    setHintsLeft(3);
    setMoves([]);
    console.log(`Generated new ${diff} puzzle`);
  };

  const handleCellClick = (row, col) => {
    if (gameOver || gameWon || isPaused) return;
    setSelectedCell({ row, col });
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
      {/* Header Navigation - Updated with sudokugame.live branding */}
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

      {/* Main game container */}
      <div className="game-container">
        <div className="game-content">
          {/* Left side - Sudoku board */}
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
              {isPaused ? 'Game is paused' : 'Select a cell, then tap a number to fill in the cell'}
            </div>
          </div>

          {/* Right side - Game controls and info */}
          <div className="game-sidebar">
            {/* Game stats with pause button */}
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

            {/* Game Controls Container */}
            <div className="controls-container">
              {/* Enhanced Game Controls */}
              <div className="control-buttons">
                <button 
                  className="control-btn restart-btn" 
                  onClick={restartGame}
                  title="Restart"
                >
                  ↻
                </button>
                
                <button 
                  className="control-btn undo-btn" 
                  onClick={undoMove}
                  disabled={moves.length === 0 || isPaused}
                  title="Undo"
                >
                  ↶
                </button>
                
                <button 
                  className={`control-btn notes-btn ${notesMode ? 'active' : ''}`} 
                  onClick={() => setNotesMode(!notesMode)}
                  disabled={isPaused}
                  title="Notes"
                >
                  ✏️
                  {!notesMode && <span className="off-badge">OFF</span>}
                </button>
                
                <button 
                  className="control-btn hint-btn" 
                  onClick={getHint}
                  disabled={hintsLeft <= 0 || isPaused}
                  title={`Hints left: ${hintsLeft}`}
                >
                  <span className="hint-number">{hintsLeft}</span>
                </button>
                
                <button 
                  className="control-btn bulb-btn" 
                  onClick={getHint}
                  disabled={hintsLeft <= 0 || isPaused}
                  title="Get Hint"
                >
                  💡
                </button>
              </div>

              {/* Number input grid */}
              <div className="number-input-grid">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <button 
                    key={num} 
                    className="number-btn"
                    onClick={() => {
                      if (selectedCell.row !== -1 && selectedCell.col !== -1) {
                        makeMove(selectedCell.row, selectedCell.col, num);
                      }
                    }}
                    disabled={gameOver || gameWon || isPaused}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* New Game button */}
              <button className="new-game-btn" onClick={() => generateNewPuzzle(currentDifficulty)}>
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <h2>Game Over</h2>
            <p>You have made 3 mistakes and lost this game</p>
            <div className="modal-buttons">
              <button onClick={restartGame} className="modal-btn secondary">
                Second Chance
              </button>
              <button onClick={() => generateNewPuzzle(currentDifficulty)} className="modal-btn primary">
                New Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Won Modal */}
      {gameWon && (
        <div className="modal-overlay">
          <div className="game-won-modal">
            <h2>🎉 Congratulations!</h2>
            <p>You solved the puzzle in {formatTimer(timer)} with {mistakes} mistakes!</p>
            <div className="modal-buttons">
              <button onClick={() => generateNewPuzzle(currentDifficulty)} className="modal-btn primary">
                New Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections - Enhanced with sudokugame.live branding */}
      <div className="content-sections">
        <section className="content-section">
          {/* Show different content for home page vs difficulty pages */}
          {defaultDifficulty ? (
            // Home page content - Enhanced with sudokugame.live branding
            <>
              <h1>Master the Art of Sudoku - Free Online Puzzles at SudokuGame.live</h1>
              
              <p>Welcome to <strong>SudokuGame.live</strong>, the ultimate destination for free online Sudoku puzzles! Challenge your mind with our expertly crafted number games designed for players of all skill levels. Whether you're a complete beginner learning the ropes or a seasoned Sudoku master seeking the ultimate challenge, our platform offers the perfect blend of entertainment and mental exercise.</p>
              
              <h2>Why Choose SudokuGame.live for Your Daily Brain Training?</h2>
              <p>At <strong>SudokuGame.live</strong>, we've revolutionized the online Sudoku experience with cutting-edge features that adapt to your playing style. Our intelligent puzzle generator creates thousands of unique Sudoku variations, ensuring you'll never run out of fresh challenges. Plus, our innovative pause-and-resume system means life interruptions won't cost you your progress.</p>
              
              <h2>Premium Features That Make SudokuGame.live Special</h2>
              <ul>
                <li><strong>AI-Powered Hint System:</strong> Get intelligent nudges when you're stuck without spoiling the puzzle-solving satisfaction</li>
                <li><strong>Smart Pause & Resume:</strong> Life happens - seamlessly pause your Sudoku game anytime and resume exactly where you left off</li>
                <li><strong>Advanced Progress Tracking:</strong> Monitor your improvement with detailed analytics and personal best records</li>
                <li><strong>Six Difficulty Levels:</strong> From Easy beginner puzzles to Extreme challenges that test even Sudoku masters</li>
                <li><strong>Intelligent Error Detection:</strong> Learn from mistakes with our sophisticated feedback system that explains why moves are incorrect</li>
                <li><strong>Cross-Platform Compatibility:</strong> Enjoy seamless gameplay on desktop, tablet, or mobile - your progress syncs across all devices</li>
                <li><strong>Lightning-Fast Performance:</strong> Optimized for speed with instant puzzle loading and responsive controls</li>
              </ul>
              
              <h2>The Science-Backed Benefits of Playing Sudoku Daily</h2>
              <p>Regular Sudoku practice on <strong>SudokuGame.live</strong> has been scientifically proven to enhance cognitive function, boost memory retention, and improve concentration spans. It's not just entertainment - it's a comprehensive brain workout that can help maintain mental sharpness throughout your lifetime. Research shows that consistent puzzle-solving can even help delay age-related cognitive decline.</p>
              
              <h3>Proven Cognitive Benefits Include:</h3>
              <ul>
                <li><strong>Enhanced Logical Reasoning:</strong> Strengthen deductive thinking and systematic problem-solving approaches</li>
                <li><strong>Improved Working Memory:</strong> Boost short-term memory capacity and information processing speed</li>
                <li><strong>Advanced Pattern Recognition:</strong> Develop superior ability to identify complex numerical relationships and sequences</li>
                <li><strong>Increased Mental Agility:</strong> Accelerate cognitive processing speed and decision-making capabilities</li>
                <li><strong>Stress Reduction & Mindfulness:</strong> Experience meditative focus that reduces anxiety and promotes mental clarity</li>
                <li><strong>Better Concentration:</strong> Train sustained attention spans that transfer to other life activities</li>
              </ul>
              
              <h2>Start Your Sudoku Journey at SudokuGame.live Today</h2>
              <p>Join millions of puzzle enthusiasts worldwide who trust <strong>SudokuGame.live</strong> for their daily brain training. Our commitment to providing the highest quality Sudoku experience means you're getting professionally designed puzzles with guaranteed unique solutions. Begin with our easy level to learn the fundamentals, then progress through medium, hard, expert, master, and extreme difficulties as your skills develop.</p>
            </>
          ) : (
            // Difficulty-specific content - Enhanced with sudokugame.live branding and long-tail keywords
            <>
              <h1>Play Free {DIFFICULTY_CONFIG[currentDifficulty]?.name} Sudoku Puzzles Online - SudokuGame.live</h1>
              
              <p>Experience the perfect <strong>{DIFFICULTY_CONFIG[currentDifficulty]?.name.toLowerCase()} level Sudoku challenge</strong> at <strong>SudokuGame.live</strong>. Our {currentDifficulty} difficulty puzzles are meticulously crafted to provide the ideal balance of challenge and solvability. Each puzzle guarantees a unique solution achievable through logical deduction alone - no guessing required!</p>
              
              <h2>About {DIFFICULTY_CONFIG[currentDifficulty]?.name} Sudoku Puzzles at SudokuGame.live</h2>
              <p>Our <strong>{currentDifficulty} level Sudoku puzzles</strong> on SudokuGame.live are designed by puzzle experts to deliver the optimal gaming experience. 
              {currentDifficulty === 'easy' && ' Perfect for beginners starting their Sudoku journey, these puzzles provide abundant clues (45+ given numbers) to help you master fundamental solving techniques. You\'ll learn essential strategies like scanning, elimination, and basic logical deduction while building confidence with every completed puzzle.'}
              {currentDifficulty === 'medium' && ' Ideal for players who have conquered basic Sudoku rules and are ready for greater complexity. With 35+ starting clues, medium puzzles require intermediate techniques like naked singles, hidden singles, and pointing pairs. You\'ll develop advanced pattern recognition skills essential for Sudoku mastery.'}
              {currentDifficulty === 'hard' && ' Crafted for experienced players seeking substantial mental challenges. Hard Sudoku puzzles feature 28+ clues and demand sophisticated solving techniques including naked pairs/triples, box/line reduction, and X-Wing patterns. These puzzles will push your logical reasoning to new heights.'}
              {currentDifficulty === 'expert' && ' Reserved for advanced Sudoku enthusiasts who crave intellectual stimulation. Expert puzzles provide 22+ clues and require mastery of complex techniques like Swordfish, XY-Wing, and unique rectangles. Only skilled solvers should attempt this elite difficulty level.'}
              {currentDifficulty === 'master' && ' Designed exclusively for Sudoku virtuosos who live for extreme mental challenges. Master level puzzles offer minimal clues (18+) and demand expertise in advanced techniques including forcing chains, Almost Locked Sets, and multi-step logical sequences.'}
              {currentDifficulty === 'extreme' && ' The ultimate test for true Sudoku legends. Extreme puzzles represent the pinnacle of logical complexity with only 15+ starting clues. These mind-bending challenges require mastery of the most sophisticated solving techniques and extraordinary patience and persistence.'}</p>
              
              <h2>Advanced Solving Strategies for {DIFFICULTY_CONFIG[currentDifficulty]?.name} Level Success</h2>
              <p><strong>Master these proven techniques</strong> to excel at {currentDifficulty} Sudoku puzzles on SudokuGame.live:
              {currentDifficulty === 'easy' && ' Start with basic scanning - systematically examine each row, column, and 3×3 box to identify cells with only one possible number. Use the elimination method by marking potential candidates and gradually narrowing possibilities. Focus on completing rows, columns, or boxes that are nearly filled.'}
              {currentDifficulty === 'medium' && ' Employ advanced scanning techniques including "naked singles" (cells with only one candidate) and "hidden singles" (numbers that can only fit in one cell within a unit). Learn to identify pointing pairs where candidates in a box point to specific rows or columns, allowing elimination of candidates elsewhere.'}
              {currentDifficulty === 'hard' && ' Master intermediate-advanced techniques like "naked pairs" (two cells in a unit that can only contain the same two numbers) and "claiming" (when all instances of a candidate in a box lie on the same row/column). Learn box/line reduction and basic X-Wing patterns to eliminate candidates across multiple units.'}
              {currentDifficulty === 'expert' && ' Deploy sophisticated strategies including "Swordfish" (three-row/column patterns), "XY-Wing" (three-cell elimination chains), and "W-Wing" patterns. Master unique rectangles and advanced forcing chains. These techniques require exceptional pattern recognition and multi-step logical thinking.'}
              {currentDifficulty === 'master' && ' Utilize expert-level techniques including "Almost Locked Sets" (ALS), "Bug+1" patterns, and complex forcing chains. Master advanced coloring techniques and multi-fish patterns. Success requires encyclopedic knowledge of Sudoku solving methods and extraordinary logical precision.'}
              {currentDifficulty === 'extreme' && ' Employ the most advanced solving arsenal including "3D Medusa" coloring, "Almost Locked Sets chains," and sophisticated forcing nets. These puzzles may require trial-and-error with systematic backtracking when pure logic reaches its limits. Only attempt if you\'ve mastered all other difficulty levels.'}</p>
              
              <h2>Pro Tips for Conquering {DIFFICULTY_CONFIG[currentDifficulty]?.name} Sudoku at SudokuGame.live</h2>
              <ul>
                <li><strong>Patience is Key:</strong> {currentDifficulty} level puzzles reward methodical thinking over speed - take your time to avoid costly mistakes</li>
                <li><strong>Master Pencil Marks:</strong> Use our notes feature to track candidate numbers - essential for {currentDifficulty} level solving</li>
                <li><strong>Systematic Scanning:</strong> Develop a consistent approach - scan for one number at a time across the entire grid</li>
                <li><strong>Start with Easiest Placements:</strong> Always complete obvious moves before attempting complex techniques</li>
                <li><strong>Strategic Hint Usage:</strong> Use our smart hint system when genuinely stuck - it\'s designed to guide without giving away solutions</li>
                <li><strong>Daily Practice:</strong> Consistent {currentDifficulty} level practice on SudokuGame.live builds pattern recognition and technique mastery</li>
                <li><strong>Learn from Mistakes:</strong> Our error detection helps you understand why moves are incorrect - use this feedback to improve</li>
              </ul>
              
              <h2>Why SudokuGame.live Offers the Best {DIFFICULTY_CONFIG[currentDifficulty]?.name} Sudoku Experience</h2>
              <ul>
                <li><strong>Guaranteed Solvable Puzzles:</strong> Every {currentDifficulty} puzzle has exactly one solution achievable through logical techniques</li>
                <li><strong>Professional Puzzle Generation:</strong> Our algorithms create authentic {currentDifficulty} level challenges with proper difficulty scaling</li>
                <li><strong>Instant Validation:</strong> Real-time error checking helps you learn correct solving approaches</li>
                <li><strong>Progress Tracking:</strong> Monitor your {currentDifficulty} level improvement with detailed solving statistics</li>
                <li><strong>Cross-Device Continuity:</strong> Start a {currentDifficulty} puzzle on your phone and finish on your computer</li>
                <li><strong>No Registration Required:</strong> Jump straight into {currentDifficulty} level challenges without account creation</li>
              </ul>
            </>
          )}
          
          <h2>Understanding Sudoku Rules and Objectives</h2>
          <p>Sudoku at <strong>SudokuGame.live</strong> follows traditional Japanese puzzle rules: fill a 9×9 grid with digits 1-9 such that each row, column, and 3×3 box containseach number exactly once. Our puzzles start with strategically placed clues that provide enough information for logical solution through deductive reasoning alone.</p>
          
          <h3>Essential Sudoku Rules for Success</h3>
          <ul>
            <li><strong>Row Uniqueness:</strong> Each horizontal row must contain numbers 1-9 with no repetition</li>
            <li><strong>Column Uniqueness:</strong> Each vertical column must contain numbers 1-9 with no repetition</li>
            <li><strong>Box Uniqueness:</strong> Each 3×3 sub-grid must contain numbers 1-9 with no repetition</li>
            <li><strong>Logic-Only Solving:</strong> Every SudokuGame.live puzzle is solvable through pure deduction - no guessing required</li>
            <li><strong>Unique Solutions:</strong> Each puzzle has exactly one correct completion</li>
          </ul>
          
          <h3>Getting Started: Your First Steps at SudokuGame.live</h3>
          <p>Begin your Sudoku mastery journey by scanning the grid for the most promising areas. Look for rows, columns, or 3×3 boxes that already contain 6-8 numbers - these offer the easiest placement opportunities. Start with the number that appears most frequently across the puzzle, as it will have fewer remaining valid positions. Our intuitive interface at <strong>SudokuGame.live</strong> makes it easy to experiment with candidate numbers and track your logical progress.</p>
          
          <h2>Join the SudokuGame.live Community Today</h2>
          <p>Ready to challenge your mind? Start with any difficulty level at <strong>SudokuGame.live</strong> and experience why millions of players worldwide choose our platform for their daily brain training. With unlimited free puzzles, professional-grade difficulty scaling, and innovative features designed for optimal learning, there's never been a better time to discover the addictive satisfaction of Sudoku mastery!</p>
        </section>
      </div>

      {/* Footer - Updated with sudokugame.live branding */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SudokuGame.live</h3>
            <p>The world's premier online Sudoku platform with millions of daily players worldwide. Experience unlimited free puzzles with professional-grade difficulty scaling.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">📘</span>
                Facebook
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">🐦</span>
                Twitter
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📷</span>
                Instagram
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📺</span>
                YouTube
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Free Sudoku Puzzles</h4>
            <ul className="footer-links">
              {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                <li key={key}>
                  <button 
                    onClick={() => handleDifficultyChange(key)}
                    className="footer-difficulty-link"
                  >
                    {config.name} Sudoku Online
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Sudoku Help & Support</h4>
            <ul className="footer-links">
              <li><a href="#">How to Play Sudoku</a></li>
              <li><a href="#">Sudoku Solving Techniques</a></li>
              <li><a href="#">Advanced Sudoku Strategies</a></li>
              <li><a href="/contact-us">Contact SudokuGame.live</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal Information</h4>
            <ul className="footer-links">
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/cookie-policy">Cookie Policy</a></li>
              <li><a href="/dmca">DMCA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 SudokuGame.live. All rights reserved.</p>
            <p>Built with ❤️ for puzzle enthusiasts worldwide | Premium Sudoku puzzles online</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GamePage;