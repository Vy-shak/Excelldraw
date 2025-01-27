import { configureStore } from "@reduxjs/toolkit";
import toolreducer from "./draw/toolSlice"
import { toolSwitch } from "./draw/toolSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            tool: toolreducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']