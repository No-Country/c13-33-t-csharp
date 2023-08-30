import './App.css'
import { useEffect, useState } from 'react'
import LoginForm from './pages/login-form/LoginForm'
import { Navigate, Route, Routes } from 'react-router-dom'
import PaswordReset from './pages/password-reset/PasswordReset'
import NewPassword from './pages/new-password/NewPassword'
import DashboardHomepage from './pages/dashboard-homepage/DashboardHomepage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setToken } from './reducers/tokenReducer'
import { setDashboardData } from './reducers/dashboardDataReducer'
import dashboardService from './services/dashboard'
import salesChartService from './services/salesChart'
import { setSalesChartData } from './reducers/salesChartDataReducer'

const App = () => {
	const [loading, setLoading] = useState(true)

	const user = useSelector(state => state.user)
	const token = useSelector(state => state.token)

	const dispatch = useDispatch()

	useEffect(() => {
		const JSONloggedUser = window.localStorage.getItem('loggedHomefixUser')
		if (JSONloggedUser) {
			const user = JSON.parse(JSONloggedUser)
			dispatch(setUser(user))
			dispatch(setToken(user.token))
		}
		setLoading(false)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		dashboardService.getData(token).then(data => {
			dispatch(setDashboardData(data))
		})
	}, [dispatch, token])

	useEffect(() => {
		salesChartService.getData(token).then(data => {
			dispatch(setSalesChartData(data))
		})
	}, [dispatch, token])

	if (loading) {
		return
	}

	return (
		<div className="App">
			<Routes>
				<Route path="/login-form" element={<LoginForm />}></Route>
				<Route path="/password-reset" element={<PaswordReset />}></Route>
				<Route path="/reset" element={<NewPassword />}></Route>
				<Route
					path="/"
					element={
						user === null ? (
							<Navigate replace to="/login-form" />
						) : (
							<DashboardHomepage />
						)
					}
				></Route>
			</Routes>
		</div>
	)
}

export default App
