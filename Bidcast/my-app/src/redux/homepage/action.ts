import axios from "axios";
import { RootState, RootThunkDispatch } from "../../store";

export interface ComingAuction {
    id: number;
    productName: string;
    minPrice: number;
    productImage: string;
    duration: number;
    success: boolean;
}

export function loadComingAuctions(
    comingAuctions: ComingAuction[],
    success: boolean
) {
    return {
        type: "@@comingAuction/LOAD_COMING_AUCTION" as const,
        comingAuctions,
        success,
    };
}

export type ComingAuctionActions = ReturnType<typeof loadComingAuctions>;

export function getComingAuctions() {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/comingAuction`
        );

        console.log(res);

        const json = await res.json();

        console.log(json);

        // const comingAuctionData = json.data.results;

        // console.log("json", comingAuctionData)

        // dispatch(loadComingAuctions(comingAuctionData, true))
    };
}
