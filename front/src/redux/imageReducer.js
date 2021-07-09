import { createSlice } from '@reduxjs/toolkit'

export const linkSlice = createSlice({
    name: 'image',
    initialState: {
        path: ""
    },
    reducers: {
        setImage: (state, action) => {
            state.path = action.payload
        },
    },
})
export const {setImage} = linkSlice.actions
export default linkSlice.reducer