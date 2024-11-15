
import React, { useState } from 'react';
import './ConsultantList.css';

const consultants = [
  // Konsulttidata
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
    workExperience: { startYear: 2018 }
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
    workExperience: { startYear: 2016 }
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
    workExperience: { startYear: 2015 }
  },
  {
    id: 4,
    name: "Anna Korhonen",
    education: {
      degree: "Kandidaatti",
      program: "Käyttäytymistieteet",
      graduationYear: 2017
    },
    certifications: ["Certified UX Designer", "Human-Computer Interaction"],
    projects: [
      { name: "User Research", technologies: ["Figma", "Sketch"], yearsOfExperience: 3 },
      { name: "Usability Testing", technologies: ["UserTesting", "Lookback"], yearsOfExperience: 2 }
    ],
    workExperience: { startYear: 2017 }
  },
  {
    id: 5,
    name: "Pekka Saarinen",
    education: {
      degree: "FM",
      program: "Tietojenkäsittelytiede",
      graduationYear: 2020
    },
    certifications: ["Google Analytics Certified", "Java Developer Certification"],
    projects: [
      { name: "Backend Development", technologies: ["Java", "Spring Boot"], yearsOfExperience: 2 },
      { name: "Data Engineering", technologies: ["Apache Spark", "Kafka"], yearsOfExperience: 1 }
    ],
    workExperience: { startYear: 2020 }
  }
  
];

const ConsultantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const filteredConsultants = consultants.filter((consultant) => {
    const experienceYears = new Date().getFullYear() - consultant.workExperience.startYear;
    const matchesEducation = consultant.education.program
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesExperience =
      experienceFilter === '' || experienceYears >= parseInt(experienceFilter);

    return matchesEducation && matchesExperience;
  });

  return (
    <div className="container">
      <h2 className="heading">Our Consultants</h2>
      
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Hae koulutusohjelman mukaan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        
        <input
          type="number"
          placeholder="Vähintään työkokemuksen vuodet"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="input"
        />
      </div>

      {filteredConsultants.length > 0 ? (
        filteredConsultants.map((consultant) => (
          <div key={consultant.id} className="card">
            <h3 className="consultantName">{consultant.name}</h3>
            <p><strong>Koulutusaste:</strong> {consultant.education.degree}</p>
            <p><strong>Koulutusohjelma:</strong> {consultant.education.program}</p>
            <p><strong>Valmistumisvuosi:</strong> {consultant.education.graduationYear}</p>
            
            <h4>Suoritetut sertifikaatit ja kurssit:</h4>
            <ul className='noBullets'>
              {consultant.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
            
            <h4>Projekti- ja teknologiakokemus:</h4>
            <ul className='noBullets'>
              {consultant.projects.map((project, index) => (
                <li key={index}>
                  <strong>Projekti:</strong> {project.name}, 
                  <strong> Teknologiat:</strong> {project.technologies.join(", ")}, 
                  <strong> Kokemusvuodet:</strong> {project.yearsOfExperience}
                </li>
              ))}
            </ul>

            <p><strong>Työkokemuksen aloitusvuosi:</strong> {consultant.workExperience.startYear}</p>
            <p><strong>Työkokemuksen kesto:</strong> {new Date().getFullYear() - consultant.workExperience.startYear} vuotta</p>
          </div>
        ))
      ) : (
        <p className="noResults">Ei hakuehtoja vastaavia tuloksia.</p>
      )}
    </div>
  );
};

export default ConsultantList;
