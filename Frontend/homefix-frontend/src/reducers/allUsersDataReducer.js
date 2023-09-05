import { createSlice } from '@reduxjs/toolkit'

const allUsersDataSlice = createSlice({
	name: 'allUsersData',
	initialState: {},
	reducers: {
		setDashboardData(state, action) {
			return action.payload
		},
	},
})

export const { setAllUsersData } = allUsersDataSlice.actions
export default allUsersDataSlice.reducer
