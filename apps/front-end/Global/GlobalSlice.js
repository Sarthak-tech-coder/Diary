import { createSlice } from "@reduxjs/toolkit";

const initial_State = {
    mode: "dark",
    isAuth: false,
    user: {
        Diaries: [],
    },
    active: "",
    Loading: false
}

const GlobalSlice = createSlice({
    name: "Global",
    initialState: initial_State,
    reducers: {
        ToggleMode: (state) => {
            if (state.mode === "dark") {
                state.mode = "light"
            } else {
                state.mode = "dark"
            }
        },
        ChangeAuthStatus: (state) => {
            state.isAuth = !state.isAuth
        },
        changeActive: (state, action) => {
            state.active = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.Loading = action.payload
        }
    }
})
export const selectMode = (state) => {
    return state.Global.mode
}
export const selectActive = (state) => {
    return state.Global.active
}
export const selectAuth = (state) => {
    return state.Global.isAuth
}
export const selectUser = (state) => {
    return state.Global.user
}
export const selectDiaries = (state) => {
    return state.Global.user.Diaries
}
export const selectDiarie = (id) => (state) => {
    return state.Global.user.Diaries.filter(d => d._id === id)
}
export const selectLoading = (state) => {
    return state.Global.Loading
}
export const GlobalReducer = GlobalSlice.reducer
export const { ToggleMode, ChangeAuthStatus, changeActive, setUser, setLoading } = GlobalSlice.actions