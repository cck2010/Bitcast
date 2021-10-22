import {
    LiveStreamActions,
    LiveStreamInfo,
    LiveStreamProduct,
    LiveStreamProductDynamicInfo,
} from "./actions";
import produce from "immer";

export interface LiveStreamState {
    liveStreamInfo: LiveStreamInfo;
    liveStreamProducts: {
        liveStreamProductsArr: LiveStreamProduct[];
        liveStreamProductsArrDynamic: LiveStreamProductDynamicInfo[];
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
    liveStreamProducts: {
        liveStreamProductsArr: [],
        liveStreamProductsArrDynamic: [],
        success: true,
    },
};

export function liveStreamReducer(
    state: LiveStreamState = initialState,
    action: LiveStreamActions
): LiveStreamState {
    return produce(state, (newState) => {
        switch (action.type) {
            case "@@liveStream/LOAD_LIVE_STREAM_INFO":
                newState.liveStreamInfo = action.liveStreamInfo;
                break;
            case "@@liveStream/LOAD_LIVE_STREAM_PRODUCTS":
                newState.liveStreamProducts.liveStreamProductsArr =
                    action.liveStreamProducts.sort((a, b) => b.id - a.id);
                newState.liveStreamProducts.success = action.success;
                break;
            case "@@liveStream/LOAD_LIVE_STREAM_PRODUCTS_DYNAMIC_INFO":
                newState.liveStreamProducts.liveStreamProductsArrDynamic =
                    action.liveStreamProductsDynamicInfo.sort(
                        (a, b) => b.id - a.id
                    );
                newState.liveStreamProducts.success = action.success;
                break;
            case "@@liveStream/SELECT_PRODUCT":
                let indSelectProduct = 0;
                for (let liveStreamProduct of newState.liveStreamProducts
                    .liveStreamProductsArrDynamic) {
                    if (liveStreamProduct.id === action.id) {
                        newState.liveStreamProducts.liveStreamProductsArrDynamic[
                            indSelectProduct
                        ].isSelected = true;
                    }
                    indSelectProduct++;
                }

                break;
            case "@@liveStream/UPDATE_PRODUCT_TIME":
                let indUpdateProductTime = 0;
                for (let liveStreamProduct of newState.liveStreamProducts
                    .liveStreamProductsArrDynamic) {
                    if (liveStreamProduct.id === action.id) {
                        newState.liveStreamProducts.liveStreamProductsArrDynamic[
                            indUpdateProductTime
                        ].countdownEndTime = action.endTime;
                    }
                    indUpdateProductTime++;
                }
                break;
            case "@@liveStream/BID_INCREMENT":
                // for (let ind in state.liveStreamProducts
                //     .liveStreamProductsArr) {
                //     if (
                //         state.liveStreamProducts.liveStreamProductsArr[ind]
                //             .id === action.id
                //     ) {
                //         state.liveStreamProducts.liveStreamProductsArr[
                //             ind
                //         ].currentPrice = action.newPrice;
                //     }
                // }
                break;
        }
    });
}
