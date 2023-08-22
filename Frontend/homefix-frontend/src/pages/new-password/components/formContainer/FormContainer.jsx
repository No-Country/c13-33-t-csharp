import React, { useState, useEffect } from "react";
import "./FormContainer.css";

export default function FormContainer() {
    const [newPassword, setNewPassword] = useState('');

  return (
    <div className="newPassword_formContianer">
      <form >
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Tu contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Ingresá nuevamente tu contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            name="password"
            value={newPassword}
          />
        </div>
        <div className="login_buttonContainer">
          <div className="login_buttonPosition">
            <button type="submit" className="btn btn-dark">
              Modificar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
