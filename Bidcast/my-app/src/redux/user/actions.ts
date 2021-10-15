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
            return;
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/current`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            dispatch(login(token))
        } catch (e) {

        }
    }
}