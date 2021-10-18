import { LiveStreamActions, LiveStreamInfo } from "./actions";
import produce from "immer";

export interface LiveStreamState {
    liveStreamInfo: LiveStreamInfo;
}

const initialState: LiveStreamState = {
    liveStreamInfo: {
        id: 0,
        title: "",
        seller: "",
        sellerImage: "../../../public/defaultUser.png",
        currentViewers: 0,
        thumbnail: "",
    },
};

export function liveStreamReducer(
    state: LiveStreamState = initialState,
    action: LiveStreamActions
): LiveStreamState {
    return produce(state, (state) => {
        switch (action.type) {
            case "@@liveStream/LOAD_INFO":
                state.liveStreamInfo = action.info;
                break;
        }
    });
}
