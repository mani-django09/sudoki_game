import React, { useEffect } from 'react';
import GamePage from './GamePage';

const MasterSudokuPage = () => {
  useEffect(() => {
    document.title = "Master Sudoku Puzzles - Elite Level Brain Training | SudokuGame.live";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master the most challenging Sudoku puzzles at SudokuGame.live. Elite-level brain training for serious puzzle enthusiasts. Advanced logical reasoning games requiring mastery of complex solving techniques.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Master the most challenging Sudoku puzzles at SudokuGame.live. Elite-level brain training for serious puzzle enthusiasts. Advanced logical reasoning games requiring mastery of complex solving techniques.';
      document.head.appendChild(newMeta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'master sudoku, elite sudoku puzzles, advanced brain training, master level logic games, complex number puzzles, sudoku grandmaster, ultimate brain challenge');
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = 'master sudoku, elite sudoku puzzles, advanced brain training, master level logic games, complex number puzzles, sudoku grandmaster, ultimate brain challenge';
      document.head.appendChild(newKeywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Master Sudoku Puzzles - Elite Challenge | SudokuGame.live');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Master Sudoku Puzzles - Elite Challenge | SudokuGame.live';
      document.head.appendChild(newOgTitle);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/master');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/master';
      document.head.appendChild(newCanonical);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Master Sudoku Puzzles",
      "description": "Elite master level Sudoku puzzles for the most advanced players and puzzle virtuosos",
      "url": "https://sudokugame.live/master",
      "gameLocation": "https://sudokugame.live/master",
      "numberOfPlayers": "1",
      "genre": "Puzzle",
      "operatingSystem": "Web Browser",
      "applicationCategory": "Game",
      "difficulty": "Master",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text.includes('Master Sudoku Puzzles')) {
          script.remove();
        }
      });
    };
  }, []);

  return <GamePage difficulty="master" />;
};

export default MasterSudokuPage;