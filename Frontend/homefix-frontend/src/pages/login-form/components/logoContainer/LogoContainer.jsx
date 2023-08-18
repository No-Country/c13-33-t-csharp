import React from "react";
import "./LogoContainer.css";
import loginLogo from "../../../../assets/image/LOGO-HomeFix.png";

export default function LogoContainer() {
  return (
    <div className="login_logoContainer">
      <div className="login_logoPosition">
        <img src={loginLogo} alt="Home Fix Logo" />
      </div>
    </div>
  );
}
