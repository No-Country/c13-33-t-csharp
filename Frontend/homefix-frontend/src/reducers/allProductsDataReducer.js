import { createSlice } from '@reduxjs/toolkit'

const allProductsDataSlice = createSlice({
	name: 'allProductsData',
	initialState: [],
	reducers: {
		setAllProductsData(state, action) {
			return action.payload
		},
	},
})

export const { setAllProductsData } = allProductsDataSlice.actions
export default allProductsDataSlice.reducer