import React from 'react';

const CalendarDay = ({ day, trainings }) => {
  return (
    <div className="calendar-day">
      <div className="day-number">{day}</div>
      <div className="trainings-list">
        {trainings.map((training) => (
          <div key={training.id} className="training-item">
            <strong>{training.title}</strong>
            <p>{training.duration} min</p>
            <p>{training.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
