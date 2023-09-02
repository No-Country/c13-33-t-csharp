import DataBox from '../DataBox/DataBox'
import './OverviewContainer.css'

const OverviewContainer = () => {
	return (
		<div className="reports-overview-container">
			<h3 className="reports-overview-title">Visión general</h3>
			<hr />
			<div className="reports-overview-dataBox-container">
				<DataBox
					title={'Total de ventas'}
					number={'4.450.910'}
					numberFormat={'$'}
				/>
				<DataBox
					title={'Total de costos'}
					number={'3.545.878'}
					numberFormat={'$'}
				/>
				<DataBox title={'ROS'} number={'20.33'} numberFormat={'%'} />
				<DataBox title={'Productos vendidos'} number={'72'} numberFormat={''} />
			</div>
		</div>
	)
}

export default OverviewContainer
