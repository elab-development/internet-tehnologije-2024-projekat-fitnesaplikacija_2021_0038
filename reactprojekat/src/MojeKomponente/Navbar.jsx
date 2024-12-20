import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaDumbbell } from 'react-icons/fa'; // Ikonica za logo
import axios from 'axios';

const Navbar = ({ user, setUser }) => {
    let navigate= useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
      });

      // Brisanje podataka iz sessionStorage
      sessionStorage.clear();
      setUser(null);
      navigate('/login')
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <FaDumbbell size={40} color="#ff5722" />
        <h1>FitLife</h1>
      </div>
      <nav className="navbar-links">
      {!user &&( 
        <>
        <Link to="/">Početna</Link>
        <Link to="/register">Registracija</Link>
        <Link to="/login">Prijava</Link>
        </>)}
        {user && <Link to="/diary">Moj fitnes dnevnik</Link>}
        {user && <Link to="/trainings">Moj raspored treninga</Link>}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Odjavi se
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
