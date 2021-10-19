import { RootState, RootThunkDispatch } from "../../store";
import axios from "axios";

export interface LiveStreamInfo {
    id: number;
    title: string;
    seller: string;
    sellerImage: string;
    currentViewers: number;
    thumbnail: string;
    success: boolean;
}

export interface LiveStreamProduct {
    id: number;
    productName: string;
    minPrice: number;
    currentPrice: number;
    buyPrice: number;
    bidIncrement: number;
    buyerId?: number;
    productImage: string;
    isSelected: boolean;
    countdownStartTime?: Date;
    duration: number;
    isEnded: boolean;
    success: boolean;
}

export function loadliveStreamInfo(liveStreamInfo: LiveStreamInfo) {
    return {
        type: "@@liveStream/LOAD_LIVE_STREAM_INFO" as const,
        liveStreamInfo,
    };
}

export function loadLiveStreamProducts(
    liveStreamProducts: LiveStreamProduct[],
    success: boolean
) {
    return {
        type: "@@liveStream/LOAD_LIVE_STREAM_PRODUCTS" as const,
        liveStreamProducts,
        success,
    };
}

export type LiveStreamActions =
    | ReturnType<typeof loadliveStreamInfo>
    | ReturnType<typeof loadLiveStreamProducts>;

export function fetchliveStreamInfo(room: string, token: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.get<LiveStreamInfo>(
            `${process.env.REACT_APP_BACKEND_URL}/liveStream/Info?room=${room}&token=${token}`
        );
        if (res.data.success) {
            dispatch(loadliveStreamInfo(res.data));
        } else {
            dispatch(
                loadliveStreamInfo({
                    id: -1,
                    title: "Error",
                    seller: "Error",
                    sellerImage: "/defaultUser.png",
                    currentViewers: 0,
                    thumbnail: "",
                    success: false,
                })
            );
        }
    };
}

export function fetchliveStreamProducts(liveId: number) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.get<{
            liveStreamProducts: LiveStreamProduct[];
            success: boolean;
        }>(
            `${process.env.REACT_APP_BACKEND_URL}/liveStream/Products?liveId=${liveId}`
        );

        if (res.data.success) {
            dispatch(
                loadLiveStreamProducts(
                    res.data.liveStreamProducts,
                    res.data.success
                )
            );
        } else {
            dispatch(loadLiveStreamProducts([], false));
        }
    };
}
