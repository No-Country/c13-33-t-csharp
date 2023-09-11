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
import { useSelector } from 'react-redux'
import { useMonthNames } from '../../../../hooks/hooks'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SalesChartsContainer() {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

	const [recentSales, setRecentSales] = useState([])
	const date = new Date()
	const currentMonth = date.getMonth() + 1

	const token = useSelector(state => state.token)

	useEffect(() => {
		const getSales = async month => {
			const baseUrl = 'https://homefix.fly.dev/api/resumen/articulosporfecha'
			const config = {
				headers: {
					Authorization: token,
				},
			}
			const response = await axios.get(`${baseUrl}?month=${month}`, config)
			return response.data
		}

		const fillRecentSales = async month => {
			const response = await getSales(month)
			if (response.length > 0) {
				const object = {
					month: response[0].mes,
					total: response.reduce((acc, curr) => acc + curr.total, 0),
				}
				setRecentSales((prev, curr) => prev.concat(object))
			}
		}
		for (let index = currentMonth; index > currentMonth - 6; index--) {
			fillRecentSales(index)
		}
		// eslint-disable-next-line
	}, [])

	const orderedRecentSales = recentSales.sort((a, b) => a.month - b.month)
	const labels = useMonthNames(orderedRecentSales.map(v => v.month - 1))

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
				data: orderedRecentSales.map(v => v.total),
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
