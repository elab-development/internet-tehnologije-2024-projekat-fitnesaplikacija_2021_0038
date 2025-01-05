import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: 'stevandjurdjic@gmail.com',
    password: 'stevandjurdjic',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = response.data;

      // Čuvanje u session storage
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Pozivanje metode setUser
      setUser({ user, token });

      setSuccess('Prijava uspešna!');
      setError('');

      // Provera uloge korisnika
      if (user.uloga === 'admin') {
        navigate('/admin');
      } else {
        navigate('/diary');
      }

      // Resetovanje formData
      setFormData({ email: '', password: '' });
    } catch (err) {
      setError('Pogrešan email ili lozinka.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Prijavi se</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Unesite email"
          name="email"
        />
        <InputField
          label="Lozinka"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Unesite lozinku"
          name="password"
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <Button text="Prijavi se" type="submit" />
      </form>
    </div>
  );
};

export default Login;
