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

export default function SalesChartsContainer({ monthNames }) {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

	const salesChartData = useSelector(state => state.salesChartData)

	const labels = salesChartData.map(object => monthNames(object.mes - 1))

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
				data: labels.map((v, i) => {
					return salesChartData[i].sumapreciototal
				}),
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
