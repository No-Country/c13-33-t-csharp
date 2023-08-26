import './Layout.css'
import NavBar from '../../../components/NavBar/NavBar'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import DashboardResume from '../components/dashboardResume/DashboardResume'
import TopProductsContainer from '../components/topProductsContainer/TopProductsContainer'
import SalesChartsContainer from '../components/salesChartsContainer/SalesChartsContainer'
import TitleContainer from '../components/titleContainer/TitleContainer'

export default function Layout() {
	return (
		<div className="dashboard-layout">
			<HeaderBar />
			<NavBar page="resume" />
			<TitleContainer />
			<DashboardResume />
			<TopProductsContainer />
			<SalesChartsContainer />
		</div>
	)
}
