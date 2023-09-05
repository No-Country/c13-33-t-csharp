import React, { useState } from "react";
import "./AddUsersRolContainer.css";

export default function AddUserRolContainer() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
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
              id="checkBox-user"
              name="userRole"
              className="form-check-input mx-3"
              type="radio"
              value="Trabajador"
              checked={selectedRole === "Trabajador"}
              onChange={handleRoleChange}
              aria-label="Radio button for following text input"
            />
            <p className="my-auto">Trabajador</p>
          </div>
          <div className="rol-admin">
            <input
              id="checkBox-admin"
              name="userRole"
              className="form-check-input mx-3"
              type="radio"
              value="Administrador"
              checked={selectedRole === "Administrador"}
              onChange={handleRoleChange}
              aria-label="Radio button for following text input"
            />
            <p className="my-auto">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
}
