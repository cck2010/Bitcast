import { RootState, RootThunkDispatch } from "../../store";
import axios from "axios";
import { Socket } from "socket.io-client";

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

export interface LiveStreamStatus {
    isBidding: boolean;
}

export interface LiveStreamProduct {
    id: number;
    productName: string;
    minPrice: number;
    buyPrice: number;
    bidIncrement: number;
    productImage: string;
    description?: string;
    success: boolean;
}

export interface LiveStreamProductDynamicInfo {
    id: number;
    currentPrice: number;
    isSelected: boolean;
    isEnded: boolean;
    buyer?: string;
    countdownStartTime?: Date;
    duration: number;
    success: boolean;
}

interface LiveStreamProductAll {
    id: number;
    productName: string;
    minPrice: number;
    buyPrice: number;
    bidIncrement: number;
    productImage: string;
    description?: string;
    currentPrice: number;
    isSelected: boolean;
    isEnded: boolean;
    buyer?: string;
    countdownStartTime?: Date;
    duration: number;
    success: boolean;
}

export interface UpdateProduct {
    id: number;
    newPrice?: number;
    countdownStartTime?: Date;
    duration?: number;
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

export function loadLiveStreamProductsDynamicInfo(
    liveStreamProductsDynamicInfo: LiveStreamProductDynamicInfo[],
    success: boolean
) {
    return {
        type: "@@liveStream/LOAD_LIVE_STREAM_PRODUCTS_DYNAMIC_INFO" as const,
        liveStreamProductsDynamicInfo,
        success,
    };
}

export function selectProduct(id: number) {
    return {
        type: "@@liveStream/SELECT_PRODUCT" as const,
        id,
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
    | ReturnType<typeof loadLiveStreamProductsDynamicInfo>
    | ReturnType<typeof bidIncrement>
    | ReturnType<typeof selectProduct>;

export function fetchliveStreamInfo(room: string, token: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
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
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchliveStreamProducts(liveId: number, isFull: boolean) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await axios.get<{
                liveStreamProducts: LiveStreamProductAll[];
                success: boolean;
            }>(
                `${process.env.REACT_APP_BACKEND_URL}/liveStream/products?liveId=${liveId}`
            );

            if (res.data.success) {
                const liveStreamProducts: LiveStreamProduct[] = [];
                const liveStreamProductsDynamicInfo: LiveStreamProductDynamicInfo[] =
                    [];
                for (let product of res.data.liveStreamProducts) {
                    let productObj: LiveStreamProduct = {
                        id: 0,
                        productName: "",
                        minPrice: 0,
                        buyPrice: 0,
                        bidIncrement: 0,
                        productImage: "",
                        description: "",
                        success: false,
                    };
                    let productObjDynamic: LiveStreamProductDynamicInfo = {
                        id: 0,
                        currentPrice: 0,
                        isSelected: false,
                        isEnded: false,
                        duration: 0,
                        success: false,
                    };
                    productObj.id = product.id;
                    productObjDynamic.id = product.id;
                    productObj.productName = product.productName;
                    productObj.minPrice = product.minPrice;
                    productObjDynamic.currentPrice = product.currentPrice;
                    productObj.buyPrice = product.buyPrice;
                    productObj.bidIncrement = product.bidIncrement;
                    productObj.productImage = product.productImage;
                    productObjDynamic.isSelected = product.isSelected;
                    productObjDynamic.duration = product.duration;
                    productObj.description = product.description;
                    productObjDynamic.isEnded = product.isEnded;
                    liveStreamProducts.push(productObj);
                    liveStreamProductsDynamicInfo.push(productObjDynamic);
                }
                if (isFull) {
                    dispatch(
                        loadLiveStreamProducts(
                            liveStreamProducts,
                            res.data.success
                        )
                    );
                }
                dispatch(
                    loadLiveStreamProductsDynamicInfo(
                        liveStreamProductsDynamicInfo,
                        res.data.success
                    )
                );
            } else {
                dispatch(loadLiveStreamProducts([], false));
                dispatch(loadLiveStreamProductsDynamicInfo([], false));
            }
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchBidIncrement(productId: number) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await axios.put<UpdateProduct>(
                `${process.env.REACT_APP_BACKEND_URL}/liveStream/products/currentPrice`,
                {
                    productId,
                }
            );

            if (res.data.success) {
                if (res.data.newPrice) {
                    dispatch(bidIncrement(productId, res.data.newPrice));
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchSelectedProduct(
    productId: number,
    ws: Socket,
    liveId: number
) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await axios.put<UpdateProduct>(
                `${process.env.REACT_APP_BACKEND_URL}/liveStream/products/isSelected`,
                {
                    productId,
                }
            );

            if (res.data.success) {
                dispatch(selectProduct(res.data.id));
                if (ws) {
                    ws.emit("render", [liveId, productId]);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
}

export function fetchProductTime(productId: number, seconds: number) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await axios.put<UpdateProduct>(
                `${process.env.REACT_APP_BACKEND_URL}/liveStream/products/productTime`,
                {
                    productId,
                    seconds,
                }
            );

            if (res.data.success) {
                // dispatch()
            }
        } catch (e) {
            console.log(e);
        }
    };
}
