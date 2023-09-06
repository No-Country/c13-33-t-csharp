import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import messageReducer from './reducers/messageReducer'
import dashboardDataReducer from './reducers/dashboardDataReducer'
import salesChartDataReducer from './reducers/salesChartDataReducer'
import topSalesReducer from './reducers/topSalesReducer'
import monthSalesReducer from './reducers/monthSalesReducer'
import consultedMonthReducer from './reducers/consultedMonthReducer'
import allProductsDataReducer from './reducers/allProductsDataReducer';
import allBrandsDataReducer from './reducers/allBrandsDataReducer';
import allCategoriesReducer from './reducers/allCategoriesReducer';
import deleteProductReducer from './reducers/deleteProductReducer';
import updateProductReducer from './reducers/updateProductReducer';
import allUsersDataReducer from './reducers/allUsersDataReducer';
import createUserReducer from './reducers/createUserReducer'

const queryClient = new QueryClient()

const store = configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		message: messageReducer,
		dashboardData: dashboardDataReducer,
		allProductsData: allProductsDataReducer,
		allBrandsData: allBrandsDataReducer,
		allCategoriesData: allCategoriesReducer,
		salesChartData: salesChartDataReducer,
		topSales: topSalesReducer,
		monthSales: monthSalesReducer,
		consultedMonth: consultedMonthReducer,
		deleteProduct: deleteProductReducer,
		updateProduct: updateProductReducer,
		allUsersData: allUsersDataReducer,
		createUser: createUserReducer
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
