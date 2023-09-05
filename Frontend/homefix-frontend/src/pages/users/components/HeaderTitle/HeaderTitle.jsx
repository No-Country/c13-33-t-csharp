import React from "react";
import "./HeaderTitle.css";
import { useNavigate } from "react-router-dom";

export default function HeaderTitle() {
    const navigate = useNavigate();

  return (
    <div className="users-title-container">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="users-button-container">
        <button type="button" class="btn btn-outline-dark mx-4 rounded-pill"
                    onClick={() => navigate("/add-users")}>
          Crear usuario
        </button>
        <button type="button" class="btn btn-outline-dark rounded-pill">
          Editar Usuario
        </button>
      </div>
    </div>
  );
}
