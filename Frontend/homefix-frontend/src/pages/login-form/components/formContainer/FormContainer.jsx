import React, { useEffect, useState } from 'react'
import './FormContainer.css'
import { Link } from 'react-router-dom'
import loginService from '../../../../services/login'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../reducers/tokenReducer'
import { setUser } from '../../../../reducers/userReducer'
import { setMessage } from '../../../../reducers/messageReducer'

export default function FormContainer() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setMessage(null))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = event => {
		event.preventDefault()
		if (!(email && password)) {
			dispatch(setMessage('Rellena los campos faltantes'))
		} else {
			dispatch(setMessage(null))
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
				setMessage('El correo electrónico y/o contraseña no son correctas')
			)
		}
	}
	return (
		<div className="login_formContainer">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Correo electrónico
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Ingresa tu correo electrónico"
						name="email"
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						autoComplete="on"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
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
