import React from "react";
import "./HeaderTitle.css";

export default function HeaderTitle() {
  return (
    <div className="users-title-container">
      <div>
        <h2>Usuarios</h2>
      </div>
      <div className="users-button-container">
        <button type="button" class="btn btn-outline-dark mx-4 rounded-pill">
          Crear usuario
        </button>
        <button type="button" class="btn btn-outline-dark rounded-pill">
          Editar Usuario
        </button>
      </div>
    </div>
  );
}
