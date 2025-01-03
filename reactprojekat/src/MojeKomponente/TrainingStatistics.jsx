import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './TrainingStatistics.css';

// Registracija potrebnih komponenti Chart.js-a
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const TrainingStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

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

  const lineData = {
    labels: Object.keys(statistics),
    datasets: [
      {
        label: 'Broj treninga',
        data: Object.values(statistics).map((stat) => stat.trainings_count),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  if (loading) return <p>Učitavanje statistika...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="training-statistics">
      <h1>Statistike Treninga</h1>
      <div className="chart-container">
        <h2>Ukupno trajanje i kalorije</h2>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
      <div className="chart-container">
        <h2>Broj treninga</h2>
        <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default TrainingStatistics;
