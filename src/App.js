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

  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

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
          {user.role === 'admin' && (
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              experienceFilter={experienceFilter} 
              setExperienceFilter={setExperienceFilter} 
            />
          )}
          <ConsultantList 
            user={user} 
            searchTerm={searchTerm} 
            experienceFilter={experienceFilter} 
            setSearchTerm={setSearchTerm} 
            setExperienceFilter={setExperienceFilter} 
          />
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
