import React, { useContext } from "react";
import "./ModuleCard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const ModuleCard = ({ id, name, description, image }) => {
  //const {url} = useContext(StoreContext)
  const navigate = useNavigate();

  const handleExplore = () => {
    if (name === "Learning Module") {
      navigate("/learning-module");
    } else if (name === "Academic Tracker") {
      navigate("/academic-tracker");
    } else if (name === "Career Enhancement") {
      navigate("/career-enhancement");
    } else {
      console.warn("No route defined for:", name);
    }
  }

  return (
    <div className="module-item">
      <div className="module-item-img-container">
        <img className="module-item-img" src={image} alt="" />
      </div>
      <div className="module-item-info">
        <div className="module-item-name">
          <p>{name}</p>
        </div>
        <p className="module-item-desc">{description}</p>
        <button onClick={handleExplore}>Explore</button>
      </div>
    </div>
  );
};

export default ModuleCard;
