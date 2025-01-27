import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const toolSlice = createSlice({
    name: 'tool',
    initialState: 'rect',
    reducers: {
        switch: (state, action) => {
            return action.payload
        }
    }
});

export const { switch: toolSwitch } = toolSlice.actions;
export default toolSlice.reducer;
