import React, { useEffect, useState } from 'react'
import './FormContainer.css'
import { Link } from 'react-router-dom'
import loginService from '../../../../services/login'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../reducers/tokenReducer'
import { setUser } from '../../../../reducers/userReducer'
import { setMessage } from '../../../../reducers/messageReducer'
import showPasswordIcon from '../../../../assets/image/contraseña_mostrar.png'
import hidePasswordIcon from '../../../../assets/image/contraseña_ocultar.png';
import { useNavigate } from 'react-router-dom'

export default function FormContainer() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

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
			navigate('/dashboard-homepage')
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

	const passwordHandler = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="login_formContainer">
			<form className="login_form" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Correo electrónico
					</label>
					<input
						type="email"
						className="form-control formInput pt-3"
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
					<div className="input-group">
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control formInput formInputPassword pt-3"
							id="password"
							placeholder="Ingresa tu contraseña"
							name="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							className="showPasswordImage-button border border-opacity-50 px-2"
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
				<Link
					className="linkToPassReset"
					to={{
						pathname: '/password-reset',
					}}
				>
					¿Olvidaste tu contraseña?
				</Link>
				<div className="login_buttonContainer">
					<div className="login_buttonPosition">
						<button type="submit" className="btn btn-dark button-login">
							Iniciar sesión
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
