import React, { useEffect, useState } from "react";
import "./Learning.css";
import LearningHeader from "../../components/LearningHeader/LearningHeader";
import SubjectCards from "../../components/SubjectCards/SubjectCards";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainContent from "../../components/MainContent/MainContent";
import axios from "axios";

const Learning = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:3000/api";

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/learning/subjects`);
      if (res.data.success) {
        const subjectList = res.data.data;
        setSubjects(subjectList);

        if (subjectList.length > 0) {
          setSelectedSubject(subjectList[0]);
          fetchModulesForSubject(subjectList[0]._id);
        }
      } else {
        setError("Failed to fetch subjects");
      }
    } catch (err) {
      setError("Network error while fetching subjects");
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch modules when subject is selected
  const fetchModulesForSubject = async (subjectId) => {
    try {
      const res = await axios.get(
        `${API_BASE}/learning/subjects/${subjectId}/modules`
      );
      if (res.data.success) {
        setModules(res.data.data);
        setSelectedModule(null);
        setSelectedSubmodule(null);
      } else {
        setError("Failed to fetch modules");
      }
    } catch (err) {
      setError("Network error while fetching modules");
      console.error("Error fetching modules:", err);
    }
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    fetchModulesForSubject(subject._id);
  };

  const handleModuleSelect = async (module) => {
    setSelectedModule(module);
    setSelectedSubmodule(null);

    try {
      if (selectedSubject && module) {
        await axios.post(`${API_BASE}/learning/selection`, {
          subjectId: selectedSubject._id,
          moduleId: module._id,
        });
        console.log("Selection sent successfully");
      }
    } catch (err) {
      console.error("Error sending selection:", err);
    }
  };

  const handleSubmoduleSelect = (submodule) => {
    setSelectedSubmodule(submodule);
  };

  if (loading) {
    return (
      <div className="learning-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading LearnHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learning-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchSubjects} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-page">

      <main className="main-container">
        {/* Horizontal Subject Cards */}
        <SubjectCards
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectSelect={handleSubjectSelect}
        />

        {/* Sidebar + Main content */}
        <div className="content-wrapper">
          <Sidebar
            modules={modules}
            selectedModule={selectedModule}
            selectedSubmodule={selectedSubmodule}
            onModuleSelect={handleModuleSelect}
            onSubmoduleSelect={handleSubmoduleSelect}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <MainContent
            selectedSubject={selectedSubject}
            selectedModule={selectedModule}
            selectedSubmodule={selectedSubmodule}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </main>
    </div>
  );
};

export default Learning;
