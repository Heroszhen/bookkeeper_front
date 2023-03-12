import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer : commonReducer} = createSlice({
    name : "common",
    initialState: {
        loader:false
    },
    reducers:{
        setLoader: (state, action)=>{
            return {
                ...state,
                loader: action.payload
            }
        },
    }
});

export const { setLoader } = actions;
export default commonReducer;