import React, { useState } from 'react';
import Login from './components/Login';
import './App.css';
import ConsultantList from './components/ConsultantList';
import Header from './UI/Header';
import SearchBar from './components/SearchBar';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      <Header />
      {user ? (
        <>
         <button className="logout-button" onClick={handleLogout}>Kirjaudu ulos</button>
          {user.role === 'admin' && <SearchBar />} 
          <ConsultantList user={user} /> 
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
