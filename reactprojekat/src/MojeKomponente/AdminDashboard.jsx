import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './AdminDashboard.css';

// Registracija elemenata za Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [userGoalsData, setUserGoalsData] = useState([]);
  const [trainingDurationData, setTrainingDurationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const goalsResponse = await fetch('http://127.0.0.1:8000/api/admin/user-goals', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        });

        const trainingsResponse = await fetch('http://127.0.0.1:8000/api/admin/training-durations', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        });

        if (!goalsResponse.ok || !trainingsResponse.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const goalsData = await goalsResponse.json();
        const trainingsData = await trainingsResponse.json();

        setUserGoalsData(goalsData);
        setTrainingDurationData(trainingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Učitavanje podataka...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const userGoalsChart = {
    labels: userGoalsData.map((goal) => goal.goal),
    datasets: [
      {
        label: 'Broj korisnika',
        data: userGoalsData.map((goal) => goal.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const trainingDurationChart = {
    labels: trainingDurationData.map((item) => item.month),
    datasets: [
      {
        label: 'Ukupno trajanje treninga (min)',
        data: trainingDurationData.map((item) => item.total_duration),
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin dashboard</h1>
      <div className="chart-container">
        <div className="chart-item">
          <h2>Distribucija ciljeva korisnika</h2>
          <Pie data={userGoalsChart} options={chartOptions} />
        </div>
        <div className="chart-item">
          <h2>Ukupno trajanje treninga po mesecima</h2>
          <Bar data={trainingDurationChart} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
