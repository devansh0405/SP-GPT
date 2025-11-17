import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FileText,
  ExternalLink,
  Book,
  Download,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({
  modules,
  selectedModule,
  selectedSubmodule,
  onModuleSelect,
  onSubmoduleSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) newExpanded.delete(moduleId);
    else newExpanded.add(moduleId);
    setExpandedModules(newExpanded);
  };

  const handleModuleClick = (module) => {
    onModuleSelect(module);
    toggleModule(module._id);
  };

  return (
    <>
      {/* Outside toggle button (when collapsed) */}
      {collapsed && (
        <button className="sidebar-toggle-outside" onClick={onToggleCollapse}>
          <Menu size={22} />
        </button>
      )}

      {/* Main Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-top">
          {/* HEADER ROW */}
          <div className="sidebar-header-row">
            <h3 className="sidebar-title">Resources</h3>

            {/* Close button INSIDE header */}
            {!collapsed && (
              <button className="sidebar-close-btn" onClick={onToggleCollapse}>
                <X size={18} />
              </button>
            )}
          </div>

          {/* TOP BUTTONS */}
          <div className="sidebar-buttons">
            <button className="sidebar-btn">
              <FileText size={16} />
              Syllabus
            </button>
            <button className="sidebar-btn">
              <ExternalLink size={16} />
              PYQs
            </button>
            <button className="sidebar-btn">
              <Book size={16} />
              Textbook
            </button>
            <button className="sidebar-btn">
              <Download size={16} />
              Notes
            </button>
          </div>
        </div>

        {/* MODULES */}
        <div className="sidebar-modules">
          <h3 className="modules-heading">Modules</h3>

          {modules.length === 0 ? (
            <div className="no-modules">
              <p>Select a subject to view modules</p>
            </div>
          ) : (
            <div className="modules-list">
              {modules.map((module) => (
                <div
                  key={module._id}
                  className={`module-block ${
                    expandedModules.has(module._id) ? "expanded" : ""
                  }`}
                >
                  <button
                    className={`module-header ${
                      selectedModule?._id === module._id ? "active" : ""
                    }`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <span className="module-name">
                      {module.order}. {module.name}
                    </span>

                    {expandedModules.has(module._id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  {expandedModules.has(module._id) && (
                    <div className="submodule-container">
                      {module.submodules.map((submodule) => (
                        <button
                          key={submodule._id}
                          className={`submodule-item ${
                            selectedSubmodule?._id === submodule._id
                              ? "active"
                              : ""
                          }`}
                          onClick={() => onSubmoduleSelect(submodule)}
                        >
                          <div className="sub-bullet"></div>
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
