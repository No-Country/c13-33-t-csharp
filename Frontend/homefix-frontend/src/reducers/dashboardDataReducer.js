import { createSlice } from '@reduxjs/toolkit'
import dashboardService from '../services/dashboard'

const dashboardDataSlice = createSlice({
	name: 'dashboardData',
	initialState: {},
	reducers: {
		setDashboardData(state, action) {
			return action.payload
		},
	},
})

export const { setDashboardData } = dashboardDataSlice.actions

export const loadDashboardData = token => {
	return async dispatch => {
		const response = await dashboardService.getData(token)
		dispatch(setDashboardData(response))
	}
}

export default dashboardDataSlice.reducer
