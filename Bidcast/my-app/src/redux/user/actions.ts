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

            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/current`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            // console.log(user)

            dispatch(login(token))

            dispatch(loadToken(token))

            return
        } catch (e) {
            console.log(e)
        }
    }
}

export function refreshCurrentUser(userId:number){
    // console.log("userId", userId);
    // let dataId = {"userId":userId} 
    return async (dispatch: RootThunkDispatch)=>{
        const token = localStorage.getItem('token')
        if (token == null) {
            // console.log("no token")
            return;
        }
        try {
            const res:any = await axios(`${process.env.REACT_APP_BACKEND_URL}/user/refreshCurrent`,{
                method: "POST",
            headers:({'Content-Type': 'application/json'}),
            data: {userId:`${userId}`}
            })
            // console.log("refreshCurrentUser",res.data.token)
            dispatch(login(res.data.token))
            dispatch(loadToken(res.data.token))
            localStorage.setItem('token',res.data.token)
            
            

        } catch (error) {
            console.log("error", error);
            
        }
    }
}