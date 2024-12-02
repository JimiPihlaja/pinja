import React, { useState } from 'react';
import './ConsultantEditForms.css';

const ConsultantEditForm = ({ consultant, onSave, onCancel, user }) => {
  // Varmista, että käyttäjällä on oikeudet muokata tietoja
  if (user.role === 'consultant' && user.id !== consultant.id) {
    return <p>Sinulla ei ole oikeuksia muokata tämän konsultin tietoja.</p>;
  }

  const [formData, setFormData] = useState({ ...consultant });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNestedChange = (field, nestedField, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [nestedField]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Tallentaa muokatut tiedot
  };

  return (
    <div className="editFormContainer">
      <h2>Muokkaa konsulttia: {consultant.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </label>

        <label>
          Koulutusaste:
          <input
            type="text"
            value={formData.education.degree}
            onChange={(e) =>
              handleNestedChange('education', 'degree', e.target.value)
            }
          />
        </label>

        <label>
          Koulutusohjelma:
          <input
            type="text"
            value={formData.education.program}
            onChange={(e) =>
              handleNestedChange('education', 'program', e.target.value)
            }
          />
        </label>

        <label>
          Valmistumisvuosi:
          <input
            type="number"
            value={formData.education.graduationYear}
            onChange={(e) =>
              handleNestedChange('education', 'graduationYear', e.target.value)
            }
          />
        </label>

        <label>
          Työkokemuksen aloitusvuosi:
          <input
            type="number"
            value={formData.workExperience.startYear}
            onChange={(e) =>
              handleNestedChange('workExperience', 'startYear', e.target.value)
            }
          />
        </label>

        <button type="submit">Tallenna</button>
        <button type="button" onClick={onCancel}>Peruuta</button>
      </form>
    </div>
  );
};

export default ConsultantEditForm;
