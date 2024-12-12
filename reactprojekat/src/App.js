import React, { useState } from 'react';
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

  return (
    <div className="App">
      {user ? (
        <div>
          <h2>Dobrodošao, {user.user.name}!</h2>
          <p>Email: {user.user.email}</p>
          <button
            onClick={() => {
              sessionStorage.clear();
              setUser(null);
            }}
          >
            Odjavi se
          </button>
        </div>
      ) : (
        <>
          <HomePage />
          <Register />
          <Login setUser={setUser} />
        </>
      )}
    </div>
  );
}

export default App;
