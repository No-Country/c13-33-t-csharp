import './Layout.css'
import NavBar from '../../../components/NavBar/NavBar'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import DashboardResume from '../components/dashboardResume/DashboardResume'
import TopProductsContainer from '../components/topProductsContainer/TopProductsContainer'
import SalesChartsContainer from '../components/salesChartsContainer/SalesChartsContainer'
import TitleContainer from '../components/titleContainer/TitleContainer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMonthSales } from '../../../reducers/monthSalesReducer'

export default function Layout() {
	const token = useSelector(state => state.token)
	const date = new Date()
	const currentMonth = date.getMonth() + 1

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateMonthSales(token, currentMonth))
		// eslint-disable-next-line
	}, [])

	return (
		<div className="dashboard-layout">
			<NavBar page="summary" />
			<HeaderBar />
			<TitleContainer />
			<DashboardResume />
			<TopProductsContainer />
			<SalesChartsContainer />
		</div>
	)
}
