import { createSlice } from '@reduxjs/toolkit'
import allBrandsService from '../services/brands'

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

export const initializeAllBrandsData = token => {
	return async dispatch => {
		const response = await allBrandsService.getData(token)
		dispatch(setAllBrandsData(response))
	}
}

export default allBrandsDataSlice.reducer
