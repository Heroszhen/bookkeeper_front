import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../services/UtilService";

export const fetchGetAccountsByType = createAsyncThunk('accounts/getAccountsByType', async (type, dispatch)=>{
    let response = await fetchGet(`accounts/type/${type}`,dispatch);
    if(response["status"] === 1)return response["data"].reverse();
    return [];
});

export const fetchEditAccount = createAsyncThunk('accounts/editAccount', async (model, dispatch)=>{
    let response = await fetchPost(`accounts/account`, model, dispatch);
    if(response["status"] === 1){
        return {
            action: (model._id === '')?1:2,
            account: response["data"]
        }
    }
});

export const fetchDeleteAccount = createAsyncThunk('accounts/DeleteAccount', async (id, dispatch)=>{
    let response = await fetchGet(`accounts/account/${id}`,dispatch);
    if(response["status"] === 1)return {id:id}
});

const {actions, reducer : accountsReducer} = createSlice({
    name : "accounts",
    initialState: [],
    extraReducers: (builder) => {
        builder
        .addCase(fetchGetAccountsByType.fulfilled , (state, { payload }) => {
            return payload;
        })
        .addCase(fetchEditAccount.fulfilled , (state, { payload }) => {
            if(payload.action === 1)return [payload.account, ...state];
            else{
                return state.map((item, index) => {
                    if (item._id !== payload.account._id)return item;
                    //https://redux.js.org/usage/structuring-reducers/immutable-update-patterns
                    return payload.account;
                })
            }
        })
        .addCase(fetchDeleteAccount.fulfilled , (state, { payload }) => {
            return state.filter(item => item._id !== payload.id);
        })
    }
});

export const { setAccounts } = actions;
export default accountsReducer;