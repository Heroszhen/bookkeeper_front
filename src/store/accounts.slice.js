import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet } from "../services/UtilService";

export const fetchGetAccountsByType = createAsyncThunk('accounts/getAccountsByType', async (type, dispatch)=>{
    let response = await fetchGet(`accounts/type/${type}`,dispatch);
    if(response["status"] === 1)return response["data"];
    return [];
});

const {actions, reducer : accountsReducer} = createSlice({
    name : "accounts",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchGetAccountsByType.fulfilled , (state, { payload }) => {
            return payload;
        })
    }
});

export const { setAccounts } = actions;
export default accountsReducer;