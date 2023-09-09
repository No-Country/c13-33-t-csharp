import React from 'react'
import './ButtonContainer.css'
import { Link } from 'react-router-dom'

export default function ButtonContainer() {
	return (
		<div className="passwordReset_submit_buttonContainer">
			<Link
				to={{ pathname: '/login' }}
				type="button"
				className="btn btn-outline-dark submitButton"
			>
				Volver a iniciar sesión
			</Link>
		</div>
	)
}
