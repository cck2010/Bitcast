import { RootThunkDispatch } from "../../store";
import axios from 'axios';

export function login(token: string) {
    return {
        type: '@@user/LOGIN' as const,
        token
    }
}

export function logout() {
    return {
        type: '@@user/LOGOUT' as const,
    }
}

export function loadToken(token: string) {
    return {
        type: '@Auth/load_token' as const,
        token,
    }
}

export type LoadToken = ReturnType<typeof loadToken>

export type UserActions = ReturnType<typeof login> | ReturnType<typeof logout>;

export function logoutThunk() {
    return (dispatch: RootThunkDispatch) => {
        localStorage.removeItem('token')
        dispatch(logout())
    }
}

export function checkCurrentUser() {
    return async (dispatch: RootThunkDispatch) => {
        const token = localStorage.getItem('token')

        if (token == null) {
            // console.log("no token")
            return;
        }

        try {

            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/current`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            // console.log("fetched")
            dispatch(login(token))

            return
        } catch (e) {
            console.log(e)
        }
    }
}