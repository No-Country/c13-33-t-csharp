import React from "react";
import "./Layout.css";
import "./LayoutResponsive.css";
import ImageContainer from "../../login-form/components/imageContainer/ImageContainer";
import LogoContainer from "../components/logoContainer/LogoContainer";
import TitleContainer from "../components/titleContainer/TitleContainer";
import FormContainer from "../components/formContainer/FormContainer";

export default function Layout() {
  return (
    <div className="newPassword_layout">
      <ImageContainer />
      <LogoContainer />
      <TitleContainer />
      <FormContainer />
    </div>
  );
}
