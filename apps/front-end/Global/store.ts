import { configureStore } from "@reduxjs/toolkit"
import { GlobalReducer } from "./GlobalSlice"
export const store = configureStore({
    reducer: {
        Global: GlobalReducer
    }
})