import { createSlice } from '@reduxjs/toolkit'

export const linkSlice = createSlice({
    name: 'link',
    initialState: {
        shortLink: "",
        statsLink: "",
        inputLink: "",
        lifetime : null,
        custom: "",
        commercial: false,
        ads: ""
    },
    reducers: {
        setShortLink: (state, action) => {
            state.shortLink = "http://localhost:3000/" + action.payload
            state.statsLink = "http://localhost:3000/stats/" + action.payload
        },
        setInputLink:(state, action) => {
            state.inputLink = action.payload
        },
        setLifetime:(state, action) => {
            state.lifetime = action.payload
        },
        setCustomName:(state, action) => {
            state.custom = action.payload
        },
        isCommercial:(state, action) => {
            state.commercial = !state.commercial
        },
        setAds:(state, action) => {
            state.ads = action.payload;
        }
    },
})
export const { setShortLink , setInputLink, setLifetime, setCustomName, isCommercial, setAds} = linkSlice.actions
export default linkSlice.reducer