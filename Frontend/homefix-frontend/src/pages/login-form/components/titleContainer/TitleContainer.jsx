import React from 'react'
import './TitleContainer.css'
import { useSelector } from 'react-redux'

export default function TitleContainer() {
	const message = useSelector(state => state.message)

	return (
		<>
			<div className="login_titleContainer">
				<h2>Iniciar sesión</h2>
			</div>
			<div className="login-notification-container">
				{message ? <p style={{ color: '#F14B4B' }}>{message}</p> : null}
			</div>
		</>
	)
}
