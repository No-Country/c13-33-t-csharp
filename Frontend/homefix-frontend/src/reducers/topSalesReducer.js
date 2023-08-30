import { createSlice } from '@reduxjs/toolkit'

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
export default topSalesSlice.reducer
