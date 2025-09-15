import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X, FileText, ExternalLink, Book, Download } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({
  modules,
  selectedModule,
  selectedSubmodule,
  onModuleSelect,
  onSubmoduleSelect,
  collapsed,
  onToggleCollapse
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleModuleClick = (module) => {
    onModuleSelect(module);
    toggleModule(module._id);
  };

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={onToggleCollapse}
      >
        {collapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>Important Links</h3>
          <div className="important-links">
            <div className="materials-grid first">
              <button className="material-btn">
                <FileText size={16} />
                Syllabus
              </button>
              <button className="material-btn">
                <ExternalLink size={16} />
                PYQS
              </button>
            </div>
            <div className="materials-grid">
              <button className="material-btn primary">
                <Book size={20} />
                TextBook
              </button>
              <button className="material-btn ">
                <Download size={20} />
                Notes
              </button>
            </div>
          </div>
        </div>

        <div className="modules-section">
          <h3>Modules</h3>
          
          {modules.length === 0 ? (
            <div className="no-modules">
              <p>Select a subject to view modules</p>
            </div>
          ) : (
            <div className="modules-list">
              {modules.map((module) => (
                <div key={module._id} className={`module-item ${expandedModules.has(module._id) ? 'expanded' : ''}`}>
                  <button
                    className={`module-header ${selectedModule?._id === module._id ? 'active' : ''}`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <div className="module-info">
                      <span className="module-name">{module.order}. {module.name}</span>
                      <span className="module-topics">
                        {module.submodules.length} Submodules
                      </span>
                    </div>
                    {expandedModules.has(module._id) ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </button>
                  
                  {expandedModules.has(module._id) && (
                    <div className="submodules-list">
                      
                      {module.submodules.map((submodule) => (
                        <button
                          key={submodule._id}
                          className={`submodule-item ${selectedSubmodule?._id === submodule._id ? 'active' : ''}`}
                          onClick={() => onSubmoduleSelect(submodule)}
                        >
                          <div className="submodule-indicator"></div>
                          <span>{submodule.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
