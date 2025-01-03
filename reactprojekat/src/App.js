import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './MojeKomponente/HomePage';
import Register from './MojeKomponente/Register';
import Login from './MojeKomponente/Login';
import Navbar from './MojeKomponente/Navbar';
import DiaryViewer from './MojeKomponente/DiaryViewer';
import TrainingsCalendar from './MojeKomponente/TrainingsCalendar';
import UserProfile from './MojeKomponente/UserProfile';

function App() {
  const [user, setUser] = useState(() => {
    // Inicijalizacija korisnika iz session storage
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('auth_token');
    if (storedUser && storedToken) {
      return { user: JSON.parse(storedUser), token: storedToken };
    }
    return null;
  });

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/diary" element={<DiaryViewer   />} />
          <Route path="/trainings" element={<TrainingsCalendar   />} />
          <Route path="/myprofile" element={<UserProfile   />} />

          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App
