import React, { useState } from 'react';
import './Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consultant'); // Default role
  const [errorMessage, setErrorMessage] = useState(''); // Virheilmoitus

  const handleLogin = () => {
    // Dummy käyttäjät
    const dummyUsers = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
      { id: 2, username: 'Konsultantti', password: 'Konsultantti1', role: 'consultant' },
    ];

    // Etsitään oikea käyttäjä
    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user); // Päivitä App-tason tila
    } else {
      setErrorMessage('Väärä käyttäjätunnus, salasana tai rooli'); // Näytetään virheilmoitus UI:ssa
    }
  };

  return (
    <div className="login-container">
    <h2>Kirjaudu sisään</h2>
    <input
      type="text"
      placeholder="Käyttäjätunnus"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Salasana"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="consultant">Konsultti</option>
      <option value="admin">Admin</option>
    </select>
    <button onClick={handleLogin}>Kirjaudu</button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
);
};

export default Login;
