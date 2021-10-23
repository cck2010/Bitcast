import { RootState, RootThunkDispatch } from "../../store";
import axios from 'axios';


export interface MyLiveProducts {
    id: number;
    live_title: string;
    live_image: string;
    starting_time: number;
    max_viewer?: number;
    is_ended?: boolean;
}

export function loadMyLiveProducts(
    myLiveProducts: MyLiveProducts[]
) {
    return {
        type: "@@myLiveProducts/LOAD_MY_LIVE_PRODUCTS" as const,
        myLiveProducts,
    }
}

export type LoadMyLiveProductsActions = ReturnType<typeof loadMyLiveProducts>;

export function fetchMyLiveProducts() {
    return async (dispatch: RootThunkDispatch, getState: ()=> RootState)=>{
        try {
 
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/profilePage/myLive`
            );
            const token = localStorage.getItem('token')

            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/current`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            
            console.log(user);
            

            const json = await res.json();  

            if(json) {
                dispatch(loadMyLiveProducts(json.data.results.rows))
            } else {
                dispatch(loadMyLiveProducts([]))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}