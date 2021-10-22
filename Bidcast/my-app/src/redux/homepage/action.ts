import axios from "axios";
import { RootState, RootThunkDispatch } from "../../store";

export interface ComingAuction {
    id: number;
    product_name: string;
    min_price: number;
    product_image: string;
    duration: number;
    username: string;
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
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/comingAuction`
            );

            const json = await res.json();

            if (json.success) {

                dispatch(loadComingAuctions(json.data.results.rows, true))
            } else {
                dispatch(loadComingAuctions([], false))
            }

        } catch (error) {
            console.log(error);
        }
    }
}
