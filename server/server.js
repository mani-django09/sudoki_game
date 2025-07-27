const express = require('express');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

console.log('🚀 Starting Sudoku Server...');

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (test this first)
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'Server is running!', 
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import and use sudoku routes (we'll add this after basic server works)
try {
  const sudokuRoutes = require('./routes/sudoku');
  app.use('/api/sudoku', sudokuRoutes);
  console.log('✅ Sudoku routes loaded successfully');
} catch (error) {
  console.warn('⚠️  Sudoku routes not loaded:', error.message);
  
  // Fallback basic sudoku route
  app.post('/api/sudoku/generate', (req, res) => {
    res.json({
      success: true,
      puzzle: Array(9).fill().map(() => Array(9).fill(0)),
      solution: Array(9).fill().map(() => Array(9).fill(1)),
      difficulty: 'medium',
      message: 'Fallback response - sudoku generator not loaded'
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎮 Client URL: ${CLIENT_URL}`);
  console.log(`📁 Working directory: ${process.cwd()}`);
});