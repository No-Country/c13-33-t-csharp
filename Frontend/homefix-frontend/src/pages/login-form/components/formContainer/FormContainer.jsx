import React, { useState } from 'react'
import './FormContainer.css'
import { Link } from 'react-router-dom'
import loginService from '../../../../services/login'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../reducers/tokenReducer'
import { setUser } from '../../../../reducers/userReducer'
import { setErrorMessage } from '../../../../reducers/errorMessageReducer'

export default function FormContainer() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()
		if (!(email && password)) {
			dispatch(setErrorMessage('Rellena los campos faltantes'))
		} else {
			dispatch(setErrorMessage(null))
			setEmail('')
			setPassword('')
			handleLogin(email, password)
		}
	}

	const handleLogin = async (email, password) => {
		try {
			const user = await loginService.login({ email, password })
			dispatch(setToken(`bearer ${user.token}`))
			window.localStorage.setItem('loggedHomefixUser', JSON.stringify(user))
			dispatch(setUser(user))
		} catch (error) {
			dispatch(
				setErrorMessage('El correo electrónico y/o contraseña no son correctas')
			)
		}
	}
	return (
		<div className="login_formContainer">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput" className="form-label">
						Correo electrónico
					</label>
					<input
						type="text"
						className="form-control"
						id="email"
						placeholder="Ingresa tu correo electrónico"
						name="email"
						value={email}
						onChange={({ target }) => setEmail(target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput2" className="form-label">
						Contraseña
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
				<div className="login_buttonContainer">
					<div className="login_buttonPosition">
						<button type="submit" className="btn btn-dark">
							Iniciar sesión
						</button>
					</div>
				</div>
				<Link
					to={{
						pathname: '/password-reset',
					}}
				>
					¿Olvidaste tu contraseña?
				</Link>
			</form>
		</div>
	)
}
