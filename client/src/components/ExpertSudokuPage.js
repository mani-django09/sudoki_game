import React, { useEffect } from 'react';
import GamePage from './GamePage';

const ExpertSudokuPage = () => {
  useEffect(() => {
    // Set meta tags for SEO
    document.title = "Expert Sudoku Puzzles - Master Level Brain Games | SudokuGame.live";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conquer expert level Sudoku puzzles at SudokuGame.live. Ultimate brain training for Sudoku masters. Advanced logical reasoning puzzles requiring sophisticated solving techniques and pattern recognition.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Conquer expert level Sudoku puzzles at SudokuGame.live. Ultimate brain training for Sudoku masters. Advanced logical reasoning puzzles requiring sophisticated solving techniques and pattern recognition.';
      document.head.appendChild(newMeta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'expert sudoku, sudoku master level, advanced brain games, expert number puzzles, sudoku techniques, complex logic puzzles, challenging brain teasers, sudoku masters');
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = 'expert sudoku, sudoku master level, advanced brain games, expert number puzzles, sudoku techniques, complex logic puzzles, challenging brain teasers, sudoku masters';
      document.head.appendChild(newKeywords);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Expert Sudoku Puzzles - For True Masters | SudokuGame.live');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Expert Sudoku Puzzles - For True Masters | SudokuGame.live';
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Challenge your expertise with the most sophisticated Sudoku puzzles. Only for true masters at SudokuGame.live.');
    } else {
      const newOgDesc = document.createElement('meta');
      newOgDesc.setAttribute('property', 'og:description');
      newOgDesc.content = 'Challenge your expertise with the most sophisticated Sudoku puzzles. Only for true masters at SudokuGame.live.';
      document.head.appendChild(newOgDesc);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://sudokugame.live/expert');
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.content = 'https://sudokugame.live/expert';
      document.head.appendChild(newOgUrl);
    }

    // Canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live/expert');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live/expert';
      document.head.appendChild(newCanonical);
    }

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Expert Sudoku Puzzles",
      "description": "Expert level Sudoku puzzles for advanced players and puzzle masters",
      "url": "https://sudokugame.live/expert",
      "gameLocation": "https://sudokugame.live/expert",
      "numberOfPlayers": "1",
      "genre": "Puzzle",
      "operatingSystem": "Web Browser",
      "applicationCategory": "Game",
      "difficulty": "Expert",
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
        if (script.text.includes('Expert Sudoku Puzzles')) {
          script.remove();
        }
      });
    };
  }, []);

  return <GamePage difficulty="expert" />;
};

export default ExpertSudokuPage;