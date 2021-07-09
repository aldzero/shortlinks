import { createSlice } from '@reduxjs/toolkit'

export const linkSlice = createSlice({
    name: 'error',
    initialState: {
        error: ""
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
    },
})
export const {setError} = linkSlice.actions
export default linkSlice.reducer