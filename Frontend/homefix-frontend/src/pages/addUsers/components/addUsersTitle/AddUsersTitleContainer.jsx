import React from "react";
import "./AddUsersTitleContainer.css";
import { useNavigate } from "react-router-dom";

export default function AddUsersTitleContainer() {
  const navigate = useNavigate();
  return (
    <div className="add-users-title-container">
      <div className="addUsers-title">
        <h2>Usuarios &gt; Nuevo Usuario</h2>
      </div>
      <div className="addUsers-buttonSection">
        <button
          type="button"
          class="btn btn-outline-dark mx-4 rounded-pill"
          onClick={() => navigate("/users")}
        >
          Cancelar
        </button>
        <button type="button" class="btn btn-outline-dark rounded-pill">
          Guardar Usuario
        </button>
      </div>
    </div>
  );
}
