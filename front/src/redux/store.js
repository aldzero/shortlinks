import { configureStore } from '@reduxjs/toolkit'
import linkReducer from "./linkReducer";
import statsReducer from "./statsReducer";
import errorReducer from "./errorReducer";
import imageReducer from "./imageReducer";

export default configureStore({
    reducer: {
        link: linkReducer,
        stats: statsReducer,
        error: errorReducer,
        image: imageReducer,
    },
})