import React from 'react'
import './ButtonContainer.css'
import { Link } from 'react-router-dom'

export default function ButtonContainer() {
	return (
		<div className="passwordReset_buttonContainer">
			<button type="button" className="btn btn-dark">
				Enviar
			</button>
			<Link
				to={{ pathname: '/login-form' }}
				type="button"
				className="btn btn-outline-dark"
			>
				Volver a iniciar sesión
			</Link>
		</div>
	)
}
