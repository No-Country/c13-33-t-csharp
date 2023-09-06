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
  const [showEdition, setShowEdition] = useState(false);
  const allUsersData = useSelector((state) => state.allUsersData);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  /*   useEffect(() => {
    user.roles[0].toLowerCase() === "administrador"
      ? setShowEdition(true)
      : setShowEdition(false);
  }, []); */

  useEffect(() => {
    allUsersService.getUsersData(token).then((data) => {
      dispatch(setAllUsersData(data));
    });
  }, [allUsersData]);

  return (
    <div className="users-layout">
      <HeaderBar className="headerBar" />
      <NavBar className="navBar" />
      <HeaderTitle setShowEdition={setShowEdition} showEdition={showEdition} />
      <AdminSection
        showEdition={showEdition}
        adminUsers={allUsersData.filter(
          (user) => user.rol.toLowerCase() === "administrador"
        )}
      />
      <WorkersSection
        showEdition={showEdition}
        workersUsers={allUsersData.filter(
          (user) => user.rol.toLowerCase() === "trabajador"
        )}
      />
    </div>
  );
}
