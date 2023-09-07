import { createSlice } from '@reduxjs/toolkit'
import allProductsService from '../services/allProducts'

const allProductsDataSlice = createSlice({
	name: 'allProductsData',
	initialState: [],
	reducers: {
		setAllProductsData(state, action) {
			return action.payload
		},
		updateAllProductsData(state, action) {
			const productObject = action.payload
			const newState = state.map(product => {
				if (product.id === productObject.id) {
					return productObject
				} else {
					return product
				}
			})
			return newState
		},
	},
})

export const { setAllProductsData, updateAllProductsData } =
	allProductsDataSlice.actions

export const initializeAllProductsData = token => {
	return async dispatch => {
		const response = await allProductsService.getData(token)
		dispatch(setAllProductsData(response))
	}
}

export default allProductsDataSlice.reducer
