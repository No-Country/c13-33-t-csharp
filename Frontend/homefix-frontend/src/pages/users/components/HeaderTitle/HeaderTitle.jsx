import React from "react";
import "./HeaderTitle.css";
import { useNavigate } from "react-router-dom";

export default function HeaderTitle({ setShowEdition, showEdition }) {
  const navigate = useNavigate();

  const editorHandler = () => {
    setShowEdition(true);
  };

  const saveEditionUser = () => {
    setShowEdition(false);
  }

  return (
    <div className="users-title-container">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="users-button-container">
        <button
          type="button"
          className="btn btn-outline-dark mx-4 rounded-pill"
          onClick={() => navigate("/add-users")}
        >
          Crear usuario
        </button>
        {showEdition ? (
          <button type="button" className="btn btn-dark rounded-pill" onClick={saveEditionUser}>
            Guardar
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-dark rounded-pill"
            onClick={editorHandler}
          >
            Editar Usuario
          </button>
        )}
      </div>
    </div>
  );
}
