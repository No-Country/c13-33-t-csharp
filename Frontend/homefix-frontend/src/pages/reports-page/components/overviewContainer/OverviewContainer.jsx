import DataBox from '../DataBox/DataBox'
import './OverviewContainer.css'
import questIcon from '../../../../assets/image/quest-icon.svg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const OverviewContainer = () => {
	const monthSales = useSelector(state => state.monthSales)
	const [totalSales, setTotalSales] = useState()
	const [soldProducts, setSoldProducts] = useState()

	useEffect(() => {
		setTotalSales(() => {
			return monthSales.reduce((acc, current) => acc + current.total, 0)
		})
		setSoldProducts(() => {
			return monthSales.reduce((acc, current) => acc + current.cantidad, 0)
		})
	}, [monthSales])

	return (
		<div className="reports-overview-container">
			<h3 className="reports-overview-title">Visión general</h3>
			<hr />
			<div className="reports-overview-dataBox-container">
				<DataBox
					title={'Total de ventas'}
					number={Math.round(totalSales)}
					numberFormat={'$'}
				/>
				<DataBox
					title={'Total de costos'}
					number={Math.round(totalSales / 1.2)}
					numberFormat={'$'}
				/>
				<DataBox
					title={'ROS'}
					number={'20'}
					numberFormat={'%'}
					icon={questIcon}
				/>
				<DataBox
					title={'Productos vendidos'}
					number={soldProducts}
					numberFormat={''}
				/>
			</div>
		</div>
	)
}

export default OverviewContainer
