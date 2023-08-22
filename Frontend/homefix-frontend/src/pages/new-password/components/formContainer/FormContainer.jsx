import React, { useState, useEffect } from "react";
import "./FormContainer.css";
import { useDispatch } from 'react-redux';
import loginService from '../../../../services/login';
import { setMessage } from '../../../../reducers/messageReducer';

export default function FormContainer() {
    const [password , setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(setMessage(null))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    const handleSubmit = event => {
		event.preventDefault()
        if(password === newPassword){
            if (!(newPassword || password)) {
                dispatch(setMessage('Rellena los campos faltantes'))
            } else {
          console.log('set');
                setNewPassword('')
                handlePassword(newPassword)
            }
        } else{
            dispatch(setMessage('La contraseña ingresada no es correcta'))
        }

	}

    const handlePassword = async (newPassword) => {
		try {
			/*const user = await loginService.login({ email, password })
			dispatch(setToken(`bearer ${user.token}`))
			window.localStorage.setItem('loggedHomefixUser', JSON.stringify(user))
			dispatch(setUser(user))*/
		} catch (error) {
			dispatch(
				setMessage('El correo electrónico y/o contraseña no son correctas')
			)
		}
	}

  return (
    <div className="newPassword_formContianer">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Tu contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Ingresá nuevamente tu contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="Ingresa tu contraseña"
            name="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <div className="login_buttonContainer">
          <div className="login_buttonPosition">
            <button type="submit" className="btn btn-dark">
              Modificar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
