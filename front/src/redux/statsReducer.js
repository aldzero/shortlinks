import { createSlice } from '@reduxjs/toolkit'

export const linkSlice = createSlice({
    name: 'stats',
    initialState: {
        statistic: ""
    },
    reducers: {
        setStatistic: (state, action) => {
            state.statistic = action.payload
        },
    },
})
export const {setStatistic} = linkSlice.actions
export default linkSlice.reducer