import produce from "immer"
import { UserActions, AuthActions } from "./actions";
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";


export interface UserState {
    isAuthenticate: boolean;
    // userId: string | null;
    token: string | null;
}

const initialState: UserState = {
    isAuthenticate: false,
    // userId: null,
    token: null
}

const loadTokenInitalState: AuthState = {
    user: {},
    error: ""
}

export type AuthState = {
    user?: JwtPayload | string
    error?: string
}

export type JWTPayload = {
    id?: number;
    username?: string;
    email?: string;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
    profile_pic?: string;
    status_id?: number;
    phone_number?: number;
    telegram_acct?: string;
    telegram_is_verified?: boolean;
    telegram_chat_id?: number;
    login_method_id?: number;
}

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    return produce(state, state => {
        if (action.type === '@@user/LOGIN') {
            state.token = action.token;
            state.isAuthenticate = true;
        } else if (action.type === '@@user/LOGOUT') {
            state.token = null;
            state.isAuthenticate = false
        }
    });
}

export let authReducer = (
    state: AuthState = loadTokenInitalState,
    action: AuthActions,
): AuthState => {
    switch (action.type) {
        case '@@Auth/load_token': {
            try {
                const verifyOptions: VerifyOptions = {
                    maxAge: "12h",
                    algorithms: ["RS512"]
                }

                let key = process.env.REACT_APP_PUBLIC_KEY!.replace(/\\n/g, '\n')
                let payload: string | JwtPayload | any = jwt.verify(action.token, key, verifyOptions)
                // console.log('payload= ', payload)
                const user: JWTPayload = {
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
                return {
                    user,
                    error: undefined
                }
            } catch (error) {
                return {
                    error: 'invalid JWT Token',
                    user: undefined,
                }
            }
        }

        default:
            return state
    }
}