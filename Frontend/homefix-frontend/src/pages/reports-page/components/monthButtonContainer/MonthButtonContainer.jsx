import './MonthButtonContainer.css'
import left_button from '../../../../assets/image/toLeft_button.svg'
import right_button from '../../../../assets/image/toRight_button.svg'
import { useEffect } from 'react'
import { useMonthNames } from '../../../../hooks/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { updateMonthSales } from '../../../../reducers/monthSalesReducer'
import { setConsultedMonth } from '../../../../reducers/consultedMonthReducer'

const MonthButtonContainer = () => {
	const consultedMonth = useSelector(state => state.consultedMonth)
	const token = useSelector(state => state.token)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateMonthSales(token, consultedMonth + 1))
		// eslint-disable-next-line
	}, [consultedMonth])

	const backClickHandler = () => {
		if (consultedMonth > 0) {
			dispatch(setConsultedMonth(consultedMonth - 1))
		}
	}

	const forwardClickHandler = () => {
		if (consultedMonth < 11) {
			dispatch(setConsultedMonth(consultedMonth + 1))
		}
	}

	const monthName = useMonthNames([consultedMonth])

	return (
		<div className="reports-month-button-container">
			<button onClick={backClickHandler} className="reports-month-button">
				<img src={left_button} alt="to the left button" />
			</button>
			<span className="reports-month-button-text">{monthName[0]}</span>
			<button onClick={forwardClickHandler} className="reports-month-button">
				<img src={right_button} alt="to the right button" />
			</button>
		</div>
	)
}

export default MonthButtonContainer
