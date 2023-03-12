import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer : meReducer} = createSlice({
    name : "me",
    initialState: null,
    reducers:{
        emptyMe: (state, action)=>{
            return null;
        },
        setMe: (state, action)=>{
            return action.payload;
        }
    }
});

export const { emptyMe, setMe } = actions;
export default meReducer;