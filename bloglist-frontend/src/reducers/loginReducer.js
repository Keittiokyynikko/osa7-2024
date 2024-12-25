import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        },
    }
})

export const {setUser, removeUser} = loginSlice.actions

export const userLogin = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        blogService.setToken(user.token);
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        dispatch(setUser(user))
        dispatch(
            setNotification({
              msg: `Logged in as ${user.name}`,
              time: 2,
              type: true,
            }),
          );
    }
}

export const userLogout = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedUser");
        window.localStorage.clear();
        dispatch(removeUser())
    }
}

export const setUserByLocal = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export default loginSlice.reducer