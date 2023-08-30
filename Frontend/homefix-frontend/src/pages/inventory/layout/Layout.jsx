import React from "react";
import "./Layout.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import InventoryContainer from "../components/inventoryContainer/InventoryContainer";

export default function Layout() {
  return (
    <div className="inventory-layout">
      <HeaderBar />
      <NavBar />
      <InventoryContainer/>
    </div>
  );
}
