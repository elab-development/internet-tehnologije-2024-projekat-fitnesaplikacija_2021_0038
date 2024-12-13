import React, { useState } from 'react';
import useDiaryEntries from './useDiaryEntries';
import axios from 'axios';
import './DiaryViewer.css';

const DiaryViewer = () => {
  const { entries = [], loading, error, setEntries } = useDiaryEntries();
  const [currentPage, setCurrentPage] = useState(0); // Trenutna stranica
  const [newEntry, setNewEntry] = useState({ date: '', content: '' });

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

  const handleCreateEntry = async () => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni. Token nije pronađen.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/diary-entries', newEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries([response.data.data, ...entries]); // Dodajemo novi unos na početak niza
      setNewEntry({ date: '', content: '' });
      alert('Uspešno kreiran unos u dnevnik!');
    } catch (err) {
      alert('Greška prilikom kreiranja unosa.');
    }
  };

  if (loading) return <p>Učitavanje dnevnika...</p>;
  if (error) return <p className="error">{error}</p>;
  if (entries.length === 0) return <p>Nema dostupnih unosa u dnevniku.</p>;

  const currentEntry = entries[currentPage];

  return (
    <div className="diary-viewer-container">
      <div className="create-entry">
        <h2>Kreiraj novi unos</h2>
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Datum"
        />
        <textarea
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          placeholder="Sadržaj unosa"
        />
        <button onClick={handleCreateEntry}>Dodaj unos</button>
      </div>

      {entries.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default DiaryViewer;
