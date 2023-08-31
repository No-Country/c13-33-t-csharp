import { createSlice } from '@reduxjs/toolkit'

const salesChartDataSlice = createSlice({
	name: 'salesChartData',
	initialState: [],
	reducers: {
		setSalesChartData(state, action) {
			return action.payload
		},
	},
})

export const { setSalesChartData } = salesChartDataSlice.actions
export default salesChartDataSlice.reducer
