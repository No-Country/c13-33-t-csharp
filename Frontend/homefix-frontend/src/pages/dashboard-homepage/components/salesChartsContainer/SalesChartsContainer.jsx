import React from 'react'
import './SalesChartsContainer.css'

export default function SalesChartsContainer() {
	return (
		<div className="sales-chart-container">
			<div className="chart-title">
				<h3>Ventas (últimos 6 meses)</h3>
			</div>
			<div className="bar-chart-container"></div>
		</div>
	)
}
