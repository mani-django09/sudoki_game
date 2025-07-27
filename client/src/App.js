import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EasySudokuPage from './components/EasySudokuPage';
import MediumSudokuPage from './components/MediumSudokuPage';
import HardSudokuPage from './components/HardSudokuPage';
import ExpertSudokuPage from './components/ExpertSudokuPage';
import MasterSudokuPage from './components/MasterSudokuPage';
import ExtremeSudokuPage from './components/ExtremeSudokuPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import './styles/sudoku.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page - defaults to easy sudoku */}
        <Route path="/" element={<HomePage />} />
        
        {/* Separate SEO-optimized difficulty pages */}
        <Route path="/easy" element={<EasySudokuPage />} />
        <Route path="/medium" element={<MediumSudokuPage />} />
        <Route path="/hard" element={<HardSudokuPage />} />
        <Route path="/expert" element={<ExpertSudokuPage />} />
        <Route path="/master" element={<MasterSudokuPage />} />
        <Route path="/extreme" element={<ExtremeSudokuPage />} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;