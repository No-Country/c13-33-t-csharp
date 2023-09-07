import React from "react";
import "./LogoContainer.css";
import loginLogo from "../../../../assets/image/LOGO-HomeFix.png";

export default function LogoContainer() {
  return (
    <div className="newPassword_logoContainer">
      <div className="newPassword_logoPosition">
        <img className="logoImage" src={loginLogo} alt="Home Fix Logo"/>
      </div>
    </div>
  );
}
