import React from 'react';
import { BookOpen } from 'lucide-react';
import './SubjectCards.css';

const SubjectCards = ({ subjects, selectedSubject, onSubjectSelect }) => {
  return (
    <div className="subjects-section">
      <div className="subjects-container">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className={`subject-card ${
              selectedSubject && selectedSubject._id === subject._id ? 'selected' : ''
            }`}
            onClick={() => onSubjectSelect(subject)}
          >
            <div className="subject-icon">
              <BookOpen size={24} />
            </div>
            <div className="subject-content">
              <h3>{subject.name}</h3>
              <p>{subject.moduleCount || 5} modules</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectCards;
