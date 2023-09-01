import './MonthButtonContainer.css'
import left_button from '../../../../assets/image/toLeft_button.svg'
import right_button from '../../../../assets/image/toRight_button.svg'

const MonthButtonContainer = () => {
	return (
		<div className="reports-month-button-container">
			<button className="reports-month-button">
				<img src={left_button} alt="to the left button" />
			</button>
			<span className="reports-month-button-text">Mes</span>
			<button className="reports-month-button">
				<img src={right_button} alt="to the right button" />
			</button>
		</div>
	)
}

export default MonthButtonContainer
