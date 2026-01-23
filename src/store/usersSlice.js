import { createSlice } from "@reduxjs/toolkit"

//intiale value
const initialState = {
  list: JSON.parse(localStorage.getItem('users')) || [],//if localStorage empty put a empty array
}

//craete users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //add a new user
    addUser: (state, action) => {
      //push the infos of user
      state.list.push(action.payload)
      localStorage.setItem("users", JSON.stringify(state.list))//and update the localStorage
    },

    //delete user
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload)//get all users unless the one we want to delete
      localStorage.setItem('users', JSON.stringify(state.list))//and update the localStorage
    },

    //update user
    updateUser: (state, action) => {
      //get the index of user from state by id
      const index = state.list.findIndex(
        u => u.id === action.payload.id
      )

      //check if user exist 
      if (index !== -1) {
        //update user data
        state.list[index] = action.payload
        localStorage.setItem("users", JSON.stringify(state.list))//and update the localStorage

      }
    }

  }
})

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer
