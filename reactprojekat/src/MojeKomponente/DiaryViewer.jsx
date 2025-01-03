import React, { useState, useEffect, useRef } from 'react';
import useDiaryEntries from './useDiaryEntries';
import axios from 'axios';
import './DiaryViewer.css';

const DiaryViewer = () => {
  const { entries = [], loading, error, setEntries } = useDiaryEntries();
  const [currentPage, setCurrentPage] = useState(0); 
  const [newEntry, setNewEntry] = useState({ date: '', content: '' });
  const [filterDate, setFilterDate] = useState('');

  // Dodatni state za izmenu
  const [isEditing, setIsEditing] = useState(false);
  const [editEntryId, setEditEntryId] = useState(null);

  const editorRef = useRef(null);

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
      // Uzimamo HTML sadržaj iz contentEditable polja
      const contentHtml = editorRef.current.innerHTML;

      const response = await axios.post('http://127.0.0.1:8000/api/diary-entries', 
        { date: newEntry.date, content: contentHtml }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEntries([response.data, ...entries]);
      setNewEntry({ date: '', content: '' });
      editorRef.current.innerHTML = ''; // Resetujemo editor

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

      setEntries(entries.filter((entry) => entry.id !== id));
      alert('Unos uspešno obrisan.');
    } catch (err) {
      alert('Greška prilikom brisanja unosa.');
    }
  };

  // Funkcija koja pokreće mod za izmenu
  const handleEditEntry = (entry) => {
    setIsEditing(true);
    setEditEntryId(entry.id);
    setNewEntry({ date: entry.date, content: entry.content });
    // Postavimo contentEditable na postojeći sadržaj
    if (editorRef.current) {
      editorRef.current.innerHTML = entry.content;
    }
  };

  // Funkcija za otkazivanje izmene
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditEntryId(null);
    setNewEntry({ date: '', content: '' });
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  // Funkcija koja šalje PUT zahtev za izmenu
  const handleUpdateEntry = async () => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni. Token nije pronađen.');
      return;
    }

    try {
      const contentHtml = editorRef.current.innerHTML;

      const response = await axios.put(
        `http://127.0.0.1:8000/api/diary-entries/${editEntryId}`,
        { date: newEntry.date, content: contentHtml },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Zamenimo stari entry novim
      const updatedEntry = response.data;
      setEntries(entries.map((entry) => 
        entry.id === editEntryId ? updatedEntry : entry
      ));

      alert('Uspešno ažuriran unos!');
    } catch (err) {
      alert('Greška prilikom ažuriranja unosa.');
    } finally {
      // Vraćamo formu u mod za kreiranje
      handleCancelEdit();
    }
  };

  const currentEntry = filteredEntries[currentPage] || null;

  // Funkcije za formatiranje teksta u contentEditable divu
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    if (size) {
      formatText('fontSize', size);
    }
  };

  if (loading) return <p>Učitavanje dnevnika...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="diary-outer-container">
      <div className="diary-viewer-container">
        <div className="diary-left-page">
          <h2 className="new-entry-title">
            {isEditing ? 'Izmeni Unos' : 'Novi Unos'}
          </h2>
          <input
            type="date"
            className="date-input"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            placeholder="Datum"
          />

          {/* Toolbar za formatiranje teksta */}
          <div className="toolbar">
            <button
              className="toolbar-button"
              onClick={() => formatText('bold')}
              title="Bold"
              style={{ fontWeight: 'bold' }}
            >
              B
            </button>
            <button
              className="toolbar-button"
              onClick={() => formatText('italic')}
              title="Italic"
              style={{ fontStyle: 'italic' }}
            >
              I
            </button>
            <button
              className="toolbar-button"
              onClick={() => formatText('underline')}
              title="Underline"
              style={{ textDecoration: 'underline' }}
            >
              U
            </button>

            <button
              className="toolbar-button color-button"
              style={{ backgroundColor: 'red' }}
              onClick={() => formatText('foreColor', 'red')}
              title="Crvena boja"
            ></button>
            <button
              className="toolbar-button color-button"
              style={{ backgroundColor: 'blue' }}
              onClick={() => formatText('foreColor', 'blue')}
              title="Plava boja"
            ></button>
            <button
              className="toolbar-button color-button"
              style={{ backgroundColor: 'green' }}
              onClick={() => formatText('foreColor', 'green')}
              title="Zelena boja"
            ></button>

            <select
              className="font-size-select"
              onChange={handleFontSizeChange}
              title="Veličina fonta"
            >
              <option value="">Veličina</option>
              <option value="1">Malo</option>
              <option value="3">Normalno</option>
              <option value="5">Veće</option>
              <option value="7">Najveće</option>
            </select>

            <button
              className="toolbar-button"
              onClick={() => formatText('insertUnorderedList')}
              title="Nenumerisana lista"
            >
              UL
            </button>
            <button
              className="toolbar-button"
              onClick={() => formatText('insertOrderedList')}
              title="Numerisana lista"
            >
              OL
            </button>
          </div>

          {/* contentEditable div za unos teksta sa stilovima */}
          <div
            className="content-editable"
            ref={editorRef}
            contentEditable={true}
            placeholder="Sadržaj unosa..."
            onInput={(e) =>
              setNewEntry({ ...newEntry, content: e.currentTarget.innerHTML })
            }
          />

          {/* Dugme koje menja funkciju i naslov u zavisnosti od moda */}
          <button
            className="add-entry-button"
            onClick={isEditing ? handleUpdateEntry : handleCreateEntry}
          >
            {isEditing ? 'Ažuriraj Unos' : 'Dodaj Unos'}
          </button>

          {/* Dugme za otkazivanje izmene (vidljivo samo ako je isEditing true) */}
          {isEditing && (
            <button className="cancel-edit-button" onClick={handleCancelEdit}>
              Otkaži
            </button>
          )}

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
                  {/* Renderujemo HTML sadržaj unosa oprezno */}
                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{ __html: currentEntry.content }}
                  />
                  <button
                    className="delete-entry-button"
                    onClick={() => handleDeleteEntry(currentEntry.id)}
                  >
                    Obriši ovaj unos
                  </button>

                  {/* Dugme za izmenu postojećeg unosa */}
                  <button
                    className="edit-entry-button"
                    onClick={() => handleEditEntry(currentEntry)}
                  >
                    Izmeni ovaj unos
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
