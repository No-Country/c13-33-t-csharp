import { useSelector } from 'react-redux'
import './DescriptionContainer.css'
import { useMonthNames } from '../../../../hooks/hooks'

const DescriptionContainer = () => {
	const consultedMonth = useSelector(state => state.consultedMonth)

	const monthName = useMonthNames([consultedMonth])

	return (
		<div className="reports-description-container">
			<h3 className="reports-description-text reports-description-title">
				Informe {monthName}, 2023
			</h3>
			<hr />
			<p className="reports-description-text">
				Este informe detalla las ventas realizadas durante{' '}
				<span>{monthName}</span>, los productos más vendidos y sus precios. Los
				análisis revelan tendencias y preferencias de los clientes,
				fundamentales para que tomes decisiones estratégicas.
			</p>
		</div>
	)
}

export default DescriptionContainer
