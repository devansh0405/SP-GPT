import React from 'react';
import './LearningHeader.css';

const LearningHeader = ({ subjects, selectedSubject, onSubjectSelect }) => {
  return (
    <div className="learning-navbar">
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-circle">L</div>
        <h2 className="logo-text">LearnHub</h2>
      </div>

      {/* Dynamic Subject Tabs */}
      <div className="nav-tabs">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <button
              key={subject._id}
              className={`nav-tab ${
                selectedSubject && selectedSubject._id === subject._id ? 'active' : ''
              }`}
              onClick={() => onSubjectSelect(subject)}
            >
              {subject.name}
            </button>
          ))
        ) : (
          <p className="no-subjects">No subjects available</p>
        )}
      </div>

      {/* Open Textbook Button */}
      <div className="open-textbook-btn">
        <button>📘 Open Textbook</button>
      </div>
    </div>
  );
};

export default LearningHeader;
