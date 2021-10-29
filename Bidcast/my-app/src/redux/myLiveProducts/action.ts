import { RootState, RootThunkDispatch } from "../../store";


export interface MyLive {
    id: number;
    user_id: number;
    title: string;
    image: string;
    starting_time: Date;
    seller_link: string;
    max_viewer?: number;
    is_ended?: boolean;
}

export interface MyLiveProducts {
    id: number;
    product_name: string;
    seller_id: number;
    min_price: number;
    buy_price: number;
    bid_increment: number;
    buyer_id: number;
    title: string;
    live_id: number;
}

export function loadMyLive(
    myLive: MyLive[]
) {
    return {
        type: "@@myLive/LOAD_MY_LIVE" as const,
        myLive,
    }
}

export function loadMyLiveProducts(
    myLiveProducts: MyLiveProducts[]
) {
    return {
        type: "@@myLive/LOAD_MY_LIVE_PRODUCTS" as const,
        myLiveProducts,
    }
}

export type LoadMyLiveActions = ReturnType<typeof loadMyLive>
    | ReturnType<typeof loadMyLiveProducts>

export function fetchMyLive() {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {

            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/profilePage/myLive`
            );

            const json = await res.json();

            if (json) {
                dispatch(loadMyLive(json.data.results.rows))
            } else {
                dispatch(loadMyLive([]))
            }
        } catch (error) {
            console.log(error);

        }
    }
}

export function fetchMyLiveProducts() {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {

            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/profile/myLiveProducts`
            );

            const json = await res.json();

            if (json) {
                dispatch(loadMyLiveProducts(json.data.results.rows))
            } else {
                dispatch(loadMyLiveProducts([]))
            }
        } catch (error) {
            console.log(error);
        }
    }
}