import React from 'react';
import './SearchBar.css';


// `SearchBar`-komponentti tarjoaa hakutoiminnallisuuden, joka käyttää yläkomponentilta saatuja hakuehtoja ja päivitystoimintoja.
const SearchBar = ({ searchTerm,setSearchTerm, experienceFilter, setExperienceFilter, globalFilter, setGlobalFilter }) => {

 

  return (
    <div className="searchContainer">
      {/* Hakukenttä koulutusohjelman perusteella. Hakutermiä päivitetään `setSearchTerm`-funktiolla. */}
     <input
        type="text"
        placeholder="Hae konsulttia koulutusohjelman mukaan"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {/* Hakukenttä työkokemuksen perusteella. Käyttäjä voi syöttää vuosimäärän. */}
      <input
        type="number"
        placeholder="Hae työkokemuksen mukaan"
        value={experienceFilter}
        onChange={(e) => setExperienceFilter(e.target.value)}
      />

        {/* Hakukenttä yleiseen hakuun, joka käyttää kaikkia tietokenttiä (esim. nimi, koulutus, projektit). */}
      <input
        type="text"
        placeholder="Hae kaikilla tiedoilla, kuten nimellä, koulutuksella tai projekteilla"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
