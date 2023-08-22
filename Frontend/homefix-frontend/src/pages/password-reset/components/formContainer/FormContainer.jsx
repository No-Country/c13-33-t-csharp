import React, { useEffect, useState } from 'react'
import './FormContainer.css'
import { useDispatch } from 'react-redux'
import recoveryService from '../../../../services/recovery'
import { setMessage } from '../../../../reducers/messageReducer'

export default function FormContainer() {
	const [email, setEmail] = useState('')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setMessage(null))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = event => {
		event.preventDefault()
		if (email) {
			sendRecoveryData(email)
			return
		}
		return dispatch(setMessage('Por favor ingresa tu correo electrónico'))
	}

	const sendRecoveryData = async (recoveryCode, email) => {
		try {
			await recoveryService.recovery({ recoveryCode, email })
			dispatch(setMessage('Te hemos enviado un código por e-mail'))
		} catch (error) {
			dispatch(setMessage('Dirección de correo electrónico no registrada'))
		}
	}

	return (
		<>
			<div className="passwordReset_formContainer">
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
							autoComplete="off"
						/>
					</div>
					<div className="passwordReset_buttonContainer">
						<button type="submit" className="btn btn-dark">
							Enviar
						</button>
					</div>
				</form>
				<br />
			</div>
		</>
	)
}
