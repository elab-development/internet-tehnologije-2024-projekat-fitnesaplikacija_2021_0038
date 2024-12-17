import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      setSuccess('Registracija uspešna! Možete se prijaviti.');
      setError('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.errors?.email?.[0] || 'Došlo je do greške.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h2>Kreiraj nalog</h2>
      <form className="register-form" onSubmit={handleSubmit}>
          <InputField
            label="Ime"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unesite ime"
            name="name" // Prosleđujemo name
            />
            <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Unesite email"
            name="email" // Prosleđujemo name
            />
            <InputField
            label="Lozinka"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Unesite lozinku"
            name="password" // Prosleđujemo name
            />
            <InputField
            label="Potvrda Lozinke"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Ponovite lozinku"
            name="confirmPassword" // Prosleđujemo name
            />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <Button text="Registruj se" type="submit" />
      </form>
    </div>
  );
};

export default Register;
