import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import messageReducer from './reducers/messageReducer'
import monthSalesReducer from './reducers/monthSalesReducer'
import consultedMonthReducer from './reducers/consultedMonthReducer'
import allProductsDataReducer from './reducers/allProductsDataReducer'
import allBrandsDataReducer from './reducers/allBrandsDataReducer'
import allCategoriesReducer from './reducers/allCategoriesReducer'
import deleteProductReducer from './reducers/deleteProductReducer'
import updateProductReducer from './reducers/updateProductReducer'
import createSaleReducer from './reducers/createSaleReducer'

const store = configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		message: messageReducer,
		allProductsData: allProductsDataReducer,
		allBrandsData: allBrandsDataReducer,
		allCategoriesData: allCategoriesReducer,
		monthSales: monthSalesReducer,
		consultedMonth: consultedMonthReducer,
		deleteProduct: deleteProductReducer,
		updateProduct: updateProductReducer,
		createSale: createSaleReducer
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
