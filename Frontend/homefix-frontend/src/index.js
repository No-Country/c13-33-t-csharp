import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import messageReducer from './reducers/messageReducer'
import dashboardDataReducer from './reducers/dashboardDataReducer'
<<<<<<< HEAD
import allProductsDataReducer from './reducers/allProductsDataReducer';
import allBrandsDataReducer from './reducers/allBrandsDataReducer';
import allCategoriesReducer from './reducers/allCategoriesReducer';
=======
import salesChartDataReducer from './reducers/salesChartDataReducer'
import topSalesReducer from './reducers/topSalesReducer'
>>>>>>> remotes/origin/dev

const queryClient = new QueryClient()

const store = configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		message: messageReducer,
		dashboardData: dashboardDataReducer,
<<<<<<< HEAD
		allProductsData: allProductsDataReducer,
		allBrandsData: allBrandsDataReducer,
		allCategoriesDate: allCategoriesReducer
=======
		salesChartData: salesChartDataReducer,
		topSales: topSalesReducer,
>>>>>>> remotes/origin/dev
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
