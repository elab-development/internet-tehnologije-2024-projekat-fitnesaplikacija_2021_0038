import { useState, useEffect } from 'react';
import axios from 'axios';

const useDiaryEntries = () => {
  const [entries, setEntries] = useState([]); // Niz unosa
  const [loading, setLoading] = useState(false); // Status učitavanja
  const [error, setError] = useState(null); // Greška prilikom učitavanja

  // Funkcija za preuzimanje dnevničkih unosa
  const fetchDiaryEntries = async () => {
    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem('auth_token'); // Dohvatanje tokena iz sessionStorage

    if (!token) {
      setError('Niste prijavljeni. Token nije pronađen.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/diary-entries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(response.data.data); // Postavljanje preuzetih unosa
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Greška prilikom učitavanja.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaryEntries();
  }, []); // Učitavanje prilikom mount-a

  return { entries, setEntries, loading, error };
};

export default useDiaryEntries;
