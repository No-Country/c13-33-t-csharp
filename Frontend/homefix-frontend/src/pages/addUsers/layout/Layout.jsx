import React from "react";
import "./Layout.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import AddUsersTitleContainer from "../components/addUsersTitle/AddUsersTitleContainer";
import AddUsersInformationContainer from "../components/addUsersInformation/AddUsersInformationContainer";
import AddUserRolContainer from "../components/AddUserRol/AddUserRolContainer";

export default function Layout() {
  return (
    <div className="add-users-layout">
      <HeaderBar className="headerBar" />
      <NavBar className="navBar" />
      <AddUsersTitleContainer />
      <AddUsersInformationContainer />
      <AddUserRolContainer />
    </div>
  );
}
