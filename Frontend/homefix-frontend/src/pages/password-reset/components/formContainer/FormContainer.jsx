import React, { useEffect, useState } from 'react'
import './FormContainer.css'
import { useDispatch } from 'react-redux'
import recoveryService from '../../../../services/recovery'
import { setMessage } from '../../../../reducers/messageReducer'
import ButtonContainer from '../buttonContainer/ButtonContainer'

export default function FormContainer() {
	const [email, setEmail] = useState('')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setMessage(null))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handlePasswordReset = event => {
		event.preventDefault()
		if (email) {
			sendRecoveryMail(email)
			return
		}
		return dispatch(setMessage('Por favor ingresa tu correo electrónico'))
	}

	const sendRecoveryMail = async email => {
		try {
			await recoveryService.recovery({ email })
			dispatch(
				setMessage('Te hemos enviado el enlace de recuperación por e-mail')
			)
		} catch (error) {
			dispatch(setMessage('Dirección de correo electrónico no registrada'))
		}
	}

	return (
		<>
			<div className="passwordReset_formContainer">
				<form className="passwordReset_form" onSubmit={handlePasswordReset}>
					<div className="passwordReset_labelInput-container">
						<label htmlFor="email" className="form-label">
							Correo electrónico
						</label>
						<input
							type="email"
							className="form-control formInput"
							id="email"
							placeholder="Ingresa tu correo electrónico"
							name="email"
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							autoComplete="off"
						/>
					</div>
					<div className="passwordReset_buttonContainer">
						<button type="submit" className="btn btn-dark submitButton">
							Enviar
						</button>
						<ButtonContainer />
					</div>
				</form>
			</div>
		</>
	)
}
