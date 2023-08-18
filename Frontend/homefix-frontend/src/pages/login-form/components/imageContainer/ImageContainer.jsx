import React from "react";
import "./ImageContainer.css";
import loginImage from "../../../../assets/image/IMG_INICIOSESION.jpg";

export default function ImageContainer() {
  return (
    <div className="login_imageContainer">
      <img src={loginImage} alt="Home Fix Logo" />
    </div>
  );
}
