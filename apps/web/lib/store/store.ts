import { configureStore } from "@reduxjs/toolkit";
import toolreducer from "./draw/toolSlice"
import userReducer from "./user/userdataSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            tool: toolreducer,
            userData: userReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']