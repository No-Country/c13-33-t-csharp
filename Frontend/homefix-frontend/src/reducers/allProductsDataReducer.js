import { createSlice } from '@reduxjs/toolkit'
import allProductsService from '../services/allProducts'

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

export const initializeAllProductsData = token => {
	return async dispatch => {
		const response = await allProductsService.getData(token)
		dispatch(setAllProductsData(response))
	}
}

export default allProductsDataSlice.reducer
