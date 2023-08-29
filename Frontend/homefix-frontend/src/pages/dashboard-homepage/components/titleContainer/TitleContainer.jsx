import React from 'react'
import './titleContainer.css'

export default function TitleContainer({ monthNames }) {
	const date = new Date()
	const monthName = monthNames(date.getMonth())
	const actualYear = date.getFullYear()

	return (
		<div className="homepage-title-container">
			<h1 className="mt-5">
				¡Bienvenido! Este es tu resumen de lo que va de{' '}
				<span style={{ color: '#FBAE43', textTransform: 'capitalize' }}>
					{monthName}, {actualYear}
				</span>
			</h1>
		</div>
	)
}
