import { RootState, RootThunkDispatch } from "../../store";

export interface ComingAuction {
    id: number;
    product_name: string;
    min_price: number;
    image: string;
    starting_time: number;
    username: string;
    category: string;
    buy_price: number;
    description: string;
    title: string;
}

export function loadComingAuctions(
    comingAuctions: ComingAuction[],
) {
    return {
        type: "@@comingAuction/LOAD_COMING_AUCTION" as const,
        comingAuctions,
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

            if (json) {
                
                dispatch(loadComingAuctions(json.data.results.rows))
            } else {
                dispatch(loadComingAuctions([]))
            }

        } catch (error) {
            console.log(error);
        }
    }
}
