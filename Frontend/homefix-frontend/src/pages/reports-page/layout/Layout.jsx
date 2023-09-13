import './Layout.css'
import HeaderBar from '../../../components/HeaderBar/HeaderBar'
import NavBar from '../../../components/NavBar/NavBar'
import TitleContainer from '../components/titleContainer/TitleContainer'
import MonthButtonContainer from '../components/monthButtonContainer/MonthButtonContainer'
import DescriptionContainer from '../components/descriptionContainer/DescriptionContainer'
import OverviewContainer from '../components/overviewContainer/OverviewContainer'
import SalesContainer from '../components/salesContainer/SalesContainer'
import SoldProductsContainer from '../components/soldProductsContainer/SoldProductsContainer'
import BestSellingContainer from '../components/bestSellingContainer/BestSellingContainer'
import CostsContainer from '../components/costsContainer/CostsContainer'

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
			<BestSellingContainer />
			<CostsContainer />
		</div>
	)
}

export default Layout
