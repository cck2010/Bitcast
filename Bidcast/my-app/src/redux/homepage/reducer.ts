import { ComingAuction, ComingAuctionActions } from "./action";
import produce from "immer";

export interface ComingAuctionState {
    comingAuctions: ComingAuction[];
}

const initialState: ComingAuctionState = {
    comingAuctions: []
}

export function comingAuctionReducer(state: ComingAuctionState = initialState, action: ComingAuctionActions): ComingAuctionState {
    return produce(state, (newState) => {
        switch (action.type) {
            case "@@comingAuction/LOAD_COMING_AUCTION":
                newState.comingAuctions = action.comingAuctions;
                break;
        }
    })
}