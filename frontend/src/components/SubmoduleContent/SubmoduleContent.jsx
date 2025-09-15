import React from 'react';
import { Book, Play, Download } from 'lucide-react';
import './SubmoduleContent.css';

const SubmoduleContent = ({ subject, module, submodule }) => {
  return (
    <div className="submodule-content">
      <div className="breadcrumb">
        <span>{subject?.name}</span>
        <span className="separator">•</span>
        <span>Module {module?.order}</span>
      </div>

      <div className="videos-section">
        <h3>Videos</h3>
        <div className="topic-card">
          <div className="topic-header">
            <Play size={16} />
            <h4>{submodule.title}</h4>
          </div>
          <div className="topic-content">
            <p>
              {submodule.content ||
                'Content for this topic will be displayed here. This includes detailed explanations, key concepts, and practical examples to help you understand the material better.'}
            </p>
          </div>
          <div className="video-placeholder">
            <div className="video-icon">
              <Play size={32} />
            </div>
            <p>Video content will be loaded here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmoduleContent;
