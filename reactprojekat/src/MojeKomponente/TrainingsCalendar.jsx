import React, { useState } from 'react';
import useTrainings from './useTrainings';
import CalendarDay from './CalendarDay';
import './TrainingsCalendar.css';

const TrainingsCalendar = () => {
  const { trainings, loading, error } = useTrainings();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const getTrainingsForDay = (day) => {
    return trainings.filter((training) => {
      const trainingDate = new Date(training.date);
      return (
        trainingDate.getFullYear() === selectedYear &&
        trainingDate.getMonth() === selectedMonth &&
        trainingDate.getDate() === day
      );
    });
  };

  if (loading) return <p>Učitavanje treninga...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="calendar-container">
      <h2>Kalendar treninga</h2>
      
      {/* Selektori za mesec i godinu */}
      <div className="calendar-controls">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - 5 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="calendar-grid">
        {daysArray.map((day) => (
          <CalendarDay key={day} day={day} trainings={getTrainingsForDay(day)} />
        ))}
      </div>
    </div>
  );
};

export default TrainingsCalendar;
