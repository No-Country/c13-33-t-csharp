import { createSlice } from '@reduxjs/toolkit'
import salesChartService from '../services/salesChart'

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

export const loadSalesChartData = token => {
	return async dispatch => {
		const response = await salesChartService.getData(token)
		dispatch(setSalesChartData(response))
	}
}

export default salesChartDataSlice.reducer
