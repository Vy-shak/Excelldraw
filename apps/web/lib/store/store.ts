import { configureStore } from "@reduxjs/toolkit";
import toolreducer from "./draw/toolSlice"
import socketReducer from "./socket/socketSlice"
import { toolSwitch } from "./draw/toolSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            tool: toolreducer,
            socket: socketReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']