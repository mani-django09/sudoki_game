import React, { useEffect } from 'react';
import GamePage from './GamePage';

const ExtremeSudokuPage = () => {
  useEffect(() => {
    document.title = "Extreme Sudoku Puzzles - Ultimate Mental Challenge | SudokuGame.live";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Face the ultimate Sudoku challenge at SudokuGame.live. Extreme difficulty puzzles for legendary players. The most complex number logic games requiring extraordinary skills and advanced solving techniques.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Face the ultimate Sudoku challenge at SudokuGame.live. Extreme difficulty puzzles for legendary players. The most complex number logic games requiring extraordinary skills and advanced solving techniques.';
      document.head.appendChild(newMeta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'extreme sudoku, ultimate sudoku challenge, hardest number puzzles, extreme brain games, sudoku legend level, impossible sudoku, ultimate logic challenge');
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = 'extreme sudoku, ultimate sudoku challenge, hardest number puzzles, extreme brain games, sudoku legend level, impossible sudoku, ultimate logic challenge';
      document.head.appendChild(newKeywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Extreme Sudoku Puzzles - Ultimate Challenge | SudokuGame.live');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Extreme Sudoku Puzzles - Ultimate Challenge | SudokuGame.live';
      document.head.appendChild(newOgTitle);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/extreme');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/extreme';
      document.head.appendChild(newCanonical);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Extreme Sudoku Puzzles",
      "description": "The ultimate extreme Sudoku challenge for legendary players and puzzle masters",
      "url": "https://sudokugame.live/extreme",
      "gameLocation": "https://sudokugame.live/extreme",
      "numberOfPlayers": "1",
      "genre": "Puzzle",
      "operatingSystem": "Web Browser",
      "applicationCategory": "Game",
      "difficulty": "Extreme",
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
        if (script.text.includes('Extreme Sudoku Puzzles')) {
          script.remove();
        }
      });
    };
  }, []);

  return <GamePage difficulty="extreme" />;
};

export default ExtremeSudokuPage;