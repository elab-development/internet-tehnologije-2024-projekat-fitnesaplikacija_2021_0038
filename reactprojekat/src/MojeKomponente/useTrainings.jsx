import { useState, useEffect } from 'react';
import axios from 'axios';

const useTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrainings = async () => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Niste prijavljeni. Token nije pronađen.');
      }

      const response = await axios.get('http://127.0.0.1:8000/api/trainings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrainings(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return { trainings, loading, error,fetchTrainings };
};

export default useTrainings;
