import { RootState, RootThunkDispatch } from "../../store";
import axios from 'axios';

import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import { useAlert } from 'react-alert'
import { push } from "connected-react-router";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useSelector } from "react-redux";

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
        type: '@@Auth/load_token' as const,
        token,
    }
}



export type AuthActions = ReturnType<typeof loadToken>

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
            console.log("no token")
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

            dispatch(loadToken(token))

            return
        } catch (e) {
            console.log(e)
        }
    }
}
export function CheckUserPhoneNumber() {
    // const user = useSelector((state: RootState) => state.authState.user);
    return async (dispatch: RootThunkDispatch) => {
        try {
            const token = localStorage.getItem('token')
            console.log('token=', token)
            if (token == null) {
                // console.log("no token")
                return;
            }
            const verifyOptions: VerifyOptions = {
                maxAge: "12h",
                algorithms: ["RS512"]
            }

            let key = process.env.REACT_APP_PUBLIC_KEY!.replace(/\\n/g, '\n')
            let payload: string | JwtPayload | any = jwt.verify(token, key, verifyOptions)
            console.log('payload= ', payload)
            const user: JwtPayload = {
                id: payload.id,
                username: payload.username,
                email: payload.email,
                created_at: payload.created_at,
                login_method_id: payload.login_method_id,
                phone_number: payload.phone_number,
                profile_pic: payload.profile_pic,
                role_id: payload.role_id,
                status_id: payload.status_id,
                telegram_acct: payload.telegram_acct,
                telegram_chat_id: payload.telegram_acct,
                telegram_is_verified: payload.telegram_is_verified,
                updated_at: payload.updated_at
            }
            // console.log(JSON.stringify(user))
            if (!user) {
                return {
                    error: 'checkUserPhoneNumber failed to verify'
                }
            }

            // if (user.phone_number === '11111111') {
            //     console.log('sdf')

            //     return false
            // } else {
            //     return true
            // }
        } catch (e) {
            console.log(e)
                ;

        }
    }

}
export const Toasts = () => {
    const { addToast } = useToasts();

    // alert(`請到個人頁面更改電話號碼`)


    addToast("請到個人頁面更改電話號碼", { appearance: "error" });

    ;
}