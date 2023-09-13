import React, { useState, useEffect } from 'react'
import './FormContainer.css'
import { useDispatch } from 'react-redux'
import resetService from '../../../../services/reset'
import { setMessage } from '../../../../reducers/messageReducer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import showPasswordIcon from '../../../../assets/image/contraseña_mostrar.png'
import hidePasswordIcon from '../../../../assets/image/contraseña_ocultar.png'

export default function FormContainer() {
	const [showPassword, setShowPassword] = useState(false)
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [searchParams] = useSearchParams()

	const email = searchParams.get('email')
	const tokenFromUrl = searchParams.get('token')
	const token = tokenFromUrl.replace(/ /g, '+')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(setMessage(null))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = event => {
		event.preventDefault()
		if (password === newPassword) {
			if (!(newPassword || password)) {
				dispatch(setMessage('Rellena los campos faltantes'))
			} else {
				setPassword('')
				setNewPassword('')
				resetPassword({ email, token, password })
			}
		} else {
			dispatch(setMessage('Las contraseñas no coinciden'))
		}
	}

	const resetPassword = async credentials => {
		try {
			const response = await resetService.reset(credentials)
			console.log(response)
			dispatch(setMessage('Contraseña restablecida con éxito'))
			setPassword('')
			setNewPassword('')
			setTimeout(() => {
				navigate('/login-form')
			}, 3000)
		} catch (error) {
			dispatch(setMessage('No se pudo restablecer la contraseña'))
		}
	}

	const passwordHandler = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="newPassword_formContainer">
			<form className="newPassword_form" onSubmit={handleSubmit}>
				<div className="newPassword-password-container">
					<label htmlFor="password" className="form-label">
						Nueva contraseña
					</label>
					<div className="input-group">
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control formInput formInputPassword pt-3"
							id="password"
							placeholder="Ingresa la nueva contraseña"
							name="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							className="showPasswordImage-button border border-opacity-50 px-2"
							type="button"
							id="button-addon1"
							onClick={passwordHandler}
						>
							<img
								className="showPasswordImage "
								src={showPassword ? showPasswordIcon : hidePasswordIcon}
								alt="show hide icon"
							/>
						</button>
					</div>
				</div>
				<div className="newPassword-repassword-container">
					<label htmlFor="password" className="form-label">
						Repite la nueva contraseña
					</label>
					<div className="input-group">
						<input
							type={showPassword ? 'text' : 'password'}
							className="form-control formInput formInputPassword pt-3"
							id="newPassword"
							placeholder="Repite la nueva contraseña"
							name="newPassword"
							value={newPassword}
							onChange={({ target }) => setNewPassword(target.value)}
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
								alt="show hide icon"
							/>
						</button>
					</div>
				</div>
				<div className="newPassword_buttonContainer">
					<button type="submit" className="btn btn-dark submitButton">
						Enviar
					</button>
				</div>
			</form>
		</div>
	)
}
