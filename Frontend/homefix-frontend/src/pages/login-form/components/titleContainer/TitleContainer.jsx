import React from 'react'
import './TitleContainer.css'
import { useSelector } from 'react-redux'

export default function TitleContainer() {
	const message = useSelector(state => state.message)

	return (
		<div className="login_titleContainer">
			<div className="login_titlePosition">
				<h2>Iniciar sesión</h2>
				{message ? <p style={{ color: 'red' }}>{message}</p> : null}
			</div>
		</div>
	)
}
