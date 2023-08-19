import "./App.css";
import LoginForm from "./pages/login-form/LoginForm";
import { Route, Routes } from "react-router-dom";
import PaswordReset from "./pages/password-reset/PaswordReset";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login-form" element={<LoginForm />}></Route>
        <Route path="/password-reset" element={<PaswordReset/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
