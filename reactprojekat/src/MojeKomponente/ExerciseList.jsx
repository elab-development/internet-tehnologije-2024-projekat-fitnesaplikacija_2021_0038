import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExerciseList.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Učitavanje mišićnih grupa sa API-ja
    const fetchMuscleGroups = async () => {
      try {
        const response = await axios.get('https://wger.de/api/v2/muscle/');
        setMuscleGroups(response.data.results);
      } catch (error) {
        console.error('Greška prilikom učitavanja mišićnih grupa:', error);
      }
    };

    fetchMuscleGroups();
  }, []);

  useEffect(() => {
    if (selectedMuscleGroup) {
      setLoading(true);
      const fetchExercises = async () => {
        try {
          const response = await axios.get(
            `https://wger.de/api/v2/exercise/?muscles=${selectedMuscleGroup}&language=2`
          );
          setExercises(response.data.results);
        } catch (error) {
          console.error('Greška prilikom učitavanja vežbi:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchExercises();
    }
  }, [selectedMuscleGroup]);

  const handleMuscleGroupChange = (event) => {
    setSelectedMuscleGroup(event.target.value);
  };

  return (
    <div className="exercise-list-container">
      <h1 className="exercise-list-title">Vežbe po mišićnim grupama</h1>
      <div className="filter-container">
        <label htmlFor="muscle-group-select" className="filter-label">Izaberite mišićnu grupu:</label>
        <select
          id="muscle-group-select"
          className="filter-select"
          value={selectedMuscleGroup}
          onChange={handleMuscleGroupChange}
        >
          <option value="">-- Izaberite --</option>
          {muscleGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Učitavanje vežbi...</p>
      ) : (
        <div className="exercise-grid">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <h2 className="exercise-name">{exercise.name}</h2>
                <div className="exercise-description" dangerouslySetInnerHTML={{ __html: exercise.description }}></div>
                {/* Placeholder za slike */}
                <img
                  src="https://via.placeholder.com/300"
                  alt={exercise.name}
                  className="exercise-image"
                />
              </div>
            ))
          ) : (
            <p className="no-exercises-text">Nema dostupnih vežbi za odabranu mišićnu grupu.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
