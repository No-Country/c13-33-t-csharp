import "./App.css";
import LoginForm from "./pages/login-form/LoginForm";
import { Route, Routes } from "react-router-dom";
import PaswordReset from "./pages/password-reset/PasswordReset";
import NewPassword from "./pages/new-password/NewPassword";
import DashboardHomepage from "./pages/dashboard-homepage/DashboardHomepage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login-form" element={<LoginForm />}></Route>
        <Route path="/password-reset" element={<PaswordReset />}></Route>
        <Route path="/reset" element={<NewPassword />}></Route>
        <Route
          path="/dashboard-homepage"
          element={<DashboardHomepage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
