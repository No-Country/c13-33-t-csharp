import { createSlice } from '@reduxjs/toolkit'

const createProductSlice = createSlice({
	name: 'createProduct',
	initialState: null,
	reducers: {
		setCreateProduct(state, action) {
			return action.payload
		},
	},
})

export const { setCreateProduct } = createProductSlice.actions
export default createProductSlice.reducer
