import { RootState, RootThunkDispatch } from "../../store";
import axios from "axios";

export interface LiveStreamInfo {
    id: number;
    title: string;
    seller: string;
    sellerImage: string;
    currentViewers: number;
    thumbnail: string;
}

export function loadInfo(info: LiveStreamInfo) {
    return {
        type: "@@liveStream/LOAD_INFO" as const,
        info,
    };
}

export type LiveStreamActions = ReturnType<typeof loadInfo>;

export function fetchInfo(room: string, token: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.get<LiveStreamInfo>(
            `${process.env.REACT_APP_BACKEND_URL}/info?room=${room}&token=${token}`
        );

        dispatch(loadInfo(res.data));
    };
}
