import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './MojeKomponente/HomePage';
import Register from './MojeKomponente/Register';
import Login from './MojeKomponente/Login';
import Navbar from './MojeKomponente/Navbar';
import DiaryViewer from './MojeKomponente/DiaryViewer';
import TrainingsCalendar from './MojeKomponente/TrainingsCalendar';
 
import Breadcrumbs from './MojeKomponente/Breadcrumbs';
import ExerciseList from './MojeKomponente/ExerciseList';
import AdminNotificationComponent from './MojeKomponente/AdminNotificationComponent';
import TrainingStatistics from './MojeKomponente/TrainingStatistics';
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
      <Breadcrumbs />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/diary" element={<DiaryViewer   />} />   {/** za seminarski dopunjeno sa UPDATE operacijom */}
          <Route path="/trainings" element={<TrainingsCalendar   />} />
           


          <Route path="/exercises" element={<ExerciseList   />} />
          <Route path="/admin/notification" element={<AdminNotificationComponent   />} />
          <Route path="/trainings/stats" element={<TrainingStatistics   />} />
          <Route path="/user" element={<UserProfile   />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App
