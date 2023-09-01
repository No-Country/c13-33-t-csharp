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
import { useDispatch, useSelector } from 'react-redux'
import { useMonthNames } from '../../../../hooks/hooks'
import { useEffect } from 'react'
import { setSalesChartData } from '../../../../reducers/salesChartDataReducer'
import salesChartService from '../../../../services/salesChart'

export default function SalesChartsContainer() {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

	const salesChartData = useSelector(state => state.salesChartData)
	const token = useSelector(state => state.token)

	const dispatch = useDispatch()

	useEffect(() => {
		salesChartService.getData(token).then(data => {
			dispatch(setSalesChartData(data))
		})
	}, [dispatch, token])

	const monthsArray = salesChartData.map(object => object.mes - 1)
	const labels = useMonthNames(monthsArray)

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
