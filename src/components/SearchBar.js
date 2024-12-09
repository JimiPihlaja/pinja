import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm,setSearchTerm, experienceFilter, setExperienceFilter }) => {

 

  return (
    <div className="searchContainer">
     <input
        type="text"
        placeholder="Hae konsulttia koulutusohjelman mukaan"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Suodata työkokemuksen mukaan"
        value={experienceFilter}
        onChange={(e) => setExperienceFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
