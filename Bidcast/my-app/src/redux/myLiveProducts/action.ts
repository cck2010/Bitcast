import { RootState, RootThunkDispatch } from "../../store";


export interface MyLiveProducts {
    id: number;
    user_id: number;
    title: string;
    image: string;
    starting_time: Date;
    seller_link: string;
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
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {

            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/profilePage/myLive`
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