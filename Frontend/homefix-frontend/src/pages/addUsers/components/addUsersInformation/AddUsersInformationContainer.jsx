import React, { useState } from "react";
import "./AddUsersInformationContainer.css";
import userImge from "../../../../assets/image/usershadow.png";

export default function AddUsersInformationContainer() {
  const [imagePreview, setImagePreview] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-users-information-container">
      <div className="adduser-InformationTitle">
        <h2>Informacion Basica</h2>
      </div>
      <div className="addUsersInformation-image">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="uploadInput"
        />
        <label
          className="circular-image-container"
          htmlFor="uploadInput"
          style={{ cursor: "pointer" }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ) : (
            <img
              className="circular-image"
              src={userImge}
              alt=""
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </label>
      </div>
      <div className="addUsersInformation-namePass">
        <p>Nombre</p>
        <input
          name="nombre"
          className="addProduct-editable-input"
          placeholder="Ingresa el nombre del nuevo usuario"
          //value={inputValues.descripcion}
          //onChange={handleInputChange}
        />
        <p className="pt-2">Contraseña</p>
        <input
          name="contraseña"
          className="addProduct-editable-input"
          placeholder="Ingresa una contrseña"
          //value={inputValues.descripcion}
          //onChange={handleInputChange}
        />
      </div>
      <div className="addUsersInformation-mail">
      <p>Correo Electronico</p>
        <input
          name="nombre"
          className="addProduct-editable-input"
          placeholder="Ingresa el nombre del nuevo usuario"
          //value={inputValues.descripcion}
          //onChange={handleInputChange}
        />
        <p className="pt-4"> • El usuario podrá cambiar la contraseña e imagen una vez inicie sesión</p>
      </div>
    </div>
  );
}
