import React, { useEffect } from 'react';
import GamePage from './GamePage';

const HomePage = () => {
  useEffect(() => {
    // Set SEO meta tags for home page
    document.title = "Free Online Sudoku Puzzles - Play Daily Brain Games | SudokuGame.live";
    
    // Meta description for home page
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Play free online Sudoku puzzles at SudokuGame.live. Daily brain training with 6 difficulty levels from Easy to Extreme. No registration required - start playing instantly!');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Play free online Sudoku puzzles at SudokuGame.live. Daily brain training with 6 difficulty levels from Easy to Extreme. No registration required - start playing instantly!';
      document.head.appendChild(newMeta);
    }

    // Keywords for home page
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'sudoku online, free sudoku, sudoku puzzles, brain games, number puzzles, logic games, daily sudoku, sudoku solver, sudoku game');
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = 'sudoku online, free sudoku, sudoku puzzles, brain games, number puzzles, logic games, daily sudoku, sudoku solver, sudoku game';
      document.head.appendChild(newKeywords);
    }

    // Open Graph tags for home page
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Free Online Sudoku Puzzles - Daily Brain Training | SudokuGame.live');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Free Online Sudoku Puzzles - Daily Brain Training | SudokuGame.live';
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Challenge your mind with unlimited free Sudoku puzzles. 6 difficulty levels, smart hints, and progress tracking. Start playing now!');
    } else {
      const newOgDesc = document.createElement('meta');
      newOgDesc.setAttribute('property', 'og:description');
      newOgDesc.content = 'Challenge your mind with unlimited free Sudoku puzzles. 6 difficulty levels, smart hints, and progress tracking. Start playing now!';
      document.head.appendChild(newOgDesc);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://sudokugame.live');
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.content = 'https://sudokugame.live';
      document.head.appendChild(newOgUrl);
    }

    // Canonical URL for home page
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://sudokugame.live');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = 'https://sudokugame.live';
      document.head.appendChild(newCanonical);
    }

    // Structured data for home page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SudokuGame.live",
      "url": "https://sudokugame.live",
      "description": "Free online Sudoku puzzles with multiple difficulty levels and brain training features",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sudokugame.live/{search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Game",
        "name": "Online Sudoku Puzzles",
        "description": "Free Sudoku puzzles with 6 difficulty levels from Easy to Extreme",
        "genre": "Puzzle",
        "numberOfPlayers": "1",
        "operatingSystem": "Web Browser",
        "applicationCategory": "Game",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text.includes('SudokuGame.live')) {
          script.remove();
        }
      });
    };
  }, []);

  return <GamePage defaultDifficulty="easy" />;
};

export default HomePage;