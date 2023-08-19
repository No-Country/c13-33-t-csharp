import React from 'react'
import './FormContainer.css'

export default function FormContainer() {
	return (
		<div className="passwordReset_formContainer">
			<form>
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
			</form>
		</div>
	)
}
