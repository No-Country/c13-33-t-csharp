import React from 'react'
import './titleContainer.css'

export default function TitleContainer() {
	let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
		new Date()
	)

	return (
		<div className="homepage-title-container">
			<h1 className="mt-5">
				¡Bienvenido! Este es tu resumen de lo que va de <span>{mesActual}</span>
			</h1>
		</div>
	)
}
