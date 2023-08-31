import React from 'react'
import './titleContainer.css'
import { useMonthNames } from '../../../../hooks/hooks'

export default function TitleContainer() {
	const date = new Date()
	const monthName = useMonthNames([date.getMonth()])
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
