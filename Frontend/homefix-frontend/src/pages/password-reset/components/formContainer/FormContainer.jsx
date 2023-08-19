import React from 'react'
import './FormContainer.css'

export default function FormContainer() {
	const handlePasswordReset = event => {
		event.preventDefault()
	}

	return (
		<div className="passwordReset_formContainer">
			<form onSubmit={handlePasswordReset}>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput" className="form-label">
						Correo electrónico
					</label>
					<input
						type="text"
						className="form-control"
						id="emailRecovery"
						placeholder="Ingresa tu correo electrónico"
					/>
				</div>
				<div className="passwordReset_buttonContainer">
					<button type="submit" className="btn btn-dark">
						Enviar
					</button>
				</div>
			</form>
		</div>
	)
}
