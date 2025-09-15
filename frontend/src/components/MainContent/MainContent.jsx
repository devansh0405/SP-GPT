import React from 'react';
import Chatbot from '../Chatbot/Chatbot';
import SubmoduleContent from '../SubmoduleContent/SubmoduleContent';
import './MainContent.css';

const MainContent = ({
  selectedSubject,
  selectedModule,
  selectedSubmodule,
  sidebarCollapsed
}) => {
  return (
    <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
      {selectedSubmodule ? (
        <div className="content-split">
          <div className="submodule-section">
            <SubmoduleContent 
              subject={selectedSubject}
              module={selectedModule}
              submodule={selectedSubmodule}
            />
          </div>
          <div className="chatbot-section">
            <Chatbot />
          </div>
        </div>
      ) : (
        <div className="welcome-content">
          {selectedSubject ? (
            <div className="subject-welcome">
              <h2>Welcome to {selectedSubject.name}</h2>
              <p>
                Select a module and topic from the sidebar to begin learning,
                or use the chatbot to get instant help.
              </p>
            </div>
          ) : (
            <div className="general-welcome">
              <h2>Welcome to SP-GPT Learning Module</h2>
              <p>
                Select a subject to explore modules, topics, and study
                materials. Use our AI chatbot for YouTube video summaries and
                Q&A assistance.
              </p>
            </div>
          )}
          <div className="chatbot-full">
            <Chatbot />
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
