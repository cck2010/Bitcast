import { RootState, RootThunkDispatch } from "../../store";
import axios from "axios";

export interface LiveStreamInfo {
    id: number;
    title: string;
    seller: string;
    sellerImage: string;
    currentViewers: number;
    thumbnail: string;
    description: string;
    success: boolean;
}

export interface LiveStreamProduct {
    id: number;
    productName: string;
    minPrice: number;
    currentPrice: number;
    buyPrice: number;
    bidIncrement: number;
    buyer?: string;
    productImage: string;
    isSelected: boolean;
    countdownStartTime?: Date;
    duration: number;
    isEnded: boolean;
    success: boolean;
}

export interface UpdatePrice {
    id: number;
    newPrice: number;
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

export function bidIncrement(id: number, newPrice: number) {
    return {
        type: "@@liveStream/BID_INCREMENT" as const,
        id,
        newPrice,
    };
}

export type LiveStreamActions =
    | ReturnType<typeof loadliveStreamInfo>
    | ReturnType<typeof loadLiveStreamProducts>
    | ReturnType<typeof bidIncrement>;

export function fetchliveStreamInfo(room: string, token: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.get<LiveStreamInfo>(
            `${process.env.REACT_APP_BACKEND_URL}/liveStream/info?room=${room}&token=${token}`
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
                    description: "",
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
            `${process.env.REACT_APP_BACKEND_URL}/liveStream/products?liveId=${liveId}`
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

export function fetchBidIncrement(productId: number) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.put<UpdatePrice>(
            `${process.env.REACT_APP_BACKEND_URL}/liveStream/products/currentPrice`,
            {
                productId,
            }
        );

        if (res.data.success) {
            dispatch(bidIncrement(productId, res.data.newPrice));
        }
    };
}
