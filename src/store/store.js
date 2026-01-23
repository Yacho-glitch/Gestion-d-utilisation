import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./usersSlice"

//create the store
export const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})
