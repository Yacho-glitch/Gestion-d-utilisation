import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: JSON.parse(localStorage.getItem('users')) || [],
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.list.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state.list))
        },
        deleteUser: (state, action) => {
            state.list = state.list.filter(u => u.id !== action.payload)
            localStorage.setItem('users', JSON.stringify(state.list))
        },
        updateUser: (state, action) => {
            const index = state.list.findIndex(
                u => u.id === action.payload.id
            )

            if (index !== -1) {
                state.list[index] = action.payload
                localStorage.setItem("users", JSON.stringify(state.list))
            }
            // state.list[index] = action.payload
            // localStorage.setItem('users', JSON.stringify(state.list))
            // const index = state.list.findIndex(u => u.id === action.payload.id)
        },
    }
})

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer