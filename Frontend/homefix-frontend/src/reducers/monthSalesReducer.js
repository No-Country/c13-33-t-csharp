import { createSlice } from '@reduxjs/toolkit'
import salesService from '../services/sales'

const monthSalesSlice = createSlice({
	name: 'monthSales',
	initialState: [],
	reducers: {
		setMonthSales(state, action) {
			return action.payload
		},
	},
})

export const { setMonthSales } = monthSalesSlice.actions

export const updateMonthSales = (token, id) => {
	return async dispatch => {
		const monthSales = await salesService.getMonthSales(token, id)
		dispatch(setMonthSales(monthSales))
	}
}

export default monthSalesSlice.reducer
