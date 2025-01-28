import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: 'socket',
    initialState: null,
    reducers: {
        add: (state, action) => {
            return action.payload
        }
    }
});

export const { add: addSocket } = socketSlice.actions;
export default socketSlice.reducer;