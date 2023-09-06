import { createSlice } from '@reduxjs/toolkit'
import topSalesService from '../services/topSales'

const topSalesSlice = createSlice({
	name: 'topSales',
	initialState: [],
	reducers: {
		setTopSales(state, action) {
			return action.payload
		},
	},
})

export const { setTopSales } = topSalesSlice.actions

export const loadTopSales = token => {
	return async dispatch => {
		const response = await topSalesService.getData(token)
		dispatch(setTopSales(response))
	}
}

export default topSalesSlice.reducer
