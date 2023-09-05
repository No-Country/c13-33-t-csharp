import { useDispatch, useSelector } from 'react-redux'
import './DashboardResume.css'
import { useEffect } from 'react'
import { loadDashboardData } from '../../../../reducers/dashboardDataReducer'

export default function DashboardResume() {
	const dashboardData = useSelector(state => state.dashboardData)
	const token = useSelector(state => state.token)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadDashboardData(token))
		// eslint-disable-next-line
	}, [])

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
						{!dashboardData.sum ? 'NoData' : '$' + dashboardData.sum}
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
						{!dashboardData.sum ? 'NoData' : '$' + dashboardData.sum * 0.8}
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
						{!dashboardData.productosvendidos
							? 'NoData'
							: dashboardData.productosvendidos}
					</h3>
				</div>
			</div>
		</div>
	)
}
