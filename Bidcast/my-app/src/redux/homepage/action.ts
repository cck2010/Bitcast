import axios from "axios"
import { RootState, RootThunkDispatch } from "../../store"

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
    }
}

export type ComingAuctionActions = ReturnType<typeof loadComingAuctions>

export function getComingAuctions() {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        const res = await axios.get<{
            comingAuctions: ComingAuction[];
            success: boolean
        }>(
            `${process.env.REACT_APP_BACKEND_URL}/`
        )

        if (res.data.success) {
            dispatch(loadComingAuctions(
                res.data.comingAuctions,
                res.data.success
            ))
        } else {
            dispatch(loadComingAuctions([], false))
        }
    }
}