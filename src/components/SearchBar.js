import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm,setSearchTerm, experienceFilter, setExperienceFilter }) => {
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExperienceFilterChange = (e) => {
    setExperienceFilter(e.target.value);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Hae koulutusohjelman mukaan"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="input"
      />
      <input
        type="number"
        placeholder="Vähintään työkokemuksen vuodet"
        value={experienceFilter}
        onChange={handleExperienceFilterChange}
        className="input"
      />
    </div>
  );
};

export default SearchBar;
