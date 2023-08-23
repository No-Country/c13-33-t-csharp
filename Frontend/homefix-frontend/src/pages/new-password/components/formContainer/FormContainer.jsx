import React, { useState, useEffect } from 'react'
import './FormContainer.css'
import { useDispatch } from 'react-redux'
import resetService from '../../../../services/reset'
import { setMessage } from '../../../../reducers/messageReducer'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function FormContainer() {
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [searchParams] = useSearchParams()

	const email = searchParams.get('email')
	const token = `bearer ${searchParams.get('token')}`

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
			dispatch(
				setMessage(
					'Contraseña restablecida con éxito, re-dirigiendo a Inicio de Sesión'
				)
			)
			setPassword('')
			setNewPassword('')
			setTimeout(() => {
				navigate('/login-form')
			}, 2000)
		} catch (error) {
			dispatch(setMessage('Hubo un problema al restablecer la contraseña'))
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
						Ingresa nuevamente tu contraseña
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
	)
}
