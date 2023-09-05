import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
import AdminSection from "../components/AdminSection/AdminSection";
import WorkersSection from "../components/WorkersSection/WorkersSection";
import { setAllUsersData } from "../../../reducers/allUsersDataReducer";
import "./Layout.css";
import allUsersService from "../../../services/allUsers";

export default function Layout() {
  const allUsersData = useSelector((state) => state.allUsersData);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    allUsersService.getUsersData(token).then((data) => {
      dispatch(setAllUsersData(data));
    });
  }, []);

  return (
    <div className="users-layout">
      <HeaderBar className="headerBar" />
      <NavBar className="navBar" />
      <HeaderTitle />
      <AdminSection
        adminUsers={allUsersData.filter(
          (user) => user.rol.toLowerCase() === "administrador"
        )}
      />
      <WorkersSection
        workersUsers={allUsersData.filter(
          (user) => user.rol.toLowerCase() === "trabajador"
        )}
      />
    </div>
  );
}
