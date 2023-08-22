import React from "react";
import "./TitleContainer.css";
import { useSelector } from 'react-redux'

export default function TitleContainer() {
	const message = useSelector(state => state.message)
  return (
    <div className="newPassword_titleContainer">
      <h2>Ingresar nueva contraseña</h2>
				{message ? <p style={{ color: 'red' }}>{message}</p> : null}
    </div>
  );
}
