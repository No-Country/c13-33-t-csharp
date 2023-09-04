import { createSlice } from '@reduxjs/toolkit'

const allCategoriesDataSlice = createSlice({
	name: 'allCategoriesData',
	initialState: [],
	reducers: {
		setAllCategoriesData(state, action) {
			return action.payload
		},
	},
})

export const { setAllCategoriesData } = allCategoriesDataSlice.actions
export default allCategoriesDataSlice.reducer