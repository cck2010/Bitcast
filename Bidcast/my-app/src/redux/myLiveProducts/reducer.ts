import produce from "immer";
import { LoadMyLiveActions, MyLive, MyLiveProducts } from "./action";


export interface MyLiveState {
    myLive: MyLive[],
    myLiveProducts: MyLiveProducts[],
    liveId: MyLive[]
}

const initialState: MyLiveState = {
    myLive: [],
    myLiveProducts: [],
    liveId: []
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
            case "@@myLive/LOAD_LIVE_STATUS":
                newState.liveId = action.liveId;
                for (let ind in newState.myLive) {
                    if (newState.myLive[ind].id === action.liveId[0].id) {

                        newState.myLive[ind].is_ended = true
                    }
                }
                break;
        }
    })
}