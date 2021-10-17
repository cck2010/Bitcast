import produce from "immer"
import { UserActions } from "./actions";

export interface UserState {
    isAuthenticate: boolean;
    userId: string | null;
    token: string | null;
}

const initialState: UserState = {
    isAuthenticate: false,
    userId: null,
    token: null
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