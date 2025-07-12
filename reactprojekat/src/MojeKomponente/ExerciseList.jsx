import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExerciseList.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' za rastuće, 'desc' za opadajuće


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
            `https://wger.de/api/v2/exerciseinfo/?muscles=${selectedMuscleGroup}&language=2`
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

  useEffect(() => {
    // Filtriranje i sortiranje
    let updatedExercises = exercises;

    // Pretraga
   if (searchQuery) {
  updatedExercises = updatedExercises.filter((exercise) => {
    const translation = exercise.translations.find(t => t.language === 2);
    return translation?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
    }

    // Sortiranje
     updatedExercises = updatedExercises.sort((a, b) => {
  const aName = a.translations.find(t => t.language === 2)?.name || '';
  const bName = b.translations.find(t => t.language === 2)?.name || '';

  if (sortOrder === 'asc') {
    return aName.localeCompare(bName);
  } else {
    return bName.localeCompare(aName);
  }
    });

    setFilteredExercises(updatedExercises);
  }, [exercises, searchQuery, sortOrder]);

  const handleMuscleGroupChange = (event) => {
    setSelectedMuscleGroup(event.target.value);
    setSearchQuery(''); // Resetujemo pretragu prilikom promene grupe
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="exercise-list-container">
      <h1 className="exercise-list-title">Vežbe po mišićnim grupama</h1>

      <div className="controls-container">
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

        <div className="search-container">
          <label htmlFor="search-input" className="search-label">Pretraga:</label>
          <input
            id="search-input"
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Pretraži vežbe..."
          />
        </div>

        <div className="sort-container">
          <label htmlFor="sort-select" className="sort-label">Sortiraj:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Rastuće</option>
            <option value="desc">Opadajuće</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Učitavanje vežbi...</p>
      ) : (
        <div className="exercise-grid">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <h2 className="exercise-name">{exercise.translations.find(t => t.language === 2)?.name}</h2>
                <div
                  className="exercise-description"
                  dangerouslySetInnerHTML={{ __html: exercise.translations.find(t=>t.language===2)?.description}}
                ></div>
               
              </div>
            ))
          ) : (
            <p className="no-exercises-text">Nema dostupnih vežbi za kriterijume pretrage.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
