import React from 'react'
import './SalesChartsContainer.css'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

export default function SalesChartsContainer({ monthNames }) {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

	const date = new Date()
	const actualMonthNumber = date.getMonth()

	const labels = []
	for (let index = actualMonthNumber - 6; index < actualMonthNumber; index++) {
		labels.push(monthNames(index + 1))
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		borderRadius: 10,
		backgroundColor: '#FBAE43',
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'Ventas',
				data: labels.map(() => Math.random() * 5),
			},
		],
	}

	return (
		<div className="sales-chart-container">
			<div className="chart-title">
				<h3>Ventas (últimos 6 meses)</h3>
			</div>
			<div className="bar-chart-container">
				<Bar options={options} data={data} />
			</div>
		</div>
	)
}
