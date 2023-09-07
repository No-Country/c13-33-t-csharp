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

const SoldProductsContainer = () => {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

	// const salesChartData = useSelector(state => state.salesChartData)
	// const token = useSelector(state => state.token)

	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	salesChartService.getData(token).then(data => {
	// 		dispatch(setSalesChartData(data))
	// 	})
	// }, [dispatch, token])

	// const monthsArray = salesChartData.map(object => object.mes - 1)
	// const labels = useMonthNames(monthsArray)

	const testTableData = [
		{
			id: 1,
			product: 'Destornillador cruz',
			price: '3690',
			quantity: 9,
		},
		{
			id: 2,
			product: 'Lampara colgante',
			price: '40990',
			quantity: 15,
		},
		{
			id: 3,
			product: 'Lampara pie',
			price: '30000',
			quantity: 11,
		},
		{
			id: 4,
			product: 'Martillo carpintero',
			price: '5990',
			quantity: 5,
		},
		{
			id: 5,
			product: 'Puerta con ventanas',
			price: '176000',
			quantity: 5,
		},
	]

	const labels = testTableData
		.sort((a, b) => a.quantity - b.quantity)
		.map(d => d.product)

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
					return testTableData[i].quantity
				}),
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
