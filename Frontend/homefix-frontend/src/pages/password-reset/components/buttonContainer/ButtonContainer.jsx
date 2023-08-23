import React from "react";
import "./ButtonContainer.css";
import { Link } from "react-router-dom";

export default function ButtonContainer() {
  return (
    <div className="passwordReset_buttonContainer">
        <Link
          to={{ pathname: "/login-form" }}
          type="button"
          className="btn btn-outline-dark passwordReset-position submitButton"
        >
          Volver a iniciar sesión
        </Link>
    </div>
  );
}
