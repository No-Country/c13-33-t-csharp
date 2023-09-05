import { createSlice } from '@reduxjs/toolkit'

const allBrandsDataSlice = createSlice({
	name: 'allBrandsData',
	initialState: [],
	reducers: {
		setAllBrandsData(state, action) {
			return action.payload
		},
	},
})

export const { setAllBrandsData } = allBrandsDataSlice.actions
export default allBrandsDataSlice.reducer