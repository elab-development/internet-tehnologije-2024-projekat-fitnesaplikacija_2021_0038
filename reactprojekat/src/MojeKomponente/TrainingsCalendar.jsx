import React, { useState, useEffect } from 'react';
import useTrainings from './useTrainings';
import CalendarDay from './CalendarDay';
import './TrainingsCalendar.css';
import axios from 'axios';

const TrainingsCalendar = () => {
  const { trainings, loading, error, fetchTrainings } = useTrainings();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);

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

  const getHolidayForDay = (day) => {
    const formattedDay = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find((holiday) => holiday.date === formattedDay)?.name || null;
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `https://calendarific.com/api/v2/holidays?api_key=e8GlJ7swaxyISTUNE30dJskssPcvZq50&country=RS&year=${selectedYear}&month=${selectedMonth + 1}`
        );
        const holidayData = response.data.response.holidays.map((holiday) => ({
          name: holiday.name,
          date: holiday.date.iso.split('T')[0],
        }));
        setHolidays(holidayData);
      } catch (error) {
        console.error('Greška prilikom preuzimanja praznika:', error);
      }
    };

    fetchHolidays();
  }, [selectedMonth, selectedYear]);

  if (loading) return <p>Učitavanje treninga...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="calendar-container">
      <h2>Kalendar treninga</h2>
      
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
          <CalendarDay
            key={day}
            day={day}
            trainings={getTrainingsForDay(day)}
            holiday={getHolidayForDay(day)} // Prosleđujemo praznik
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onTrainingAdded={fetchTrainings}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainingsCalendar;
