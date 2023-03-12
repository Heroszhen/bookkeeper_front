import { configureStore } from "@reduxjs/toolkit";

//reducers
import meReducer from "./me.slice";
import commonReducer from "./common.slice";
import usersReducer from "./users.slice";
import accountsReducer from "./accounts.slice";

const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        me: meReducer,
        common: commonReducer,
        users: usersReducer,
        accounts: accountsReducer
    }
});
export default store;