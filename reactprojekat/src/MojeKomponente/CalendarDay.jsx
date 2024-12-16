import React, { useState } from 'react';
import axios from 'axios';

const CalendarDay = ({ day, trainings, selectedYear, selectedMonth, onTrainingAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [calories, setCalories] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  const handleAddTraining = () => {
    // Formiramo datum na osnovu day, selectedMonth, selectedYear
 
    const chosenDate = new Date(selectedYear, selectedMonth, day+1);
    const formattedDate = chosenDate.toISOString().split('T')[0];
    setDate(formattedDate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset polja formulara nakon zatvaranja
    setTitle('');
    setDate('');
    setDuration(1);
    setCalories(0);
    setDifficulty('easy');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Uzimanje tokena iz sessionStorage
    const token = sessionStorage.getItem('auth_token');

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/trainings', 
        {
          title,
          date,
          duration,
          calories_burned: calories,
          difficulty
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Nakon uspešnog kreiranja, zatvoriti modal i resetovati polja
      closeModal();
       
      onTrainingAdded()
       
      
    } catch (error) {
      console.error('Greška prilikom kreiranja treninga:', error);
    }
  };

  return (
    <div className="calendar-day">
      <div className="day-number">{day}</div>
      {trainings.length === 0 ? (
        <button className="add-training-button" onClick={handleAddTraining}>
          +
        </button>
      ) : (
        <ul className="training-list">
          {trainings.map((training) => (
            <li key={training.id}>{training.title}</li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Dodaj plan treninga</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Naslov:
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Datum:
                <input
                  type="date"
                  name="date"
                  required
                  value={date}
                  readOnly
                />
              </label>
              <label>
                Trajanje (minuti):
                <input
                  type="number"
                  name="duration"
                  min="1"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>
              <label>
                Kalorije:
                <input
                  type="number"
                  name="calories_burned"
                  min="0"
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </label>
              <label>
                Težina:
                <select
                  name="difficulty"
                  required
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Lako</option>
                  <option value="medium">Srednje</option>
                  <option value="hard">Teško</option>
                </select>
              </label>
              <button type="submit" className="submit-button">
                Sačuvaj
              </button>
              <button type="button" className="close-button" onClick={closeModal}>
                Zatvori
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
