import React from "react";
import "./Layout.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import AddProductContainer from "../components/addProductContainer/AddProductContainer";

export default function Layout() {
  return (
    <div className="add-product-layout">
      <NavBar className="navBar" />
      <HeaderBar className="headerBar" />
      <AddProductContainer/>
    </div>
  );
}
