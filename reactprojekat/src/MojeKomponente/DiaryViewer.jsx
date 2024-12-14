import React, { useState, useEffect } from 'react';
import useDiaryEntries from './useDiaryEntries';
import axios from 'axios';
import './DiaryViewer.css'; // ažuriraj CSS ispod

const DiaryViewer = () => {
  const { entries = [], loading, error, setEntries } = useDiaryEntries();
  const [currentPage, setCurrentPage] = useState(0); 
  const [newEntry, setNewEntry] = useState({ date: '', content: '' });
  const [filterDate, setFilterDate] = useState(''); // Datum za filtriranje

  // Filtrirani unosi na osnovu datuma
  const filteredEntries = filterDate
    ? entries.filter((entry) => entry.date === filterDate)
    : entries;

  // Resetujemo trenutnu stranicu ako filtrirani unosi postanu prazni
  useEffect(() => {
    if (currentPage >= filteredEntries.length) {
      setCurrentPage(0);
    }
  }, [filteredEntries, currentPage]);

  const handleNextPage = () => {
    if (currentPage < filteredEntries.length - 1) {
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
      setEntries([response.data, ...entries]);
      setNewEntry({ date: '', content: '' });
      alert('Uspešno kreiran unos u dnevnik!');
    } catch (err) {
      alert('Greška prilikom kreiranja unosa.');
    }
  };

  const handleDeleteEntry = async (id) => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni. Token nije pronađen.');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/diary-entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ažuriramo stanje uklanjanjem unosa sa datim ID-jem
      setEntries(entries.filter((entry) => entry.id !== id));
      alert('Unos uspešno obrisan.');
    } catch (err) {
      alert('Greška prilikom brisanja unosa.');
    }
  };

  if (loading) return <p>Učitavanje dnevnika...</p>;
  if (error) return <p className="error">{error}</p>;

  const currentEntry = filteredEntries[currentPage] || null;

  return (
    <div className="diary-outer-container">
      <div className="diary-viewer-container">
        <div className="diary-left-page">
          <h2 className="new-entry-title">Novi Unos</h2>
          <input
            type="date"
            className="date-input"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            placeholder="Datum"
          />
          <textarea
            className="content-textarea"
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            placeholder="Sadržaj unosa"
          />
          <button className="add-entry-button" onClick={handleCreateEntry}>Dodaj Unos</button>

          <h3 className="filter-title">Filtriraj unose</h3>
          <input
            type="date"
            className="filter-date-input"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filtriraj datum"
          />
        </div>

        <div className="diary-right-page">
          {filteredEntries.length === 0 ? (
            <div className="empty-page">
              <p>Nema dostupnih unosa za odabrani datum.</p>
            </div>
          ) : (
            <>
              {currentEntry && (
                <div className="diary-page-content">
                  <h2 className="entry-date">{currentEntry.date}</h2>
                  <p className="entry-content">{currentEntry.content}</p>
                  <button
                    className="delete-entry-button"
                    onClick={() => handleDeleteEntry(currentEntry.id)}
                  >
                    Obriši ovaj unos
                  </button>
                </div>
              )}
              <div className="diary-navigation">
                <button
                  className="page-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  &#8592; Prethodna
                </button>
                <span className="page-indicator">
                  Stranica {currentPage + 1} od {filteredEntries.length}
                </span>
                <button
                  className="page-button"
                  onClick={handleNextPage}
                  disabled={currentPage === filteredEntries.length - 1}
                >
                  Sledeća &#8594;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryViewer;
