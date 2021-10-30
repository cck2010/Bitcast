import produce from "immer";
import { LoadMyLiveActions, MyLive, MyLiveProducts } from "./action";


export interface MyLiveState {
    myLive: MyLive[],
    myLiveProducts: MyLiveProducts[]
}

const initialState: MyLiveState = {
    myLive: [],
    myLiveProducts: []
}

export function myLiveReducer(
    state: MyLiveState = initialState,
    action: LoadMyLiveActions
): MyLiveState {
    return produce(state, (newState) => {
        switch (action.type) {
            case "@@myLive/LOAD_MY_LIVE":
                newState.myLive = action.myLive;
                break;
            case "@@myLive/LOAD_MY_LIVE_PRODUCTS":
                newState.myLiveProducts = action.myLiveProducts;
                break;
        }
    })
}