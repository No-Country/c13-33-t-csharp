import { createSlice } from '@reduxjs/toolkit'

const recoveryCodeSlice = createSlice({
	name: 'recoveryCode',
	initialState: null,
	reducers: {
		setRecoveryCode(state, action) {
			return action.payload
		},
	},
})

export const { setRecoveryCode } = recoveryCodeSlice.actions
export default recoveryCodeSlice.reducer
