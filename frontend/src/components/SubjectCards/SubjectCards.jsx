import React from "react";
import "./SubjectCards.css";

const SubjectCards = ({ subjects, selectedSubject, onSubjectSelect }) => {
  return (
    <div className="subject-bar">
      {subjects.map((subject) => (
        <button
          key={subject._id}
          className={`subject-btn ${
            selectedSubject && selectedSubject._id === subject._id
              ? "active"
              : ""
          }`}
          onClick={() => onSubjectSelect(subject)}
        >
          {subject.name}
        </button>
      ))}
    </div>
  );
};

export default SubjectCards;
