import React from "react";
import "./Layout.css"
import ImageContainer from "../components/imageContainer/ImageContainer";
import LogoContainer from "../components/logoContainer/LogoContainer";
import TitleContainer from "../components/titleContainer/TitleContainer";
import FormContainer from "../components/formContainer/FormContainer";
import ButtonContainer from "../components/buttonContainer/ButtonContainer";

export default function Layout() {
  return (
    <div className="login_layout">
      <ImageContainer />
      <LogoContainer />
      <TitleContainer />
      <FormContainer />
      <ButtonContainer />
    </div>
  );
}
