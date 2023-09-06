import React, {useState} from "react";
import "./Layout.css";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import NavBar from "../../../components/NavBar/NavBar";
import AddUsersTitleContainer from "../components/addUsersTitle/AddUsersTitleContainer";
import AddUsersInformationContainer from "../components/addUsersInformation/AddUsersInformationContainer";
import AddUserRolContainer from "../components/AddUserRol/AddUserRolContainer";
import createUser from "../../../services/createUser";
import { useSelector, useDispatch } from "react-redux";

export default function Layout() {
  const [newUserData, setNewUserData] = useState([]);

  
  const dispatch = useDispatch();

  const createNewUser = () => {
      dispatch(createUser(newUserData))};
      
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
