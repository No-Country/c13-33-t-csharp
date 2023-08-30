import './Layout.css'
import NavBar from '../../../components/NavBar/NavBar'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import DashboardResume from '../components/dashboardResume/DashboardResume'
import TopProductsContainer from '../components/topProductsContainer/TopProductsContainer'
import SalesChartsContainer from '../components/salesChartsContainer/SalesChartsContainer'
import TitleContainer from '../components/titleContainer/TitleContainer'

export default function Layout() {
	const date = new Date()

	const monthNames = monthNumber => {
		date.setMonth(monthNumber)
		return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date)
	}

	return (
		<div className="dashboard-layout">
			<NavBar className="navBar" page="summary" />
			<HeaderBar className="headerBar" />
			<TitleContainer monthNames={monthNames} />
			<DashboardResume />
			<TopProductsContainer />
			<SalesChartsContainer monthNames={monthNames} />
		</div>
	)
}
