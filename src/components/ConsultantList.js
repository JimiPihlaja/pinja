import React, { useState, useEffect } from 'react';
import ConsultantEditForm from './ConsultantEditForm';
import './ConsultantList.css';
import jsPDF from 'jspdf';

const initialConsultants = [
  {
    id: 1,
    name: "Matti Meikäläinen",
    education: {
      degree: "Insinööri",
      program: "Tietotekniikka",
      graduationYear: 2018
    },
    certifications: ["AWS Certified Solutions Architect", "Scrum Master"],
    projects: [
      { name: "Web App Development", technologies: ["React", "Node.js"], yearsOfExperience: 3 },
      { name: "Mobile App Development", technologies: ["React Native", "Firebase"], yearsOfExperience: 2 }
    ],
    workExperience: { startYear: 2018 },
    imageUrl: "/CVkuvat/template1.jpg"
  },
  {
    id: 2,
    name: "Liisa Virtanen",
    education: {
      degree: "Tradenomi",
      program: "Liiketalous",
      graduationYear: 2016
    },
    certifications: ["PMP", "Data Analytics"],
    projects: [
      { name: "E-commerce Development", technologies: ["Shopify", "JavaScript"], yearsOfExperience: 4 },
      { name: "Data Analysis", technologies: ["Python", "SQL"], yearsOfExperience: 3 }
    ],
    workExperience: { startYear: 2016 },
    imageUrl: "/CVkuvat/template2.jpg"
  },
  {
    id: 3,
    name: "Teemu Laakso",
    education: {
      degree: "Diplomi-insinööri",
      program: "Sähkötekniikka",
      graduationYear: 2015
    },
    certifications: ["Certified Kubernetes Administrator", "DevOps Foundation"],
    projects: [
      { name: "Infrastructure Automation", technologies: ["Terraform", "Ansible"], yearsOfExperience: 5 },
      { name: "Cloud Migrations", technologies: ["AWS", "Azure"], yearsOfExperience: 4 }
    ],
    workExperience: { startYear: 2015 },
    imageUrl: "/CVkuvat/template3.jpg"
  },
  {
    id: 4,
    name: "Anna Korhonen",
    education: {
      degree: "Kandidaatti",
      program: "Viestintätieteet",
      graduationYear: 2017
    },
    certifications: ["Certified UX Designer", "Human-Computer Interaction"],
    projects: [
      { name: "User Research", technologies: ["Figma", "Sketch"], yearsOfExperience: 3 },
      { name: "Usability Testing", technologies: ["UserTesting", "Lookback"], yearsOfExperience: 2 }
    ],
    workExperience: { startYear: 2017 },
    imageUrl: "/CVkuvat/template5.jpg"
  },
  {
    id: 5,
    name: "Tauski Nieminen",
    education: {
      degree: "Tradenomi",
      program: "Tietojenkäsittelytiede",
      graduationYear: 2020
    },
    certifications: ["Google Analytics Certified", "Java Developer Certification"],
    projects: [
      { name: "Backend Development", technologies: ["Java", "Spring Boot"], yearsOfExperience: 2 },
      { name: "Data Engineering", technologies: ["Apache Spark", "Kafka"], yearsOfExperience: 1 }
    ],
    workExperience: { startYear: 2020 },
    imageUrl: "/CVkuvat/template4.jpg"
  }
];
const ConsultantList = ({ user, searchTerm, experienceFilter }) => {
  const [consultants, setConsultants] = useState(() => {
    const savedData = localStorage.getItem('consultants');
    return savedData ? JSON.parse(savedData) : initialConsultants;
  });

  const [editingConsultant, setEditingConsultant] = useState(null);
  const [filteredConsultants, setFilteredConsultants] = useState(consultants);
  const [expandedConsultants, setExpandedConsultants] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState([]); // Alustetaan tila!

  useEffect(() => {
    let filtered = consultants;

    if (user.role === 'consultant') {
      filtered = consultants.filter((consultant) => consultant.id === user.id);
    }

    if (searchTerm || experienceFilter) {
      filtered = filtered.filter((consultant) => {
        const experienceYears = new Date().getFullYear() - consultant.workExperience.startYear;
        const matchesEducation = !searchTerm || consultant.education.program.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExperience = !experienceFilter || experienceYears >= parseInt(experienceFilter, 10);
        return matchesEducation && matchesExperience;
      });
    }

    setFilteredConsultants(filtered);
  }, [consultants, user, searchTerm, experienceFilter]);

  const handleEdit = (consultant) => {
    if (user.role === 'admin' || consultant.id === user.id) {
      setEditingConsultant(consultant);
    } else {
      alert('Sinulla ei ole oikeuksia muokata tämän konsultin tietoja.');
    }
  };

  const handleSave = (updatedConsultant) => {
    setConsultants((prevConsultants) =>
      prevConsultants.map((consultant) =>
        consultant.id === updatedConsultant.id ? updatedConsultant : consultant
      )
    );
    setEditingConsultant(null);
  };

  const handleCancel = () => {
    setEditingConsultant(null);
  };

  const toggleExpand = (id) => {
    setExpandedConsultants((prev) =>
      prev.includes(id) ? prev.filter((consultantId) => consultantId !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedConsultants((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const generatePDF = (consultantsToPrint) => {
    const pdf = new jsPDF();
    consultantsToPrint.forEach((consultant, index) => {
      if (index > 0) pdf.addPage(); // Lisää uusi sivu jokaisen konsultin väliin
      pdf.text(`Nimi: ${consultant.name}`, 10, 10);
      pdf.text(`Koulutusaste: ${consultant.education.degree}`, 10, 20);
      pdf.text(`Ohjelma: ${consultant.education.program}`, 10, 30);
      pdf.text(`Valmistumisvuosi: ${consultant.education.graduationYear}`, 10, 40);
      pdf.text(`Työkokemus vuodesta: ${consultant.workExperience.startYear}`, 10, 50);
      pdf.text(`Sertifikaatit: ${consultant.certifications.join(', ')}`, 10, 60);
    });
    pdf.save('Consultants.pdf');
  };

  const handleSingleCVPrint = (consultant) => {
    generatePDF([consultant]);
  };

  const handleMultipleCVPrint = () => {
    const consultantsToPrint = consultants.filter((consultant) =>
      selectedConsultants.includes(consultant.id)
    );
    generatePDF(consultantsToPrint);
  };

  return (
    <div className="container">
      <h2 className="heading">Meidän Konsulttimme</h2>

      {editingConsultant ? (
        <ConsultantEditForm
          consultant={editingConsultant}
          onSave={handleSave}
          onCancel={handleCancel}
          user={user}
        />
      ) : filteredConsultants.length > 0 ? (
        filteredConsultants.map((consultant) => {
          const isExpanded = expandedConsultants.includes(consultant.id);
          return (
            <div key={consultant.id} className="card">
              {user.role === 'admin' && (
                <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`select-${consultant.id}`}
                  onChange={() => handleCheckboxChange(consultant.id)}
                  checked={selectedConsultants.includes(consultant.id)} // Käytä tila!
                />
                <label htmlFor={`select-${consultant.id}`}>Valitse</label>
                </div>
              )}
              <img
                src={consultant.imageUrl}
                alt={`${consultant.name} kuva`}
                className="consultant-image"
              />
              <h3 className="consultantName">{consultant.name}</h3>
              <p><strong>Koulutusohjelma:</strong> {consultant.education.program}</p>
              {isExpanded && (
                <>
                  <p><strong>Koulutusaste:</strong> {consultant.education.degree}</p>
                  <p><strong>Valmistumisvuosi:</strong> {consultant.education.graduationYear}</p>
                  <h4>Suoritetut sertifikaatit ja kurssit:</h4>
                  <ul className="noBullets">
                    {consultant.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </>
              )}
              <p><strong>Työkokemuksen kesto:</strong> {new Date().getFullYear() - consultant.workExperience.startYear} vuotta</p>
              <button className="edit-button" onClick={() => handleEdit(consultant)}>
                Muokkaa
              </button>
              <button onClick={() => handleSingleCVPrint(consultant)}>
                Tulosta {consultant.name}:n CV
              </button>
              <button
                className="toggle-button"
                onClick={() => toggleExpand(consultant.id)}
              >
                {isExpanded ? 'Näytä vähemmän' : 'Näytä lisää'}
              </button>
            </div>
          );
        })
      ) : (
        <p className="noResults">Ei hakuehtoja vastaavia tuloksia.</p>
      )}

      {user.role === 'admin' && (
        <button onClick={handleMultipleCVPrint}>
          Tulosta valittujen konsulttien CV:t
        </button>
      )}
    </div>
  );
};

export default ConsultantList;