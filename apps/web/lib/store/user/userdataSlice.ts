import { createSlice } from "@reduxjs/toolkit";;


const userSlice = createSlice({
    name: "userData",
    initialState: null,
    reducers: {
        add(state, action) {
            return action.payload
        }
    }
});


export const { add: addUserdata } = userSlice.actions;
export default userSlice.reducer