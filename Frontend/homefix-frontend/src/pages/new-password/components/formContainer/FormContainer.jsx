import React, { useState, useEffect } from "react";
import "./FormContainer.css";
import { useDispatch } from "react-redux";
import loginService from "../../../../services/login";
import { setMessage } from "../../../../reducers/messageReducer";
import showPasswordIcon from "../../../../assets/image/contraseña_mostrar.png";
import hidePasswordIcon from "../../../../assets/image/contraseña_ocultar.png";

export default function FormContainer() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessage(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === newPassword) {
      if (!(newPassword || password)) {
        dispatch(setMessage("Rellena los campos faltantes"));
      } else {
        console.log("set");
        setNewPassword("");
        handlePassword(newPassword);
      }
    } else {
      dispatch(setMessage("La contraseña ingresada no es correcta"));
    }
  };

  const handlePassword = async (newPassword) => {
    try {
      /*const user = await loginService.login({ email, password })
			dispatch(setToken(`bearer ${user.token}`))
			window.localStorage.setItem('loggedHomefixUser', JSON.stringify(user))
			dispatch(setUser(user))*/
    } catch (error) {
      dispatch(
        setMessage("El correo electrónico y/o contraseña no son correctas")
      );
    }
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="newPassword_formContianer">
      <form className="newPassword_form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control formInput formInputPassword pt-3"
              id="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              class="showPasswordImage-button border border-opacity-50 px-2"
              type="button"
              id="button-addon2"
              onClick={passwordHandler}
            >
              <img
                className="showPasswordImage "
                src={showPassword ? showPasswordIcon : hidePasswordIcon}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Ingresá nuevamente tu contraseña
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control formInput formInputPassword pt-3"
              id="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              class="showPasswordImage-button border border-opacity-50 px-2"
              type="button"
              id="button-addon2"
              onClick={passwordHandler}
            >
              <img
                className="showPasswordImage "
                src={showPassword ? showPasswordIcon : hidePasswordIcon}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="newPassword_buttonContainer">
          <button type="submit" className="btn btn-dark submitButton newPassword_buttonPosition pt-2">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
