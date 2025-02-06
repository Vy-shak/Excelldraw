import { createSlice } from "@reduxjs/toolkit";

interface chats {
    type: "chat",
    message: string,
    userName: string,
    url: string
}

const initialState: chats[] = [];


const messageSlice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        add(state, action) {
            return action.payload
        }
    }
});

export const { add: addMessages } = messageSlice.actions;
export default messageSlice.reducer