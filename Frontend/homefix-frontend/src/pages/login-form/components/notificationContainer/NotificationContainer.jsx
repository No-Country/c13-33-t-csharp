import './NotificationContainer.css'
import { useSelector } from 'react-redux'

const Notification = () => {
	const errorMessage = useSelector(state => state.errorMessage)

	if (errorMessage === null) {
		return null
	}

	return (
		<div className="login_errorMessageContainer" id="errorMessage">
			<div className="login_errorMessagePosition">
				<p>{errorMessage}</p>
			</div>
		</div>
	)
}

export default Notification
