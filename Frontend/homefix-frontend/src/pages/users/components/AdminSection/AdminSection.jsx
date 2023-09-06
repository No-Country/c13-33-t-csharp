import React from "react";
import "./AdminSection.css";
import noImg from "../../../../assets/image/icons8-sin-imágen-100.png";
import editionBadge from "../../../../assets/image/editionBadge.png";

export default function AdminSection({ adminUsers, showEdition }) {
  console.log(adminUsers);

  return (
    <div className="users-adminSection">
      <div className="users-adminSection-title">
        <h2>
          Administradores(
          {adminUsers.length > 0 ? adminUsers[0].usuarios?.length : 0})
        </h2>
      </div>
      <div className="users-admin-cards">
        <div className="admin-cards-container">
          {adminUsers.map((admin, i) => (
            <div key={i} className="adminCard dropdown">
              {admin.usuarios.map((user, j) =>
                showEdition ? (
                  <div key={j}>
                    {user.imagenPerfil === null ||
                    user.imagenPerfil === undefined ? (
                      <img src={noImg} alt="" className="users-image" />
                    ) : (
                      <img
                        src={user.imagenPerfil}
                        alt=""
                        className="users-image"
                      />
                    )}
                    <p className="text-center">
                      {user.nombre} {user.apellido}
                    </p>
                    <button
                      className="button-reset"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="editionBadge"
                        src={editionBadge}
                        alt="Edition Badge"
                      />
                      <ul class="dropdown-menu dropdown-users-menu">
                        <li>
                          <button class="dropdown-item" href="#">
                            Cambiar Rol
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" href="#">
                            Eliminar Usuario
                          </button>
                        </li>
                      </ul>
                    </button>
                  </div>
                ) : (
                  <div key={j}>
                    {user.imagenPerfil === null ||
                    user.imagenPerfil === undefined ? (
                      <img src={noImg} alt="" className="users-image" />
                    ) : (
                      <img
                        src={user.imagenPerfil}
                        alt=""
                        className="users-image"
                      />
                    )}
                    <p className="text-center">
                      {user.nombre} {user.apellido}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
