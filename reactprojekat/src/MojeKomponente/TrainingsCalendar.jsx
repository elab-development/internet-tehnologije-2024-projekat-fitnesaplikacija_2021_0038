import React from 'react';
import useTrainings from './useTrainings';
import './TrainingsCalendar.css';

const TrainingsCalendar = () => {
  const { trainings, loading, error } = useTrainings();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based index
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const getTrainingsForDay = (day) => {
    return trainings.filter((training) => {
      const trainingDate = new Date(training.date);
      return (
        trainingDate.getFullYear() === year &&
        trainingDate.getMonth() === month &&
        trainingDate.getDate() === day
      );
    });
  };

  if (loading) return <p>Učitavanje treninga...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="calendar-container">
      <h2>Kalendar treninga za {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <div className="calendar-grid">
        {daysArray.map((day) => (
          <div key={day} className="calendar-day">
            <div className="day-number">{day}</div>
            <div className="trainings-list">
              {getTrainingsForDay(day).map((training) => (
                <div key={training.id} className="training-item">
                  <strong>{training.title}</strong>
                  <p>{training.duration} min</p>
                  <p>{training.difficulty}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingsCalendar;
