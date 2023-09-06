import { createSlice } from '@reduxjs/toolkit'
import allCategoriesService from '../services/categories'

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

export const initializeAllCategoriesData = token => {
	return async dispatch => {
		const response = await allCategoriesService.getData(token)
		dispatch(setAllCategoriesData(response))
	}
}

export default allCategoriesDataSlice.reducer
