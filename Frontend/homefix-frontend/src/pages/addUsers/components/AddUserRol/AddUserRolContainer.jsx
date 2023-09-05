import React from "react";
import "./AddUsersRolContainer.css";

export default function AddUserRolContainer() {
  return (
    <div className="add-users-rol-container">
      <div className="addUserRol-title">
        <h2>Rol de Usuario</h2>
      </div>
      <div className="adddUserRol-information">
        <h6>Trabajadores</h6>
        <p>
          Tienen acceso a todas las paginas. Ademas podran restar/agregar
          producto del inventario y modificar algunos datos de los productos
        </p>
        <h6>Administradores</h6>
        <p>
          Pueden hacer lo mismo que los trabajadores. Ademas pueden crear
          usuarios, crear productos nuevos y asignar precios.
        </p>
      </div>
      <div className="addUserRol-selection">
        <h5>¿Que Rol tendra este usuario?</h5>
        <div className="rol-selection rounded-4">
          <div className="rol-worker">
            <input
              class="form-check-input mx-3"
              type="radio"
              value=""
              aria-label="Radio button for following text input"
            />
            <p className="my-auto">Trabajador</p>
          </div>
          <div className="rol-admin">
            <input
              class="form-check-input mx-3"
              type="radio"
              value=""
              aria-label="Radio button for following text input"
            />
            <p className="my-auto">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
}
