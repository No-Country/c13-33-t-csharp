import React from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navBar-container">
      <h2 className="mt-5 mx-5">Menu</h2>
      <div className="button-menu-list">
        <button className="button-reset mt-3">Resumen</button>
        <button className="button-reset mt-3">Usuarios</button>
        <button className="button-reset mt-3">Inventario</button>
        <button className="button-reset mt-3">Informe</button>
      </div>
    </div>
  );
}
