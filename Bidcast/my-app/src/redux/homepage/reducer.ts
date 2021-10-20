import { ComingAuction, ComingAuctionActions } from "./action";
import produce from "immer";

export interface ComingAuctionState {
    comingAuctions: {
        comingAuctionsArr: ComingAuction[];
        success: boolean;
    }
}

const initialState: ComingAuctionState = {
    comingAuctions: { comingAuctionsArr: [], success: true }
}

export function comingAuctionReducer(state: ComingAuctionState = initialState, action: ComingAuctionActions): ComingAuctionState {
    return produce(state, (state) => {
        switch (action.type) {
            case "@@comingAuction/LOAD_COMING_AUCTION":
                state.comingAuctions.comingAuctionsArr = action.comingAuctions;
                state.comingAuctions.success = action.success;
                break;
        }
    })
}