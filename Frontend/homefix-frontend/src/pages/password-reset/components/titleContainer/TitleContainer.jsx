import React from 'react'
import './TitleContainer.css'
import { useSelector } from 'react-redux'

export default function TitleContainer() {
	const message = useSelector(state => state.message)

	return (
		<div className="passwordReset_titleContainer">
			<h1>¿Olvidaste tu contraseña?</h1>
			{message ? <p style={{ color: 'red' }}>{message}</p> : null}
		</div>
	)
}
