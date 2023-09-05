import React from "react";
import "./AdminSection.css";
import noImg from "../../../../assets/image/icons8-sin-imágen-100.png";

export default function AdminSection() {
  return (
    <div className="users-adminSection">
      <div className="users-adminSection-title">
        <h2>Administradores(4)</h2>
      </div>
      <div className="users-admin-cards">
        <div className="admin-cards-container">
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
          <div className="adminCard">
            <img src={noImg} alt="" className="circular-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }} />
            <p>Pepito Gonzalez</p>
          </div>
        </div>
      </div>
    </div>
  );
}
