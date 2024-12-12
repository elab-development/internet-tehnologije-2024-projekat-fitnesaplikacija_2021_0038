import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './MojeKomponente/HomePage';
import Register from './MojeKomponente/Register';
import Login from './MojeKomponente/Login';

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

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta za početnu stranicu */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta za registraciju */}
          <Route path="/register" element={<Register />} />

          {/* Ruta za login */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Ruta za dashboard korisnika */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <div>
                  <h2>Dobrodošao, {user.user.name}!</h2>
                  <p>Email: {user.user.email}</p>
                  <button onClick={handleLogout}>Odjavi se</button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
