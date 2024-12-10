import React, { useState } from 'react';
import Login from './components/Login';
import './App.css';
import ConsultantList from './components/ConsultantList';
import Header from './UI/Header';
import SearchBar from './components/SearchBar';


function App() {
   // Alustetaan käyttäjän tila localStorage:sta, jos käyttäjä on tallennettu
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

   // Alustetaan hakuehtojen tilat
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');

    // Kirjautumisen uloskirjautumistoiminto
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

          {/* Admin-roolissa olevan käyttäjän hakukentät */}
          {user.role === 'admin' && (
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              experienceFilter={experienceFilter} 
              setExperienceFilter={setExperienceFilter} 
              globalFilter={globalFilter} 
              setGlobalFilter={setGlobalFilter} 
            />
          )}

         {/* Konsulttilista, johon välitetään hakuehdot ja käyttäjä */}
          <ConsultantList 
            user={user} 
            searchTerm={searchTerm} 
            experienceFilter={experienceFilter} 
            setSearchTerm={setSearchTerm} 
            setExperienceFilter={setExperienceFilter} 
            globalFilter={globalFilter}
            
          />
        </>
      ) : (

        // Jos ei ole kirjautunut sisään, näytetään kirjautumislomake
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
