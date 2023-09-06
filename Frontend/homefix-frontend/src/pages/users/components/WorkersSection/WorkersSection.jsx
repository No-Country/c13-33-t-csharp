import React from "react";
import "./WorkersSection.css";
import noImg from "../../../../assets/image/icons8-sin-imágen-100.png";
import editionBadge from "../../../../assets/image/editionBadge.png";

export default function WorkersSection({ workersUsers, showEdition }) {
  console.log(workersUsers);

  return (
    <div className="users-workersSection">
      <div className="users-workersSection-title">
        <h2>
          Trabajadores (
          {workersUsers.length > 0 ? workersUsers[0].usuarios?.length : 0})
        </h2>
      </div>
      <div className="users-workersSection-cards">
        {workersUsers.map((admin, i) => (
          <div key={i} className="worksSection-card">
            {admin.usuarios.map((user, j) => (
              <div key={j} className="workersCard dropdown">
                {showEdition ? (
                  <>
                    <img
                      src={user.imagenPerfil || noImg}
                      alt=""
                      className="workers-image"
                    />
                    <div className="user-details">
                      <p className="">
                        {user.nombre} {user.apellido}
                      </p>
                      <p className="">
                        {user.email}
                      </p>
                    </div>
                    <button
                      className="button-reset"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="editionBadge-workers"
                        src={editionBadge}
                        alt="Edition Badge"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src={user.imagenPerfil || noImg}
                      alt=""
                      className="workers-image"
                    />
                    <div className="user-details">
                      <p className="">
                        {user.nombre} {user.apellido}
                      </p>
                      <p className="">
                        {user.email}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
