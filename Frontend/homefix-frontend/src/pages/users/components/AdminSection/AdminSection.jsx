import React from "react";
import "./AdminSection.css";
import noImg from "../../../../assets/image/icons8-sin-imágen-100.png";

export default function AdminSection({ adminUsers }) {
  console.log(adminUsers);

  return (
    <div className="users-adminSection">
      <div className="users-adminSection-title">
        <h2>Administradores({adminUsers.length})</h2>
      </div>
      <div className="users-admin-cards">
        <div className="admin-cards-container">
          {adminUsers.map((admin, i) => (
            <div key={i} className="adminCard">
              {admin.usuarios.map((user, j) => (
                <div key={j}>
                  {user.imagen === null || user.imagen === undefined ? (
                    <img
                      src={noImg}
                      alt=""
                      className="circular-image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <img
                      src={user.imagenPerfil}
                      alt=""
                      className="circular-image"
                      style={{ maxWidth: "100px", maxHeight: "100px"  }}
                    />
                  )}
                  <p className="text-center">{user.nombre} {user.apellido}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
