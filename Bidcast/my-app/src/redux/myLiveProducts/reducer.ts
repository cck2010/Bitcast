import produce from "immer";
import { LoadMyLiveProductsActions, MyLiveProducts } from "./action";


export interface MyLiveProductsState {
    myLiveProducts: MyLiveProducts[]
}

const initialState: MyLiveProductsState = {
    myLiveProducts: []
}

export function myLiveProductsReducer(
    state: MyLiveProductsState = initialState,
    action: LoadMyLiveProductsActions
): MyLiveProductsState {
    return produce(state, (newState) => {
        switch (action.type) {
            case "@@myLiveProducts/LOAD_MY_LIVE_PRODUCTS":
                newState.myLiveProducts = action.myLiveProducts;
                break;
        }
    })
}