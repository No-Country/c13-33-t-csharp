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
import Inventory from './pages/inventory/Inventory'
import AddProduct from './pages/addProduct/AddProduct'
import Reports from './pages/reports-page/Reports'
import allProductsService from './services/allProducts'
import { setAllProductsData } from './reducers/allProductsDataReducer'
import allBrandsService from './services/brands'
import { setAllBrandsData } from './reducers/allBrandsDataReducer'
import allCategoriesService from './services/categories'
import { setAllCategoriesData } from './reducers/allCategoriesReducer'

const App = () => {
	const [loading, setLoading] = useState(true)

	const token = useSelector(state => state.token)
	const user = useSelector(state => state.user)

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
		allProductsService.getData(token).then(data => {
			dispatch(setAllProductsData(data))
		})
	}, [dispatch, token])

	useEffect(() => {
		allBrandsService.getData(token).then(data => {
			dispatch(setAllBrandsData(data))
		})
	}, [dispatch, token])

	useEffect(() => {
		allCategoriesService.getData(token).then(data => {
			dispatch(setAllCategoriesData(data))
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
				<Route
					path="/inventory"
					element={
						user === null ? (
							<Navigate replace to="/login-form" />
						) : (
							<Inventory />
						)
					}
				></Route>
				<Route path="/add-product" element={<AddProduct />}></Route>
				<Route
					path="/reports"
					element={
						user === null ? <Navigate replace to="/login-form" /> : <Reports />
					}
				/>
			</Routes>
		</div>
	)
}

export default App
