import React from "react";
import "./TitleLogoContainer.css";
import TitleContainer from "../titleContainer/TitleContainer";
import LogoContainer from "../logoContainer/LogoContainer";

export default function TitleLogoContainer() {
  return (
    <div className="passwordReset_titleLogoContainer">
        <TitleContainer/>
        <LogoContainer/>
    </div>
  );
}
