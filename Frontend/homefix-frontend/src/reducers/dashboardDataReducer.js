import { createSlice } from '@reduxjs/toolkit'

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
export default dashboardDataSlice.reducer
