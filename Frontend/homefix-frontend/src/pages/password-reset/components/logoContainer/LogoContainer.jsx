import React from "react";
import "./LogoContainer.css";
import loginLogo from "../../../../assets/image/LOGO-HomeFix.png";

export default function LogoContainer() {
  return (
    <div className="passwordReset_logoContainer">
      <img className="logoImage" src={loginLogo} alt="Home Fix Logo" />
    </div>
  );
}
