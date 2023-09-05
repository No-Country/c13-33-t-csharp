import React from "react";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
import AdminSection from "../components/AdminSection/AdminSection";
import WorkersSection from "../components/WorkersSection/WorkersSection";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="users-layout">
      <HeaderBar className="headerBar" />
      <NavBar className="navBar" />
      <HeaderTitle />
      <AdminSection />
      <WorkersSection />
    </div>
  );
}
