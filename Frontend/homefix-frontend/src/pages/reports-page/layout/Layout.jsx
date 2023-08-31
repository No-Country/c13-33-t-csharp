import './Layout.css'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import NavBar from '../../../components/NavBar/NavBar'
import ReportsContainer from '../components/reportsContainer/ReportsContainer'

const Layout = () => {
	return (
		<div className="dashboard-layout">
			<HeaderBar />
			<NavBar page="reports" />
			<ReportsContainer />
		</div>
	)
}

export default Layout
