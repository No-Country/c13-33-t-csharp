import { useSelector } from 'react-redux'
import './DashboardResume.css'
import { useEffect, useState } from 'react'

export default function DashboardResume() {
	const [totalSales, setTotalSales] = useState()
	const [soldProducts, setSoldProducts] = useState()
	const monthSales = useSelector(state => state.monthSales)

	useEffect(() => {
		if (monthSales.length > 0) {
			setTotalSales(() => {
				return monthSales.reduce((acc, current) => acc + current.total, 0)
			})
			setSoldProducts(() => {
				return monthSales.reduce((acc, current) => acc + current.cantidad, 0)
			})
		}
	}, [monthSales])

	return (
		<div className="dashboard-resume-container">
			<div className="dashboard-resume-title">
				<h3 className="dashboard-title">Visión general</h3>
			</div>
			<div className="total-sales">
				<div className="box-title text-center text-white">
					<h4>Total de ventas</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">
						{!totalSales ? 'NoData' : '$' + Math.round(totalSales)}
					</h3>
				</div>
			</div>
			<div className="total-cost">
				<div className="box-title text-center text-white">
					<h4>Total de costos</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">
						{!totalSales ? 'NoData' : '$' + Math.round(totalSales / 1.2)}
					</h3>
				</div>
			</div>
			<div className="ros">
				<div className="box-title text-center text-white">
					<h4>ROS</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">20%</h3>
				</div>
			</div>
			<div className="products-sales">
				<div className="box-title text-center text-white">
					<h4>Productos vendidos</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">
						{!soldProducts ? 'NoData' : soldProducts}
					</h3>
				</div>
			</div>
		</div>
	)
}
