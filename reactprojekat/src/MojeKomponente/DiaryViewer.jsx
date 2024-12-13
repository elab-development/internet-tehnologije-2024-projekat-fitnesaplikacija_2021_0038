import React, { useState } from 'react';
import useDiaryEntries from './useDiaryEntries';
import './DiaryViewer.css';

const DiaryViewer = () => {
  const { entries = [], loading, error } = useDiaryEntries();
  const [currentPage, setCurrentPage] = useState(0); // Trenutna stranica

  const handleNextPage = () => {
    if (currentPage < entries.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Učitavanje dnevnika...</p>;
  if (error) return <p className="error">{error}</p>;
  if (entries.length === 0) return <p>Nema dostupnih unosa u dnevniku.</p>;

  const currentEntry = entries[currentPage];

  return (
    <div className="diary-viewer-container">
      <div className="diary-page">
        <h2 className="entry-date">{currentEntry.date}</h2>
        <p className="entry-content">{currentEntry.content}</p>
      </div>
      <div className="diary-navigation">
        <button
          className="navigation-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Prethodna stranica
        </button>
        <span className="page-indicator">
          Stranica {currentPage + 1} od {entries.length}
        </span>
        <button
          className="navigation-button"
          onClick={handleNextPage}
          disabled={currentPage === entries.length - 1}
        >
          Sledeća stranica
        </button>
      </div>
    </div>
  );
};

export default DiaryViewer;
