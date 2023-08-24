import React from "react";
import "./HeaderBar.css";
import HeaderNavLogo from "../../assets/image/HomeFix-navbar-logo.png";

export default function HeaderBar() {
  return (
    <div className="headerBar-container">
      <nav class="header-navbar">
        <img className="mt-3 mx-5" src={HeaderNavLogo} alt="Home Fix Logo" />
        <div class="dropdown mt-3 mx-5">
          <button
            class="btn "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Mi Perfil
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
