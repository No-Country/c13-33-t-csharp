import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
	name: 'errorMessage',
	initialState: null,
	reducers: {
		setErrorMessage(state, action) {
			return action.payload
		},
	},
})

export const { setErrorMessage } = errorMessageSlice.actions
export default errorMessageSlice.reducer
