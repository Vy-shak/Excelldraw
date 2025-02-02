import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];


const messageSlice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        }
    }
});

export const { add: addMessages } = messageSlice.actions;
export default messageSlice.reducer