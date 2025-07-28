import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: 'maintain weight',
    calories_per_day: '',
    profile_picture: null,
  });
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profiles', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        if (data.length) {
          setProfile(data[0]);
          setFormData({
            age: data[0].age,
            weight: data[0].weight,
            height: data[0].height,
            goal: data[0].goal,
            calories_per_day: data[0].calories_per_day,
            profile_picture: null,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/trainings/statistics', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProfile();
    fetchStatistics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors((prev) => ({ ...prev, [name]: null })); // Uklanjanje greške za polje koje se menja
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
    setValidationErrors((prev) => ({ ...prev, profile_picture: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const url = profile
      ? `http://127.0.0.1:8000/api/profiles/${profile.id}`
      : 'http://127.0.0.1:8000/api/profiles';

    const method = profile ? 'POST' : 'POST';

    const body = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        body.append(key, formData[key]);
      }
    }
    if(profile){
    body.append('_method','PUT');
    }
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setValidationErrors(errorData.errors);
        }
        throw new Error('Failed to save profile');
      }

      const data = await response.json();
      setProfile(data);
      alert('Profile successfully saved!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: Object.keys(statistics),
    datasets: [
      {
        label: 'Ukupno trajanje (min)',
        data: Object.values(statistics).map((stat) => stat.total_duration),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Potrošene kalorije',
        data: Object.values(statistics).map((stat) => stat.total_calories),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-profile">
      <h1>{profile ? 'My profile' : 'Create profile'}</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          {validationErrors.age && <p className="error">{validationErrors.age[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
          {validationErrors.weight && <p className="error">{validationErrors.weight[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
          />
          {validationErrors.height && <p className="error">{validationErrors.height[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="goal">Goal:</label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option value="lose weight">Lose Weight</option>
            <option value="maintain weight">Maintain Weight</option>
            <option value="gain weight">Gain Weight</option>
          </select>
          {validationErrors.goal && <p className="error">{validationErrors.goal[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="calories_per_day">Calories per day:</label>
          <input
            type="number"
            id="calories_per_day"
            name="calories_per_day"
            value={formData.calories_per_day}
            onChange={handleInputChange}
            required
          />
          {validationErrors.calories_per_day && <p className="error">{validationErrors.calories_per_day[0]}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="profile_picture">Profile picture:</label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={handleFileChange}
          />
          {validationErrors.profile_picture && <p className="error">{validationErrors.profile_picture[0]}</p>}
        </div>
        {profile && profile.profile_picture && (
          <div className="profile-picture-preview">
            <img
              src={`${profile.profile_picture}`}
              alt="Profile"
            />
          </div>
        )}
        <button type="submit" className="primary-btn">
          Save
        </button>
      </form>

      <div className="statistics">
        <h2>Your stats</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default UserProfile;
