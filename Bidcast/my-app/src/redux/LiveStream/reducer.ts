import {
    LiveStreamActions,
    LiveStreamInfo,
    LiveStreamProduct,
} from "./actions";
import produce from "immer";

export interface LiveStreamState {
    liveStreamInfo: LiveStreamInfo;
    liveStreamProducts: {
        liveStreamProductsArr: LiveStreamProduct[];
        success: boolean;
    };
}

const initialState: LiveStreamState = {
    liveStreamInfo: {
        id: 0,
        title: "Loading...",
        seller: "Loading...",
        sellerImage: "/defaultUser.png",
        currentViewers: 0,
        thumbnail: "",
        description: "description",
        success: true,
    },
    liveStreamProducts: { liveStreamProductsArr: [], success: true },
};

export function liveStreamReducer(
    state: LiveStreamState = initialState,
    action: LiveStreamActions
): LiveStreamState {
    return produce(state, (state) => {
        switch (action.type) {
            case "@@liveStream/LOAD_LIVE_STREAM_INFO":
                state.liveStreamInfo = action.liveStreamInfo;
                break;
            case "@@liveStream/LOAD_LIVE_STREAM_PRODUCTS":
                state.liveStreamProducts.liveStreamProductsArr =
                    action.liveStreamProducts;
                state.liveStreamProducts.success = action.success;
                break;
        }
    });
}
