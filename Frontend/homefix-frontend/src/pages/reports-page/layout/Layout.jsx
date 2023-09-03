import './Layout.css'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import NavBar from '../../../components/NavBar/NavBar'
import TitleContainer from '../components/titleContainer/TitleContainer'
import MonthButtonContainer from '../components/monthButtonContainer/MonthButtonContainer'
import DescriptionContainer from '../components/descriptionContainer/DescriptionContainer'
import OverviewContainer from '../components/overviewContainer/OverviewContainer'
import SalesContainer from '../components/salesContainer/SalesContainer'
import SoldProductsContainer from '../components/soldProductsContainer/SoldProductsContainer'

const Layout = () => {
	return (
		<div className="reports-layout">
			<HeaderBar />
			<NavBar page="reports" />
			<TitleContainer />
			<MonthButtonContainer />
			<DescriptionContainer />
			<OverviewContainer />
			<SalesContainer />
			<SoldProductsContainer />
		</div>
	)
}

export default Layout
