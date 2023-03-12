import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer : usersReducer} = createSlice({
    name : "users",
    initialState: [],
    reducers:{
        emptyUsers: (state, action)=>{
            return [];
        },
        setUsers: (state, action)=>{
            return action.payload;
        },
        updateUser: (state, action)=>{
            state[action.payload.index] = {
                ...state[action.payload.index],
                ...action.payload.user,
            };
        },
        addUser:(state, action)=>{
            state.push(action.payload);
        },
    }
});

export const { setUsers, updateUser, addUser } = actions;
export default usersReducer;