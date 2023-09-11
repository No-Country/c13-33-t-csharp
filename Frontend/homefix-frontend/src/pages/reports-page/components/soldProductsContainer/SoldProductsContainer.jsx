import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import './SoldProductsContainer.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const SoldProductsContainer = () => {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)
	const [labels, setLabels] = useState([])

	const monthSales = useSelector(state => state.monthSales)
	const sortedMonthSalesCopy = [...monthSales].sort(
		(a, b) => a.cantidad - b.cantidad
	)

	useEffect(() => {
		setLabels(() => {
			return sortedMonthSalesCopy.map(d => d.nombre)
		})
	}, [monthSales])

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
				data:
					labels.length > 0 &&
					sortedMonthSalesCopy.length > 0 &&
					labels.map((v, i) => sortedMonthSalesCopy[i].cantidad),
			},
		],
	}

	return (
		<div className="reports-sold-products-container">
			<h3 className="reports-sold-products-title">Productos vendidos</h3>
			<hr />
			<div className="reports-sold-products-barchart-container">
				<Bar options={options} data={data} />
			</div>
		</div>
	)
}

export default SoldProductsContainer
