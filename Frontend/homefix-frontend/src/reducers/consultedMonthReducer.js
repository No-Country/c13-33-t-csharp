import { createSlice } from '@reduxjs/toolkit'

const consultedMonthSlice = createSlice({
	name: 'consultedMonth',
	initialState: new Date().getMonth(),
	reducers: {
		setConsultedMonth(state, action) {
			return action.payload
		},
	},
})

export const { setConsultedMonth } = consultedMonthSlice.actions
export default consultedMonthSlice.reducer
